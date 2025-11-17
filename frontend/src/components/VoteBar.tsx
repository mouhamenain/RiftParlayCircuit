import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { PATHLINES } from '@/lib/types';

interface VoteBarProps {
  pathlineIndex: number;
  votes: number;
  total: number;
  isWinner?: boolean;
}

export function VoteBar({ pathlineIndex, votes, total, isWinner }: VoteBarProps) {
  const pathline = PATHLINES[pathlineIndex];
  const percentage = total > 0 ? (votes / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span 
            className="font-medium"
            style={{ color: `hsl(var(--${pathline.color}))` }}
          >
            {pathline.label}
          </span>
          {isWinner && (
            <Crown className="w-4 h-4 text-status-locked" />
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {votes} votes ({Math.round(percentage)}%)
        </span>
      </div>
      
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${isWinner ? 'animate-pulse-slow' : ''}`}
          style={{ background: `var(--gradient-${pathline.color})` }}
        />
      </div>
    </div>
  );
}
