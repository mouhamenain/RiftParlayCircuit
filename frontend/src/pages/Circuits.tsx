import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { CircuitCard } from '@/components/CircuitCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useListCircuits } from '@/hooks/useCircuitContract';
import { convertContractCircuits } from '@/lib/contract-utils';
import type { CircuitStatus } from '@/lib/types';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Circuits() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');

  // Fetch all circuits from contract
  const { circuits: contractCircuits, isLoading, total } = useListCircuits(0, 100);
  const allCircuits = useMemo(() => convertContractCircuits(contractCircuits), [contractCircuits]);

  const filteredCircuits = useMemo(() => {
    return allCircuits.filter((circuit) => {
      const matchesFilter = filter === 'all' || circuit.status === filter;
      const matchesSearch = circuit.headline.toLowerCase().includes(search.toLowerCase()) ||
                            circuit.circuitId.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      switch (sort) {
        case 'ending':
          return a.lockTime - b.lockTime;
        case 'participants':
          return b.totalEntrants - a.totalEntrants;
        default:
          return b.lockTime - a.lockTime;
      }
    });
  }, [allCircuits, filter, search, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Circuits</h1>
          <p className="text-muted-foreground">Browse and join prediction markets.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <Tabs value={filter} onValueChange={setFilter} className="w-full lg:w-auto">
            <TabsList className="w-full lg:w-auto grid grid-cols-4 lg:flex">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open" className="text-status-open data-[state=active]:text-status-open">Open</TabsTrigger>
              <TabsTrigger value="locked" className="text-status-locked data-[state=active]:text-status-locked">Locked</TabsTrigger>
              <TabsTrigger value="settled" className="text-status-settled data-[state=active]:text-status-settled">Settled</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search circuits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="ending">Ending Soon</SelectItem>
                <SelectItem value="participants">Most Participants</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredCircuits.length} circuit{filteredCircuits.length !== 1 ? 's' : ''}
        </p>

        {/* Circuits Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Loading circuits...</p>
          </div>
        ) : filteredCircuits.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCircuits.map((circuit, index) => (
              <motion.div
                key={circuit.circuitId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <CircuitCard circuit={circuit} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              {search || filter !== 'all'
                ? 'No circuits found matching your criteria.'
                : 'No circuits created yet. Be the first to create one!'}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
