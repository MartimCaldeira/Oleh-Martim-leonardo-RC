import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { CountryCard } from '../components/CountryCard';
import { Pagination } from '../components/Pagination';
import { CountryDetailModal } from '../components/CountryDetailModal';
import { useCountries } from '../hooks/useCountries';
import { useDebounce } from '../hooks/useDebounce';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SortField, SortOrder, Country } from '../types/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  // State for filters
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [region, setRegion] = useLocalStorage<string>('lastRegion', 'All');
  const [sortField, setSortField] = useLocalStorage<SortField>('lastSortField', 'name');
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrder>('lastSortOrder', 'asc');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // State for favorites
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  // State for modal
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Fetch data
  const { countries, loading, error, refetch } = useCountries({
    search: debouncedSearch,
    region,
    sortField,
    sortOrder
  });

  // Pagination logic
  const totalPages = Math.ceil(countries.length / pageSize);
  
  const paginatedCountries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return countries.slice(start, start + pageSize);
  }, [countries, currentPage, pageSize]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [debouncedSearch, region, sortField, sortOrder, pageSize]);

  const toggleFavorite = (cca3: string) => {
    setFavorites(prev => 
      prev.includes(cca3) 
        ? prev.filter(code => code !== cca3)
        : [...prev, cca3]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      <main className="container py-8">
        <Filters
          search={search}
          onSearchChange={setSearch}
          region={region}
          onRegionChange={setRegion}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">A carregar países...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center" role="alert" aria-live="assertive">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ops! Algo correu mal.</h2>
            <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
            <button onClick={refetch} className="neu-btn">
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && countries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
            <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Nenhum país encontrado</h2>
            <p className="text-muted-foreground">
              Tente ajustar a sua pesquisa ou filtros para encontrar o que procura.
            </p>
          </div>
        )}

        {/* Success State - Grid */}
        {!loading && !error && countries.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedCountries.map((country) => (
                <div 
                  key={country.cca3} 
                  onClick={() => setSelectedCountry(country)}
                  className="cursor-pointer h-full"
                >
                  <CountryCard
                    country={country}
                    isFavorite={favorites.includes(country.cca3)}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </main>

      <CountryDetailModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );
}
