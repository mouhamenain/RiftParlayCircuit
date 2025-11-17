import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { CountdownTimer } from '@/components/CountdownTimer';
import { CircuitSnapshot, PATHLINES } from '@/lib/types';
import { Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CircuitCardProps {
  circuit: CircuitSnapshot;
}

export function CircuitCard({ circuit }: CircuitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card variant="glass" className="h-full flex flex-col glass-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="font-mono text-xs">
              {circuit.circuitId}
            </Badge>
            <StatusBadge status={circuit.status} />
          </div>
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
            {circuit.headline}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
                  <Shield className="w-3 h-3" />
                  Demo
                </div>
                <span className="font-bold text-sm">FHE Encrypted</span>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
                  <Users className="w-3 h-3" />
                  Entrants
                </div>
                <span className="font-bold text-sm">{circuit.totalEntrants}</span>
              </div>
            </div>

            {/* Pathline Distribution */}
            <div className="flex gap-1">
              {PATHLINES.map((pathline) => (
                <div 
                  key={pathline.name}
                  className="flex-1 text-center py-1.5 rounded-md text-xs font-medium"
                  style={{ 
                    backgroundColor: `hsl(var(--${pathline.color}) / 0.15)`,
                    color: `hsl(var(--${pathline.color}))`
                  }}
                >
                  {circuit.votes[pathline.index]}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            {circuit.status === 'open' ? (
              <CountdownTimer lockTime={circuit.lockTime} />
            ) : (
              <span className="text-sm text-muted-foreground">
                {circuit.status === 'settled' && circuit.winningPathline !== undefined && (
                  <span style={{ color: `hsl(var(--${PATHLINES[circuit.winningPathline].color}))` }}>
                    Winner: {PATHLINES[circuit.winningPathline].label}
                  </span>
                )}
                {circuit.status === 'locked' && 'Revealing votes...'}
                {circuit.status === 'cancelled' && 'Cancelled'}
              </span>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/circuit/${circuit.circuitId}`}>
                View <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
