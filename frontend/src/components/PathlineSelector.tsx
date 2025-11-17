import { motion } from 'framer-motion';
import { PATHLINES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PathlineSelectorProps {
  selected?: number;
  votes?: number[];
  disabled?: boolean;
  onSelect?: (pathline: number) => void;
  showVotes?: boolean;
}

export function PathlineSelector({ 
  selected, 
  votes = [0, 0, 0, 0], 
  disabled = false, 
  onSelect,
  showVotes = true 
}: PathlineSelectorProps) {
  const totalVotes = votes.reduce((a, b) => a + b, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {PATHLINES.map((pathline) => {
        const isSelected = selected === pathline.index;
        const percentage = totalVotes > 0 ? Math.round((votes[pathline.index] / totalVotes) * 100) : 0;

        return (
          <motion.button
            key={pathline.name}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={() => !disabled && onSelect?.(pathline.index)}
            disabled={disabled}
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
              `border-${pathline.color}/30 hover:border-${pathline.color}`,
              isSelected && `border-${pathline.color} bg-${pathline.color}/10 glow-${pathline.color}`,
              disabled && "opacity-60 cursor-not-allowed",
              !disabled && "cursor-pointer"
            )}
            style={{
              borderColor: isSelected ? `hsl(var(--${pathline.color}))` : undefined,
              backgroundColor: isSelected ? `hsl(var(--${pathline.color}) / 0.1)` : undefined,
              boxShadow: isSelected ? `0 0 30px hsl(var(--${pathline.color}) / 0.3)` : undefined,
            }}
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full mb-2 flex items-center justify-center",
                `bg-${pathline.color}`
              )}
              style={{ background: `var(--gradient-${pathline.color})` }}
            >
              <span className="text-lg">
                {pathline.index === 0 && '🟣'}
                {pathline.index === 1 && '🟠'}
                {pathline.index === 2 && '🔵'}
                {pathline.index === 3 && '🟢'}
              </span>
            </div>
            
            <span className={cn(
              "font-semibold",
              `text-${pathline.color}`
            )}
            style={{ color: `hsl(var(--${pathline.color}))` }}
            >
              {pathline.label}
            </span>
            
            {showVotes && totalVotes > 0 && (
              <span className="text-sm text-muted-foreground mt-1">
                {percentage}%
              </span>
            )}

            {isSelected && (
              <motion.div
                layoutId="pathline-indicator"
                className="absolute inset-0 rounded-xl border-2"
                style={{ borderColor: `hsl(var(--${pathline.color}))` }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
