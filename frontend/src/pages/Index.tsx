import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CircuitCard } from '@/components/CircuitCard';
import { Header } from '@/components/Header';
import { useListCircuits } from '@/hooks/useCircuitContract';
import { convertContractCircuits } from '@/lib/contract-utils';
import { Shield, Target, ArrowRight, Zap, Users, Activity } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Encrypted Choices',
    description: 'Your predictions are secured with Fully Homomorphic Encryption (FHE) technology, ensuring complete privacy until reveal.',
    color: 'nova',
  },
  {
    icon: Target,
    title: 'Four Pathlines',
    description: 'Choose from Nova, Ember, Tidal, or Quake. Each pathline represents a unique prediction outcome.',
    color: 'tidal',
  },
  {
    icon: Shield,
    title: 'Zero Entry Fee',
    description: 'Focus on the encryption UX only — every circuit is free to enter.',
    color: 'ember',
  },
];

const stats = [
  { label: 'Total Circuits', value: '1,247', icon: Activity },
  { label: 'Active Circuits', value: '89', icon: Zap },
  { label: 'Participants', value: '12.4K', icon: Users },
  { label: 'Encryption Success', value: '100%', icon: Shield },
];

export default function Index() {
  const { circuits: contractCircuits, isLoading, isError, total } = useListCircuits(0, 6);
  const recentCircuits = convertContractCircuits(contractCircuits);

  // Debug logging
  console.log('[Index] Contract circuits:', contractCircuits);
  console.log('[Index] Total:', total);
  console.log('[Index] Is loading:', isLoading);
  console.log('[Index] Is error:', isError);
  console.log('[Index] Converted circuits:', recentCircuits);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-nova/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-tidal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-ember/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nova/10 border border-nova/30 mb-6"
            >
              <Zap className="w-4 h-4 text-nova" />
              <span className="text-sm text-nova font-medium">Privacy-First Predictions</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Rift </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova via-tidal to-quake">
                Parlay Circuit
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Privacy-preserving prediction markets powered by fully homomorphic encryption. 
              Your choices stay encrypted until the reveal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/circuits">
                  Explore Circuits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/create">
                  Create Circuit
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Secure, transparent, and fair prediction markets built on cutting-edge encryption technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Card variant="glass" className="h-full p-6 glass-hover">
                    <div 
                      className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
                      style={{ background: `var(--gradient-${feature.color})` }}
                    >
                      <Icon className="w-7 h-7 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Circuits */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Recent Circuits</h2>
              <p className="text-muted-foreground">Jump into the action with these active prediction markets.</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/circuits">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Loading circuits...
              </div>
            ) : recentCircuits.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No circuits found. Be the first to create one!
              </div>
            ) : (
              recentCircuits.map((circuit, index) => (
                <motion.div
                  key={circuit.circuitId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                >
                  <CircuitCard circuit={circuit} />
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Button variant="outline" asChild>
              <Link to="/circuits">
                View All Circuits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Card variant="glass" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-nova/10 via-tidal/10 to-quake/10" />
            <CardContent className="relative p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Predict?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Create your own prediction market or join existing circuits. 
                Your encrypted choice, your potential reward.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/create">
                    Create Your Circuit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 Rift Parlay Circuit. Privacy-preserving prediction markets.</p>
        </div>
      </footer>
    </div>
  );
}
