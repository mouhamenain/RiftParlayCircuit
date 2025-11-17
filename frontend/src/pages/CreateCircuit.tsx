import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useCreateCircuit } from '@/hooks/useCircuitContract';
import { useTransactionToast } from '@/hooks/useTransactionToast';
import { Zap, Info, Clock, Hash } from 'lucide-react';

const DURATIONS = [
  { value: '600', label: '10 minutes' },
  { value: '3600', label: '1 hour' },
  { value: '21600', label: '6 hours' },
  { value: '86400', label: '24 hours' },
  { value: '259200', label: '3 days' },
  { value: '345600', label: '4 days' },
];

export default function CreateCircuit() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const {
    createCircuit,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
    hash
  } = useCreateCircuit();

  const [formData, setFormData] = useState({
    circuitId: '',
    headline: '',
    duration: '86400',
  });

  // Transaction toast notification
  useTransactionToast({
    hash,
    isConfirming,
    isSuccess,
    isError,
    error,
    successTitle: 'Circuit Created!',
    successDescription: `${formData.circuitId} is now live`,
    errorTitle: 'Creation Failed'
  });

  // Navigate when creation is successful
  useEffect(() => {
    if (isSuccess) {
      navigate(`/circuit/${formData.circuitId}`);
    }
  }, [isSuccess, formData.circuitId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a circuit.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.circuitId || !formData.headline) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const durationMinutes = Math.floor(Number(formData.duration) / 60);
    await createCircuit(
      formData.circuitId,
      formData.headline,
      durationMinutes
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card variant="glass">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-2xl bg-nova mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">Create New Circuit</CardTitle>
              <CardDescription className="text-base">
                Spin up an encrypted circuit without sending any funds.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Circuit ID */}
                <div className="space-y-2">
                  <Label htmlFor="circuitId" className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    Circuit ID
                  </Label>
                  <Input
                    id="circuitId"
                    placeholder="btc-100k-2025"
                    value={formData.circuitId}
                    onChange={(e) => setFormData({ ...formData, circuitId: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Unique identifier for your circuit (lowercase, numbers, and hyphens only)
                  </p>
                </div>

                {/* Headline */}
                <div className="space-y-2">
                  <Label htmlFor="headline" className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    Headline
                  </Label>
                  <Textarea
                    id="headline"
                    placeholder="Will Bitcoin reach $100k before the end of 2025?"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="resize-none"
                    rows={3}
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.headline.length}/200 characters
                  </p>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Duration
                  </Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATIONS.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How long the circuit stays open for entries
                  </p>
                </div>

                {/* Summary Card */}
                <Card className="bg-muted/50 border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Circuit Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">ID</p>
                        <p className="font-mono">{formData.circuitId || '-'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p>{DURATIONS.find(d => d.value === formData.duration)?.label}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pathlines</p>
                        <p>Nova, Ember, Tidal, Quake</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isPending || isConfirming || !isConnected}
                >
                  {isPending || isConfirming ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {isPending ? 'Confirm in wallet...' : 'Creating Circuit...'}
                    </>
                  ) : !isConnected ? (
                    'Connect Wallet to Create'
                  ) : (
                    'Create Circuit'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
