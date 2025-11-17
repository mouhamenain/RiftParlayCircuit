import { bytesToHex, getAddress } from "viem";
import type { Address } from "viem";
import { CIRCUIT_ADDRESS } from "@/config/contracts";

declare global {
  interface Window {
    RelayerSDK?: any;
    relayerSDK?: any;
    ethereum?: any;
    okxwallet?: any;
  }
}

export type EncryptedChoicePayload = {
  handle: `0x${string}`;
  proof: `0x${string}`;
};

let fheInstance: any = null;

const getSDK = () => {
  if (typeof window === "undefined") {
    throw new Error("FHE SDK requires a browser environment");
  }
  const sdk = window.RelayerSDK || window.relayerSDK;
  if (!sdk) {
    throw new Error("Relayer SDK not loaded. Ensure the CDN script tag is present.");
  }
  return sdk;
};

export const initializeFHE = async (provider?: any) => {
  if (fheInstance) return fheInstance;
  if (typeof window === "undefined") {
    throw new Error("FHE SDK requires a browser environment");
  }

  const ethereumProvider =
    provider || window.ethereum || window.okxwallet?.provider || window.okxwallet;
  if (!ethereumProvider) {
    throw new Error("No wallet provider detected. Connect a wallet first.");
  }

  const sdk = getSDK();
  const { initSDK, createInstance, SepoliaConfig } = sdk;
  await initSDK();
  const config = { ...SepoliaConfig, network: ethereumProvider };
  fheInstance = await createInstance(config);
  console.log('[FHE] ✅ SDK initialized successfully');
  return fheInstance;
};

/**
 * Get instance or initialize if needed
 */
const getInstance = async (provider?: any) => {
  if (fheInstance) return fheInstance;
  return initializeFHE(provider);
};

/**
 * Get FHE instance if it exists
 */
export const getFHEInstance = (): any => {
  return fheInstance;
};

/**
 * Check if FHE is ready
 */
export const isFheReady = (): boolean => {
  return fheInstance !== null;
};

export const resetFHEInstance = () => {
  fheInstance = null;
};

/**
 * Encrypt pathline choice using Zama FHE SDK
 * @param choice Pathline choice (0-3: Nova, Ember, Tidal, Quake)
 * @param userAddress User's Ethereum address
 * @param provider Optional provider
 * @returns Encrypted choice handle and input proof
 */
export async function encryptChoice(
  choice: number,
  userAddress: Address,
  provider?: any
): Promise<EncryptedChoicePayload> {
  if (choice < 0 || choice > 3) {
    throw new Error("Invalid choice. Must be 0-3 (Nova, Ember, Tidal, Quake)");
  }

  console.log('[FHE] 🔥 USING CONTRACT ADDRESS:', CIRCUIT_ADDRESS);

  const instance = await getInstance(provider);
  const contractAddr = getAddress(CIRCUIT_ADDRESS);
  const userAddr = getAddress(userAddress);

  console.log('[FHE] Normalized contract address:', contractAddr);
  console.log('[FHE] User address:', userAddr);
  console.log('[FHE] Choice to encrypt:', choice);

  const input = instance.createEncryptedInput(contractAddr, userAddr);
  input.add8(choice); // euint8 for pathline choice

  console.log('[FHE] Created input, about to encrypt...');
  const { handles, inputProof } = await input.encrypt();
  console.log('[FHE] Encryption complete');

  const handle = bytesToHex(handles[0]) as `0x${string}`;
  const proof = bytesToHex(inputProof) as `0x${string}`;

  console.log('[FHE] Final values:');
  console.log('  - handle:', handle, '(length:', handle.length, ')');
  console.log('  - proof:', proof, '(length:', proof.length, ')');

  return { handle, proof };
}

/**
 * Public decrypt handles (for revealing votes after circuit locks)
 */
export async function publicDecryptHandles(handles: `0x${string}`[], provider?: any) {
  if (handles.length === 0) {
    throw new Error("No handles provided for public decryption");
  }

  const instance = await getInstance(provider);
  const result = await instance.publicDecrypt(handles);

  const normalized: Record<string, number> = {};
  Object.entries(result.clearValues || {}).forEach(([handle, value]) => {
    const key = handle.toLowerCase();
    normalized[key] = typeof value === "bigint" ? Number(value) : Number(value);
  });

  const values = handles.map((handle) => normalized[handle.toLowerCase()] ?? 0);

  return {
    values,
    abiEncoded: result.abiEncodedClearValues as `0x${string}`,
    proof: result.decryptionProof as `0x${string}`
  };
}

/**
 * Count votes from decrypted choices
 */
export function countVotes(choices: number[]): [number, number, number, number] {
  const votes: [number, number, number, number] = [0, 0, 0, 0];
  for (const choice of choices) {
    if (choice >= 0 && choice <= 3) {
      votes[choice]++;
    }
  }
  return votes;
}
