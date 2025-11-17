import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Plus, LayoutGrid, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  const location = useLocation();

  const navLinks = [
    { href: '/circuits', label: 'Circuits', icon: LayoutGrid },
    { href: '/create', label: 'Create', icon: Plus },
    { href: '/my-circuits', label: 'My Circuits', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-nova flex items-center justify-center group-hover:shadow-lg group-hover:shadow-nova/30 transition-shadow">
            <Zap className="w-5 h-5 text-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            Rift<span className="text-nova">Parlay</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            
            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <ConnectButton />
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around border-t border-border/50 py-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          
          return (
            <Link key={link.href} to={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-col gap-1 h-auto py-2",
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{link.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
