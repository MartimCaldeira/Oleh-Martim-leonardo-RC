import { useEffect, useMemo, useRef, useState } from 'react';
import { Country, SortField, SortOrder } from '../types/api';

interface UseCountriesProps {
  search: string;
  region: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

interface UseCountriesResult {
  countries: Country[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCountries({ search, region, sortField, sortOrder }: UseCountriesProps): UseCountriesResult {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCountries = async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      // Using 'all' endpoint and filtering client-side as per requirements for robust client-side handling
      // In a real large-scale app, we might use specific endpoints, but 'all' gives us the flexibility to filter/sort everything client-side
      // as requested in the assignment (client-side pagination/sorting).
      const response = await fetch('https://restcountries.com/v3.1/all', {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido recebido da API');
      }

      setAllCountries(data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao carregar os países.');
    } finally {
      // Only turn off loading if not aborted (to avoid flickering if a new request started immediately)
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCountries();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Client-side filtering and sorting
  const processedCountries = useMemo(() => {
    let result = [...allCountries];

    // 1. Filter by Region
    if (region && region !== 'All') {
      result = result.filter(c => c.region === region);
    }

    // 2. Filter by Search (Name)
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(c => 
        c.name.common.toLowerCase().includes(searchLower) || 
        c.name.official.toLowerCase().includes(searchLower)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      let valA: any = '';
      let valB: any = '';

      switch (sortField) {
        case 'name':
          valA = a.name.common;
          valB = b.name.common;
          break;
        case 'population':
          valA = a.population;
          valB = b.population;
          break;
        case 'area':
          valA = a.area || 0;
          valB = b.area || 0;
          break;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [allCountries, search, region, sortField, sortOrder]);

  return {
    countries: processedCountries,
    loading,
    error,
    refetch: fetchCountries
  };
}
