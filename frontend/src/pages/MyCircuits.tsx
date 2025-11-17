import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useListCircuits } from '@/hooks/useCircuitContract';
import { convertContractCircuits } from '@/lib/contract-utils';
import { Wallet, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function MyCircuits() {
  const { isConnected } = useAccount();

  // Get all circuits
  const { circuits: allCircuits, isLoading } = useListCircuits(0, 100);
  const circuits = convertContractCircuits(allCircuits);

  // For demo purposes, show all circuits since we don't have a way to efficiently
  // track which circuits a user has entered without rate limiting issues.
  // In production, you would use an indexer or subgraph to track user participation.
  const userCircuits = circuits;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center">
              <Wallet className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to view your circuits, track your entries, and claim your winnings.
            </p>
            <ConnectButton />
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Circuits</h1>
          <p className="text-muted-foreground">Track your predictions and winnings.</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-nova" />
              <p className="text-2xl font-bold">{userCircuits.length}</p>
              <p className="text-sm text-muted-foreground">Participated</p>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-status-locked" />
              <p className="text-2xl font-bold">FHE Demo</p>
              <p className="text-sm text-muted-foreground">Encrypted Bets</p>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Rewards</p>
              <p className="text-2xl font-bold text-quake">Demo Only</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Circuit IDs List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading circuits...</p>
          </div>
        ) : userCircuits.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Participated Circuits</h2>
            <div className="grid gap-3">
              {userCircuits.map((circuit, index) => (
                <motion.div
                  key={circuit.circuitId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Card variant="glass" className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-mono text-sm text-muted-foreground mb-1">Circuit ID</p>
                        <p className="font-bold mb-2">{circuit.circuitId}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{circuit.headline}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/circuit/${circuit.circuitId}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center">
              <Zap className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Circuits Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start by entering a circuit or creating your own!
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/circuits">Browse Circuits</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/create">Create Circuit</Link>
              </Button>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}
