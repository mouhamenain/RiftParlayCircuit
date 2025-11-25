// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint8, externalEuint8 } from "@fhevm/solidity/lib/FHE.sol";
import { ZamaEthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Rift Parlay Circuit — Demo Edition
/// @notice Minimal fhEVM circuit manager used to showcase encrypted betting. No ETH flows.
contract RiftParlayCircuit is ZamaEthereumConfig {
    uint8 public constant PATHLINE_COUNT = 4;

    struct Entry {
        bool exists;
        euint8 encryptedChoice;
    }

    struct Circuit {
        bool exists;
        string circuitId;
        string headline;
        address creator;
        uint256 lockTime;
        bool cancelled;
        bool settled;
        bool pushAll;
        uint8 winningPathline;
        uint8[PATHLINE_COUNT] revealedVotes;
        address[] entrants;
    }

    struct CircuitSnapshot {
        bool exists;
        string circuitId;
        string headline;
        address creator;
        uint256 lockTime;
        bool cancelled;
        bool settled;
        bool pushAll;
        uint8 winningPathline;
        uint8[PATHLINE_COUNT] revealedVotes;
        uint256 totalEntrants;
    }

    mapping(string => Circuit) private _circuits;
    mapping(string => mapping(address => Entry)) private _entries;
    string[] private _circuitIds;

    uint256 public constant MIN_DURATION = 10 minutes;
    uint256 public constant MAX_DURATION = 96 hours;

    event CircuitCreated(string indexed circuitId, string headline, uint256 lockTime);
    event EntryPlaced(string indexed circuitId, address indexed player);
    event VotesRevealed(string indexed circuitId, uint8[PATHLINE_COUNT] votes);
    event CircuitSettled(string indexed circuitId, bool pushAll, uint8 winningPathline);
    event CircuitCancelled(string indexed circuitId);

    error CircuitExists();
    error CircuitMissing();
    error InvalidDuration();
    error Locked();
    error NotLocked();
    error AlreadyEntered();
    error EntryMissing();
    error NotCreator();
    error AlreadySettled();

    modifier onlyCircuit(string calldata circuitId) {
        if (!_circuits[circuitId].exists) revert CircuitMissing();
        _;
    }

    function createCircuit(
        string calldata circuitId,
        string calldata headline,
        uint256 duration
    ) external {
        Circuit storage circuit = _circuits[circuitId];
        if (circuit.exists) revert CircuitExists();
        if (duration < MIN_DURATION || duration > MAX_DURATION) revert InvalidDuration();

        circuit.exists = true;
        circuit.circuitId = circuitId;
        circuit.headline = headline;
        circuit.creator = msg.sender;
        circuit.lockTime = block.timestamp + duration;
        circuit.winningPathline = type(uint8).max;

        _circuitIds.push(circuitId);
        emit CircuitCreated(circuitId, headline, circuit.lockTime);
    }

    function enterCircuit(
        string calldata circuitId,
        externalEuint8 encryptedChoice,
        bytes calldata proof
    ) external onlyCircuit(circuitId) {
        Circuit storage circuit = _circuits[circuitId];
        if (circuit.cancelled) revert Locked();
        if (block.timestamp >= circuit.lockTime) revert Locked();

        Entry storage entry = _entries[circuitId][msg.sender];
        if (entry.exists) revert AlreadyEntered();

        euint8 choice = FHE.fromExternal(encryptedChoice, proof);
        entry.exists = true;
        entry.encryptedChoice = choice;

        FHE.allow(choice, msg.sender);
        FHE.allowThis(choice);

        circuit.entrants.push(msg.sender);
        emit EntryPlaced(circuitId, msg.sender);
    }

    function requestVoteReveal(string calldata circuitId) external onlyCircuit(circuitId) {
        Circuit storage circuit = _circuits[circuitId];
        if (circuit.cancelled) revert Locked();
        if (block.timestamp < circuit.lockTime) revert NotLocked();
        if (circuit.settled) revert AlreadySettled();

        for (uint256 i = 0; i < circuit.entrants.length; i++) {
            Entry storage entry = _entries[circuitId][circuit.entrants[i]];
            if (entry.exists) {
                FHE.makePubliclyDecryptable(entry.encryptedChoice);
            }
        }
    }

    function submitDecryptedVotes(
        string calldata circuitId,
        uint8[PATHLINE_COUNT] calldata votes
    ) external onlyCircuit(circuitId) {
        Circuit storage circuit = _circuits[circuitId];
        if (circuit.settled) revert AlreadySettled();
        if (block.timestamp < circuit.lockTime) revert NotLocked();

        circuit.revealedVotes = votes;
        emit VotesRevealed(circuitId, votes);
    }

    function settleCircuit(string calldata circuitId) external onlyCircuit(circuitId) {
        Circuit storage circuit = _circuits[circuitId];
        if (circuit.cancelled) revert Locked();
        if (block.timestamp < circuit.lockTime) revert NotLocked();
        if (circuit.settled) revert AlreadySettled();

        uint8 maxVotes;
        uint8 candidateCount;
        uint8[PATHLINE_COUNT] memory candidates;

        for (uint8 i = 0; i < PATHLINE_COUNT; i++) {
            uint8 voteCount = circuit.revealedVotes[i];
            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                candidateCount = 0;
                candidates[candidateCount++] = i;
            } else if (voteCount == maxVotes && voteCount > 0) {
                candidates[candidateCount++] = i;
            }
        }

        if (maxVotes == 0) {
            circuit.pushAll = true;
            circuit.settled = true;
            emit CircuitSettled(circuitId, true, type(uint8).max);
            return;
        }

        uint8 winner = candidateCount == 1
            ? candidates[0]
            : candidates[uint256(blockhash(block.number - 1)) % candidateCount];

        circuit.winningPathline = winner;
        circuit.pushAll = false;
        circuit.settled = true;

        emit CircuitSettled(circuitId, false, winner);
    }

    function cancelCircuit(string calldata circuitId) external onlyCircuit(circuitId) {
        Circuit storage circuit = _circuits[circuitId];
        if (circuit.creator != msg.sender) revert NotCreator();
        if (circuit.settled) revert AlreadySettled();

        circuit.cancelled = true;
        emit CircuitCancelled(circuitId);
    }

    function getCircuit(string calldata circuitId)
        external
        view
        onlyCircuit(circuitId)
        returns (CircuitSnapshot memory snapshot)
    {
        Circuit storage circuit = _circuits[circuitId];
        snapshot.exists = circuit.exists;
        snapshot.circuitId = circuit.circuitId;
        snapshot.headline = circuit.headline;
        snapshot.creator = circuit.creator;
        snapshot.lockTime = circuit.lockTime;
        snapshot.cancelled = circuit.cancelled;
        snapshot.settled = circuit.settled;
        snapshot.pushAll = circuit.pushAll;
        snapshot.winningPathline = circuit.winningPathline;
        snapshot.revealedVotes = circuit.revealedVotes;
        snapshot.totalEntrants = circuit.entrants.length;
    }

    function listCircuitIds() external view returns (string[] memory) {
        return _circuitIds;
    }

    function getEntrants(string calldata circuitId)
        external
        view
        onlyCircuit(circuitId)
        returns (address[] memory)
    {
        return _circuits[circuitId].entrants;
    }

    function hasEntered(string calldata circuitId, address user) external view returns (bool) {
        return _entries[circuitId][user].exists;
    }

    function getUserChoice(string calldata circuitId, address user)
        external
        view
        onlyCircuit(circuitId)
        returns (bytes32)
    {
        Entry storage entry = _entries[circuitId][user];
        if (!entry.exists) revert EntryMissing();
        return FHE.toBytes32(entry.encryptedChoice);
    }
}
// final
