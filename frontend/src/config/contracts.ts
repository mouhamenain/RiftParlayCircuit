// RiftParlayCircuit contract configuration - HARDCODED ADDRESS (with ZamaEthereumConfig)
export const CIRCUIT_ADDRESS = "0x0e319661627836c18bd6CA2A2500f80B2478d32c" as `0x${string}`;

// Pathline enum matching contract
export enum Pathline {
  Nova = 0,
  Ember = 1,
  Tidal = 2,
  Quake = 3
}

export const PathlineNames = ["Nova", "Ember", "Tidal", "Quake"] as const;
export const PathlineColors = {
  0: "#8b5cf6", // Nova - Purple
  1: "#f97316", // Ember - Orange
  2: "#3b82f6", // Tidal - Blue
  3: "#10b981", // Quake - Green
} as const;

// Import ABI from artifact
import RiftParlayCircuitArtifact from './RiftParlayCircuit.json';
export const CIRCUIT_ABI = RiftParlayCircuitArtifact.abi as const;
