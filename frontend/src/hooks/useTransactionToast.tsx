import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink } from 'lucide-react';

const SEPOLIA_EXPLORER = 'https://sepolia.etherscan.io';

interface UseTransactionToastProps {
  hash?: `0x${string}`;
  isConfirming?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: Error | null;
  successTitle?: string;
  successDescription?: string;
  errorTitle?: string;
}

export const useTransactionToast = ({
  hash,
  isConfirming,
  isSuccess,
  isError,
  error,
  successTitle = 'Transaction Successful',
  successDescription = 'Your transaction has been confirmed',
  errorTitle = 'Transaction Failed',
}: UseTransactionToastProps) => {
  const { toast } = useToast();

  // Show confirming toast
  useEffect(() => {
    if (hash && isConfirming) {
      toast({
        title: 'Transaction Confirming',
        description: (
          <div className="flex flex-col gap-2">
            <p>Waiting for confirmation...</p>
            <a
              href={`${SEPOLIA_EXPLORER}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline text-sm"
            >
              View on Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ),
        duration: 10000,
      });
    }
  }, [hash, isConfirming, toast]);

  // Show success toast
  useEffect(() => {
    if (hash && isSuccess) {
      toast({
        title: successTitle,
        description: (
          <div className="flex flex-col gap-2">
            <p>{successDescription}</p>
            <a
              href={`${SEPOLIA_EXPLORER}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline text-sm"
            >
              View on Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ),
        duration: 5000,
      });
    }
  }, [hash, isSuccess, successTitle, successDescription, toast]);

  // Show error toast
  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.message || 'Transaction failed';
      toast({
        title: errorTitle,
        description: (
          <div className="flex flex-col gap-2">
            <p className="text-sm">{errorMessage}</p>
            {hash && (
              <a
                href={`${SEPOLIA_EXPLORER}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline text-sm"
              >
                View on Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ),
        variant: 'destructive',
        duration: 8000,
      });
    }
  }, [isError, error, hash, errorTitle, toast]);
};
