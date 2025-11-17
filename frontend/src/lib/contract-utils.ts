import type { CircuitSnapshot as ContractCircuitSnapshot } from '@/hooks/useCircuitContract';
import type { CircuitSnapshot, CircuitStatus } from './types';

export function convertContractCircuit(data: ContractCircuitSnapshot): CircuitSnapshot {
  const status = getCircuitStatus(data);

  return {
    circuitId: data.circuitId,
    headline: data.headline,
    creator: data.creator,
    totalEntrants: Number(data.totalEntrants),
    lockTime: Number(data.lockTime) * 1000,
    status,
    votes: data.revealedVotes ? [...data.revealedVotes] : [0, 0, 0, 0],
    winningPathline: data.settled ? data.winningPathline : undefined,
    entrants: [],
  };
}

function getCircuitStatus(data: ContractCircuitSnapshot): CircuitStatus {
  if (data.cancelled) return 'cancelled';
  if (data.settled) return 'settled';

  const now = Date.now();
  const lockTime = Number(data.lockTime) * 1000;
  if (now >= lockTime) return 'locked';
  return 'open';
}

export function convertContractCircuits(circuits?: ContractCircuitSnapshot[]): CircuitSnapshot[] {
  if (!circuits || !Array.isArray(circuits)) {
    return [];
  }
  return circuits.map(convertContractCircuit);
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function isCircuitOpen(circuit: CircuitSnapshot): boolean {
  return circuit.status === 'open' && Date.now() < circuit.lockTime;
}

export function isCircuitLocked(circuit: CircuitSnapshot): boolean {
  return circuit.status === 'locked';
}

export function isCircuitSettled(circuit: CircuitSnapshot): boolean {
  return circuit.status === 'settled';
}

export function isCircuitCancelled(circuit: CircuitSnapshot): boolean {
  return circuit.status === 'cancelled';
}
