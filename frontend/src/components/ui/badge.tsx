import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        open: "border-transparent bg-status-open/20 text-status-open border-status-open/30",
        locked: "border-transparent bg-status-locked/20 text-status-locked border-status-locked/30",
        settled: "border-transparent bg-status-settled/20 text-status-settled border-status-settled/30",
        cancelled: "border-transparent bg-status-cancelled/20 text-status-cancelled border-status-cancelled/30",
        nova: "border-transparent bg-nova/20 text-nova border-nova/30",
        ember: "border-transparent bg-ember/20 text-ember border-ember/30",
        tidal: "border-transparent bg-tidal/20 text-tidal border-tidal/30",
        quake: "border-transparent bg-quake/20 text-quake border-quake/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
