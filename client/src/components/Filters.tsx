import { Search, SlidersHorizontal } from 'lucide-react';
import { SortField, SortOrder } from '../types/api';

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}

export function Filters({
  search,
  onSearchChange,
  region,
  onRegionChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange
}: FiltersProps) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Pesquisar país..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="neu-input pl-12"
            aria-label="Pesquisar país"
          />
        </div>

        {/* Region Filter */}
        <div className="relative min-w-[200px]">
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="neu-flat w-full px-4 py-3 appearance-none bg-transparent cursor-pointer focus:ring-2 focus:ring-primary/50 outline-none"
            aria-label="Filtrar por região"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r === 'All' ? 'Todas as Regiões' : r}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 neu-flat bg-opacity-50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Ordenar por:</span>
        </div>
        
        <div className="flex gap-2">
          {(['name', 'population', 'area'] as SortField[]).map((field) => (
            <button
              key={field}
              onClick={() => onSortFieldChange(field)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortField === field
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {field === 'name' ? 'Nome' : field === 'population' ? 'População' : 'Área'}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2 hidden sm:block" />

        <div className="flex gap-2">
          <button
            onClick={() => onSortOrderChange('asc')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              sortOrder === 'asc'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            Asc
          </button>
          <button
            onClick={() => onSortOrderChange('desc')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              sortOrder === 'desc'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            Desc
          </button>
        </div>
      </div>
    </div>
  );
}
