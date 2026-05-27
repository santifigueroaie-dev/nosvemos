import { ArrowUpDown, Filter, SlidersHorizontal } from 'lucide-react';

interface DestinationFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  budget: number;
  setBudget: (value: number) => void;
}

const DestinationFilters = ({
  filter,
  setFilter,
  sort,
  setSort,
  budget,
  setBudget,
}: DestinationFiltersProps) => {
  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'honduras', label: 'Honduras' },
    { value: 'turquia', label: 'Turquía' },
    { value: 'costa-rica', label: 'Costa Rica' },
    { value: 'malta', label: 'Malta' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Recomendados' },
    { value: 'price-low-high', label: 'Precio: bajo a alto' },
    { value: 'price-high-low', label: 'Precio: alto a bajo' },
    { value: 'name-az', label: 'Nombre: A-Z' },
    { value: 'name-za', label: 'Nombre: Z-A' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-end">
      <label className="flex w-full items-center gap-3 md:w-auto">
        <Filter className="h-5 w-5 text-charcoal" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-warmGray/30 bg-white/70 px-4 py-2 text-sm text-charcoal outline-none backdrop-blur-sm transition focus:border-mutedGold focus:ring-2 focus:ring-mutedGold/20"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex w-full items-center gap-3 md:w-auto">
        <ArrowUpDown className="h-5 w-5 text-charcoal" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-warmGray/30 bg-white/70 px-4 py-2 text-sm text-charcoal outline-none backdrop-blur-sm transition focus:border-mutedGold focus:ring-2 focus:ring-mutedGold/20"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex w-full items-center gap-3 md:max-w-[240px]">
        <SlidersHorizontal className="h-5 w-5 text-charcoal" />
        <label className="flex-1">
          <div className="mb-1 flex justify-between text-xs text-charcoal/60">
            <span>Presupuesto</span>
            <span>${budget.toLocaleString()}+</span>
          </div>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="h-2 w-full rounded-lg bg-warmGray/20 accent-mutedGold"
          />
        </label>
      </div>
    </div>
  );
};

export default DestinationFilters;
