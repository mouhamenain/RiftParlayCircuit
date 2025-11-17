import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

// Configure Sepolia with public RPC
const sepoliaWithRpc = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: ['https://ethereum-sepolia-rpc.publicnode.com'],
    },
    public: {
      http: ['https://ethereum-sepolia-rpc.publicnode.com'],
    },
  },
} as const;

export const config = getDefaultConfig({
  appName: 'Rift Parlay Circuit',
  projectId: 'temp-project-id', // Temporary - get real one from https://cloud.walletconnect.com
  chains: [sepoliaWithRpc],
  ssr: false,
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  },
});

export const sepoliaChain = sepoliaWithRpc;
