import { CircuitStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Clock, Lock, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: CircuitStatus;
  className?: string;
}

const statusConfig = {
  open: {
    icon: Clock,
    label: 'Open',
    variant: 'open' as const,
  },
  locked: {
    icon: Lock,
    label: 'Locked',
    variant: 'locked' as const,
  },
  settled: {
    icon: CheckCircle,
    label: 'Settled',
    variant: 'settled' as const,
  },
  cancelled: {
    icon: XCircle,
    label: 'Cancelled',
    variant: 'cancelled' as const,
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}
