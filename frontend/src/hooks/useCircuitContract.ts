import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';
import type { Address, Hash } from 'viem';

import { CIRCUIT_ABI, CIRCUIT_ADDRESS } from '@/config/contracts';
import { encryptChoice, initializeFHE, isFheReady } from '@/lib/fhe';
import { useToast } from '@/hooks/use-toast';
import { convertContractCircuit } from '@/lib/contract-utils';

export interface CircuitSnapshot {
  exists: boolean;
  circuitId: string;
  headline: string;
  creator: Address;
  lockTime: bigint;
  cancelled: boolean;
  settled: boolean;
  pushAll: boolean;
  winningPathline: number;
  revealedVotes: [number, number, number, number];
  totalEntrants: bigint;
}

type WriteStatus = {
  hash?: Hash;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: Error | null;
};

const useCircuitWriteAction = (functionName: (typeof CIRCUIT_ABI)[number]['name']) => {
  const { writeContractAsync, data: hash, isPending, error: writeError } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
    error: txError
  } = useWaitForTransactionReceipt({ hash });

  const execute = useCallback(
    async (args: readonly unknown[]) => {
      return writeContractAsync({
        address: CIRCUIT_ADDRESS,
        abi: CIRCUIT_ABI,
        functionName,
        args
      });
    },
    [functionName, writeContractAsync]
  );

  const status: WriteStatus = useMemo(
    () => ({
      hash,
      isPending,
      isConfirming,
      isSuccess,
      isError,
      error: (txError || writeError) as Error | null
    }),
    [hash, isPending, isConfirming, isSuccess, isError, txError, writeError]
  );

  return { execute, status };
};

export const useListCircuitIds = () => {
  const result = useReadContract({
    address: CIRCUIT_ADDRESS,
    abi: CIRCUIT_ABI,
    functionName: 'listCircuitIds'
  });

  const ids = useMemo(() => {
    return (result.data as string[] | undefined) ?? [];
  }, [result.data]);

  return {
    ids,
    isLoading: result.isLoading,
    error: result.error
  };
};

export const useListCircuits = (offset = 0, limit = 100) => {
  const { ids, isLoading: idsLoading, error } = useListCircuitIds();
  const [circuits, setCircuits] = useState<CircuitSnapshot[]>([]);
  const [isLoadingCircuits, setIsLoadingCircuits] = useState(false);
  const publicClient = usePublicClient();
  const [fetchedIds, setFetchedIds] = useState<string>('');

  useEffect(() => {
    if (!ids.length || !publicClient) {
      setCircuits([]);
      return;
    }

    // Prevent duplicate fetches by comparing stringified ids
    const idsKey = JSON.stringify(ids);
    if (idsKey === fetchedIds) {
      return;
    }

    const fetchCircuits = async () => {
      setIsLoadingCircuits(true);
      try {
        const slice = ids.slice(offset, offset + limit);
        const result = await Promise.all(
          slice.map((id) =>
            publicClient.readContract({
              address: CIRCUIT_ADDRESS,
              abi: CIRCUIT_ABI,
              functionName: 'getCircuit',
              args: [id]
            }) as Promise<CircuitSnapshot>
          )
        );
        setCircuits(result);
        setFetchedIds(idsKey);
      } catch (err) {
        console.error('[useListCircuits] Error fetching circuits:', err);
        setCircuits([]);
      } finally {
        setIsLoadingCircuits(false);
      }
    };

    fetchCircuits();
  }, [ids, publicClient, offset, limit, fetchedIds]);

  return {
    circuits,
    total: ids.length,
    isLoading: idsLoading || isLoadingCircuits,
    error
  };
};

export const useGetCircuit = (circuitId?: string) => {
  const result = useReadContract({
    address: CIRCUIT_ADDRESS,
    abi: CIRCUIT_ABI,
    functionName: 'getCircuit',
    args: circuitId ? [circuitId] : undefined,
    query: { enabled: Boolean(circuitId) }
  });

  const raw = result.data as CircuitSnapshot | undefined;
  const snapshot = raw && raw.exists ? convertContractCircuit(raw) : undefined;

  return {
    data: snapshot,
    raw,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch
  };
};

export const useHasEntered = (circuitId?: string, user?: Address) => {
  const result = useReadContract({
    address: CIRCUIT_ADDRESS,
    abi: CIRCUIT_ABI,
    functionName: 'hasEntered',
    args: circuitId && user ? [circuitId, user] : undefined,
    query: { enabled: Boolean(circuitId && user) }
  });

  return {
    hasEntered: Boolean(result.data),
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch
  };
};

export const useCreateCircuit = () => {
  const { toast } = useToast();
  const action = useCircuitWriteAction('createCircuit');

  const createCircuit = useCallback(
    async (circuitId: string, headline: string, durationMinutes: number) => {
      try {
        const durationSeconds = BigInt(durationMinutes * 60);
        await action.execute([circuitId, headline, durationSeconds]);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Failed to create circuit',
          description: error?.message || 'Unknown error'
        });
      }
    },
    [action, toast]
  );

  return { createCircuit, ...action.status };
};

export const useEnterCircuit = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const action = useCircuitWriteAction('enterCircuit');
  const [isEncrypting, setIsEncrypting] = useState(false);

  const enterCircuit = useCallback(
    async (circuitId: string, pathlineChoice: number) => {
      if (!address) {
        toast({
          variant: 'destructive',
          title: 'Wallet not connected',
          description: 'Connect your wallet to submit entries.'
        });
        return;
      }

      try {
        setIsEncrypting(true);
        if (!isFheReady()) {
          await initializeFHE();
        }

        const { handle, proof } = await encryptChoice(pathlineChoice, address);
        setIsEncrypting(false);

        await action.execute([circuitId, handle, proof]);
      } catch (error: any) {
        setIsEncrypting(false);
        toast({
          variant: 'destructive',
          title: 'Unable to place entry',
          description: error?.message || 'Unknown error'
        });
      }
    },
    [action, address, toast]
  );

  return {
    enterCircuit,
    isEncrypting,
    ...action.status
  };
};

export const useRequestVoteReveal = () => {
  const action = useCircuitWriteAction('requestVoteReveal');
  const trigger = useCallback((circuitId: string) => action.execute([circuitId]), [action]);
  return { requestReveal: trigger, ...action.status };
};

export const useSubmitDecryptedVotes = () => {
  const action = useCircuitWriteAction('submitDecryptedVotes');
  const submit = useCallback(
    (circuitId: string, votes: [number, number, number, number]) => action.execute([circuitId, votes]),
    [action]
  );
  return { submitVotes: submit, ...action.status };
};

export const useSettleCircuit = () => {
  const action = useCircuitWriteAction('settleCircuit');
  const settle = useCallback((circuitId: string) => action.execute([circuitId]), [action]);
  return { settleCircuit: settle, ...action.status };
};

export const useCancelCircuit = () => {
  const action = useCircuitWriteAction('cancelCircuit');
  const cancel = useCallback((circuitId: string) => action.execute([circuitId]), [action]);
  return { cancelCircuit: cancel, ...action.status };
};
// optimize
