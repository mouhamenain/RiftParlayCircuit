import { expect } from "chai";
import { ethers } from "hardhat";
import { deployRiftParlayCircuitFixture } from "./RiftParlayCircuit.fixture";
import type { RiftParlayCircuit } from "../artifacts/types/RiftParlayCircuit";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("RiftParlayCircuit - Integration Tests", function () {
  let contract: RiftParlayCircuit;
  let owner: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;
  let carol: HardhatEthersSigner;

  beforeEach(async function () {
    const deployment = await deployRiftParlayCircuitFixture();
    contract = deployment.contract;
    owner = deployment.owner;
    alice = deployment.alice;
    bob = deployment.bob;
    carol = deployment.carol;
  });

  describe("Full Circuit Lifecycle", function () {
    const circuitId = "full-lifecycle-test";
    const headline = "Nova vs Ember vs Tidal vs Quake - Q1 Network Activity";
    const duration = 60 * 60; // 1 hour

    it("Should complete full circuit lifecycle", async function () {
      // Step 1: Create Circuit
      const createTx = await contract.createCircuit(circuitId, headline, duration);
      await expect(createTx)
        .to.emit(contract, "CircuitCreated");

      // Verify circuit was created
      const snapshot = await contract.getCircuit(circuitId);
      expect(snapshot.exists).to.be.true;
      expect(snapshot.circuitId).to.equal(circuitId);
      expect(snapshot.headline).to.equal(headline);
      expect(snapshot.creator).to.equal(owner.address);
      expect(snapshot.totalEntrants).to.equal(0);

      // Step 2: Fast forward past lock time
      await ethers.provider.send("evm_increaseTime", [duration + 1]);
      await ethers.provider.send("evm_mine", []);

      // Step 3: Submit decrypted votes (simulating relayer)
      const votes: [number, number, number, number] = [5, 3, 2, 0]; // Nova: 5, Ember: 3, Tidal: 2, Quake: 0
      const submitTx = await contract.submitDecryptedVotes(circuitId, votes);
      await expect(submitTx)
        .to.emit(contract, "VotesRevealed")
        .withArgs(circuitId, votes);

      // Step 4: Settle Circuit
      const settleTx = await contract.settleCircuit(circuitId);
      await expect(settleTx)
        .to.emit(contract, "CircuitSettled")
        .withArgs(circuitId, false, 0); // Nova (pathline 0) should win

      // Verify settlement
      const settledSnapshot = await contract.getCircuit(circuitId);
      expect(settledSnapshot.settled).to.be.true;
      expect(settledSnapshot.winningPathline).to.equal(0); // Nova
      expect(settledSnapshot.pushAll).to.be.false;
    });

    it("Should handle tie-breaking correctly", async function () {
      await contract.createCircuit(circuitId, headline, duration);

      // Fast forward past lock time
      await ethers.provider.send("evm_increaseTime", [duration + 1]);
      await ethers.provider.send("evm_mine", []);

      // Submit tied votes: Nova: 5, Ember: 5, Tidal: 2, Quake: 0
      const votes: [number, number, number, number] = [5, 5, 2, 0];
      await contract.submitDecryptedVotes(circuitId, votes);

      // Settle - should use blockhash for tie-breaking
      const settleTx = await contract.settleCircuit(circuitId);
      await settleTx.wait();

      const snapshot = await contract.getCircuit(circuitId);
      expect(snapshot.settled).to.be.true;
      // Winner should be either 0 (Nova) or 1 (Ember)
      expect([0n, 1n]).to.include(BigInt(snapshot.winningPathline));
    });

    it("Should enable refund mode when all votes are zero", async function () {
      await contract.createCircuit(circuitId, headline, duration);

      // Fast forward past lock time
      await ethers.provider.send("evm_increaseTime", [duration + 1]);
      await ethers.provider.send("evm_mine", []);

      // Submit all-zero votes
      const votes: [number, number, number, number] = [0, 0, 0, 0];
      await contract.submitDecryptedVotes(circuitId, votes);

      // Settle
      const settleTx = await contract.settleCircuit(circuitId);
      await expect(settleTx)
        .to.emit(contract, "CircuitSettled")
        .withArgs(circuitId, true, 255); // pushAll = true, winningPathline = max uint8

      const snapshot = await contract.getCircuit(circuitId);
      expect(snapshot.settled).to.be.true;
      expect(snapshot.pushAll).to.be.true;
    });
  });

  describe("Multiple Circuits", function () {
    it("Should manage multiple circuits independently", async function () {
      // Create 3 different circuits
      const circuit1 = "multi-circuit-1";
      const circuit2 = "multi-circuit-2";
      const circuit3 = "multi-circuit-3";

      await contract.createCircuit(circuit1, "Circuit 1", 60 * 60);
      await contract.createCircuit(circuit2, "Circuit 2", 120 * 60);
      await contract.createCircuit(circuit3, "Circuit 3", 180 * 60);

      // Verify all circuits exist
      const circuitIds = await contract.listCircuitIds();
      expect(circuitIds.length).to.equal(3);
      expect(circuitIds).to.include(circuit1);
      expect(circuitIds).to.include(circuit2);
      expect(circuitIds).to.include(circuit3);

      // Verify each circuit has correct details
      const snapshot1 = await contract.getCircuit(circuit1);
      const snapshot2 = await contract.getCircuit(circuit2);
      const snapshot3 = await contract.getCircuit(circuit3);

      expect(snapshot1.headline).to.equal("Circuit 1");
      expect(snapshot2.headline).to.equal("Circuit 2");
      expect(snapshot3.headline).to.equal("Circuit 3");

      // Cancel one circuit
      await contract.cancelCircuit(circuit2);

      // Verify cancellation doesn't affect others
      const updatedSnapshot1 = await contract.getCircuit(circuit1);
      const updatedSnapshot2 = await contract.getCircuit(circuit2);
      const updatedSnapshot3 = await contract.getCircuit(circuit3);

      expect(updatedSnapshot1.cancelled).to.be.false;
      expect(updatedSnapshot2.cancelled).to.be.true;
      expect(updatedSnapshot3.cancelled).to.be.false;
    });
  });

  describe("Time-based Operations", function () {
    const circuitId = "time-test";
    const duration = 60 * 60; // 1 hour

    beforeEach(async function () {
      await contract.createCircuit(circuitId, "Time Test", duration);
    });

    it("Should respect lock time for reveal operations", async function () {
      // Before lock time
      await expect(
        contract.requestVoteReveal(circuitId)
      ).to.be.revertedWithCustomError(contract, "NotLocked");

      // Exactly at lock time
      await ethers.provider.send("evm_increaseTime", [duration]);
      await ethers.provider.send("evm_mine", []);

      // Should work now
      await expect(contract.requestVoteReveal(circuitId)).to.not.be.reverted;
    });

    it("Should respect lock time for settlement", async function () {
      // Before lock time
      await expect(
        contract.settleCircuit(circuitId)
      ).to.be.revertedWithCustomError(contract, "NotLocked");

      // After lock time
      await ethers.provider.send("evm_increaseTime", [duration + 1]);
      await ethers.provider.send("evm_mine", []);

      // Need to submit votes first
      const votes: [number, number, number, number] = [1, 0, 0, 0];
      await contract.submitDecryptedVotes(circuitId, votes);

      // Should work now
      await expect(contract.settleCircuit(circuitId)).to.not.be.reverted;
    });
  });

  describe("Error Handling", function () {
    it("Should prevent double settlement", async function () {
      const circuitId = "double-settle";
      const duration = 60 * 60;

      await contract.createCircuit(circuitId, "Double Settle Test", duration);

      // Fast forward
      await ethers.provider.send("evm_increaseTime", [duration + 1]);
      await ethers.provider.send("evm_mine", []);

      // Submit votes and settle once
      const votes: [number, number, number, number] = [1, 0, 0, 0];
      await contract.submitDecryptedVotes(circuitId, votes);
      await contract.settleCircuit(circuitId);

      // Try to settle again
      await expect(
        contract.settleCircuit(circuitId)
      ).to.be.revertedWithCustomError(contract, "AlreadySettled");
    });

    it("Should prevent voting on cancelled circuit", async function () {
      const circuitId = "cancelled-vote";
      await contract.createCircuit(circuitId, "Cancelled Test", 60 * 60);

      // Cancel the circuit
      await contract.cancelCircuit(circuitId);

      // Note: Actual entry would require FHE operations
      // This test verifies the cancelled flag is set
      const snapshot = await contract.getCircuit(circuitId);
      expect(snapshot.cancelled).to.be.true;
    });
  });

  describe("Gas Usage Estimation", function () {
    it("Should estimate gas for circuit creation", async function () {
      const circuitId = "gas-test";
      const headline = "Gas Usage Test";
      const duration = 60 * 60;

      const tx = await contract.createCircuit.populateTransaction(
        circuitId,
        headline,
        duration
      );
      const estimatedGas = await ethers.provider.estimateGas(tx);

      console.log(`Gas estimate for createCircuit: ${estimatedGas.toString()}`);
      expect(estimatedGas).to.be.gt(0);
    });
  });
});
