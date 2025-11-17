import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { CountdownTimer } from '@/components/CountdownTimer';
import { PathlineSelector } from '@/components/PathlineSelector';
import { VoteBar } from '@/components/VoteBar';
import { PATHLINES } from '@/lib/types';
import { useGetCircuit, useEnterCircuit, useHasEntered } from '@/hooks/useCircuitContract';
import { useTransactionToast } from '@/hooks/useTransactionToast';
import { ArrowLeft, Copy, Check, Users, Clock, Shield, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CircuitDetail() {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();
  const [selectedPathline, setSelectedPathline] = useState<number | undefined>();
  const [copied, setCopied] = useState(false);

  // Fetch circuit data
  const { data: circuit, raw: contractCircuit, isLoading, refetch } = useGetCircuit(id);

  // Debug log raw contract data
  useEffect(() => {
    if (contractCircuit) {
      console.log('[CircuitDetail] Raw contract data:', contractCircuit);
    }
  }, [contractCircuit]);

  // Check if user has entered
  const { hasEntered } = useHasEntered(id, address);

  // Enter circuit hook
  const {
    enterCircuit,
    isPending: isEntering,
    isConfirming: isEnterConfirming,
    isSuccess: entrySuccess,
    isError: isEnterError,
    error: enterError,
    isEncrypting,
    hash: enterHash
  } = useEnterCircuit();

  // Transaction toast notifications
  useTransactionToast({
    hash: enterHash,
    isConfirming: isEnterConfirming,
    isSuccess: entrySuccess,
    isError: isEnterError,
    error: enterError,
    successTitle: 'Entry Successful!',
    successDescription: 'Your encrypted prediction has been submitted',
    errorTitle: 'Entry Failed'
  });

  // Refetch circuit data when entry is successful
  useEffect(() => {
    if (entrySuccess) {
      refetch();
    }
  }, [entrySuccess, refetch]);

  // Reset pathline selection when circuit changes
  useEffect(() => {
    if (id) {
      setSelectedPathline(undefined);
      console.log('[CircuitDetail] Circuit ID changed, reset selection:', id);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Loading circuit...</p>
        </div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Circuit Not Found</h1>
          <p className="text-muted-foreground mb-6">The circuit you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/circuits">Back to Circuits</Link>
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied to clipboard" });
  };

  const handleEnter = async () => {
    if (!address) {
      toast({ title: "Please connect your wallet", variant: "destructive" });
      return;
    }

    if (selectedPathline === undefined) {
      toast({ title: "Please select a pathline", variant: "destructive" });
      return;
    }

    if (!circuit) {
      toast({ title: "Circuit data not loaded", variant: "destructive" });
      return;
    }

    console.log('[handleEnter] Circuit data:', {
      circuitId: circuit.circuitId,
      urlId: id
    });

    await enterCircuit(id!, selectedPathline);
  };

  const totalVotes = circuit.votes.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link to="/circuits">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Circuits
            </Link>
          </Button>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge 
              variant="secondary" 
              className="font-mono text-sm cursor-pointer hover:bg-secondary/80"
              onClick={() => copyToClipboard(circuit.circuitId)}
            >
              {circuit.circuitId}
              {copied ? <Check className="w-3 h-3 ml-2" /> : <Copy className="w-3 h-3 ml-2" />}
            </Badge>
            <StatusBadge status={circuit.status} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{circuit.headline}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              Created by: 
              <span className="font-mono text-foreground">{circuit.creator}</span>
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4"
            >
              <Card variant="glass">
                <CardContent className="p-6 text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-nova" />
                  <p className="text-sm text-muted-foreground mb-1">Demo Mode</p>
                  <p className="text-2xl font-bold">FHE Encrypted</p>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-6 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-ember" />
                  <p className="text-sm text-muted-foreground mb-1">Participants</p>
                  <p className="text-2xl font-bold">{circuit.totalEntrants}</p>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-6 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-tidal" />
                  <p className="text-sm text-muted-foreground mb-1">Lock Time</p>
                  <p className="text-2xl font-bold">
                    <CountdownTimer lockTime={circuit.lockTime} compact />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pathline Selection */}
            {circuit.status === 'open' && !hasEntered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Choose Your Pathline</CardTitle>
                    <CardDescription>Select your prediction and place your entry</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PathlineSelector
                      selected={selectedPathline}
                      votes={circuit.votes}
                      onSelect={setSelectedPathline}
                    />
                    
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50 border border-border/50">
                      <Shield className="w-5 h-5 text-nova" />
                      <p className="text-sm text-muted-foreground">
                        Your choice will be encrypted on-chain using FHE technology
                      </p>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleEnter}
                      disabled={selectedPathline === undefined || isEncrypting || isEntering || !address}
                    >
                      {isEncrypting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Encrypting choice...
                        </>
                      ) : isEntering ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Placing entry...
                        </>
                      ) : !address ? (
                        'Connect Wallet to Enter'
                      ) : (
                        'Place Encrypted Entry'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Vote Results (if settled/locked) */}
            {(circuit.status === 'settled' || circuit.status === 'locked') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Vote Distribution</CardTitle>
                    <CardDescription>
                      {circuit.status === 'settled' ? 'Final results' : 'Revealing votes...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {PATHLINES.map((pathline) => (
                      <VoteBar
                        key={pathline.name}
                        pathlineIndex={pathline.index}
                        votes={circuit.votes[pathline.index]}
                        total={totalVotes}
                        isWinner={circuit.winningPathline === pathline.index}
                      />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Participants List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="glass">
                <Accordion type="single" collapsible>
                  <AccordionItem value="participants" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Participants ({circuit.entrants.length})
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Showing {circuit.totalEntrants} total entrants; individual addresses remain hidden in this encrypted build.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Entry Card */}
            {hasEntered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card variant="nova">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">My Entry</CardTitle>
                      <Badge variant="nova">Entered</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <span>Choice: <span className="text-nova">🔒 Encrypted</span></span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This circuit keeps the interaction value-free and focuses on validating the FHE encryption workflow.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Circuit Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TimelineItem
                      status="completed"
                      label="Created"
                      icon={<Shield className="w-4 h-4" />}
                    />
                    <TimelineItem
                      status={circuit.status === 'open' ? 'active' : 'completed'}
                      label="Open for Entry"
                      icon={<Clock className="w-4 h-4" />}
                      time={circuit.status === 'open' ? <CountdownTimer lockTime={circuit.lockTime} /> : undefined}
                    />
                    <TimelineItem
                      status={circuit.status === 'locked' ? 'active' : circuit.status === 'settled' ? 'completed' : 'pending'}
                      label="Vote Reveal"
                      icon={<Lock className="w-4 h-4" />}
                    />
                    <TimelineItem
                      status={circuit.status === 'settled' ? 'completed' : circuit.status === 'cancelled' ? 'cancelled' : 'pending'}
                      label="Demo Complete"
                      icon={<Shield className="w-4 h-4" />}
                      isLast
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface TimelineItemProps {
  status: 'completed' | 'active' | 'pending' | 'cancelled';
  label: string;
  icon: React.ReactNode;
  time?: React.ReactNode;
  isLast?: boolean;
}

function TimelineItem({ status, label, icon, time, isLast }: TimelineItemProps) {
  const colors = {
    completed: 'text-status-open border-status-open',
    active: 'text-nova border-nova',
    pending: 'text-muted-foreground border-muted',
    cancelled: 'text-status-cancelled border-status-cancelled',
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${colors[status]}`}>
          {icon}
        </div>
        {!isLast && <div className={`w-0.5 h-8 ${status === 'completed' ? 'bg-status-open' : 'bg-muted'}`} />}
      </div>
      <div className="flex-1 pb-4">
        <p className={`font-medium ${status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
          {label}
        </p>
        {time && <div className="mt-1">{time}</div>}
      </div>
    </div>
  );
}
