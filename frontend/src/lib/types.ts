export type CircuitStatus = 'open' | 'locked' | 'settled' | 'cancelled';

export type Pathline = 'nova' | 'ember' | 'tidal' | 'quake';

export interface CircuitSnapshot {
  circuitId: string;
  headline: string;
  creator: string;
  totalEntrants: number;
  lockTime: number;
  status: CircuitStatus;
  votes: number[];
  winningPathline?: number;
  entrants: string[];
}

export interface CreateCircuitData {
  circuitId: string;
  headline: string;
  duration: number;
}

export const PATHLINES: { name: Pathline; label: string; color: string; index: number }[] = [
  { name: 'nova', label: 'Nova', color: 'nova', index: 0 },
  { name: 'ember', label: 'Ember', color: 'ember', index: 1 },
  { name: 'tidal', label: 'Tidal', color: 'tidal', index: 2 },
  { name: 'quake', label: 'Quake', color: 'quake', index: 3 },
];
