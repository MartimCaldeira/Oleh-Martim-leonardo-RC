import { Heart } from 'lucide-react';
import { Country } from '../types/api';

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (cca3: string) => void;
}

export function CountryCard({ country, isFavorite, onToggleFavorite }: CountryCardProps) {
  const formatNumber = (num: number) => new Intl.NumberFormat('pt-PT').format(num);

  return (
    <div className="neu-flat p-0 overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={country.flags.svg} 
          alt={country.flags.alt || `Bandeira de ${country.name.common}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-bold text-foreground leading-tight line-clamp-2" title={country.name.official}>
            {country.name.common}
          </h2>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(country.cca3);
            }}
            className={`p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? 'text-accent bg-accent/10 shadow-inner' 
                : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
            }`}
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground flex-grow">
          <div className="flex items-center justify-between">
            <span className="font-medium">População:</span>
            <span className="text-foreground">{formatNumber(country.population)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Região:</span>
            <span className="text-foreground">{country.region}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Capital:</span>
            <span className="text-foreground truncate max-w-[50%] text-right" title={country.capital?.join(', ')}>
              {country.capital?.[0] || '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
