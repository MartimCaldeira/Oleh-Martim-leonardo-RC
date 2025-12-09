import { X, MapPin, Users, Globe2, DollarSign, Languages } from 'lucide-react';
import { Country } from '../types/api';
import { useEffect, useRef } from 'react';

interface CountryDetailModalProps {
  country: Country | null;
  onClose: () => void;
}

export function CountryDetailModal({ country, onClose }: CountryDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (country) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [country, onClose]);

  if (!country) return null;

  const formatNumber = (num: number) => new Intl.NumberFormat('pt-PT').format(num);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className="bg-background w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Flag Section */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-muted/20 p-8 flex items-center justify-center">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Bandeira de ${country.name.common}`}
              className="w-full h-auto max-h-full object-contain shadow-lg rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            <div>
              <h2 id="modal-title" className="text-3xl font-bold text-foreground mb-2">
                {country.name.official}
              </h2>
              <p className="text-xl text-primary font-medium">{country.name.common}</p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/10">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Capital & Região</p>
                  <p className="text-foreground">
                    {country.capital?.join(', ') || 'N/A'}, {country.region} {country.subregion ? `(${country.subregion})` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/10">
                <Users className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">População</p>
                  <p className="text-foreground">{formatNumber(country.population)} habitantes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/10">
                <Globe2 className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Área</p>
                  <p className="text-foreground">{formatNumber(country.area)} km²</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/10">
                <DollarSign className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Moedas</p>
                  <p className="text-foreground">
                    {country.currencies 
                      ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/10">
                <Languages className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Línguas</p>
                  <p className="text-foreground">
                    {country.languages 
                      ? Object.values(country.languages).join(', ')
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-muted-foreground mb-3">Países Vizinhos:</p>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map(border => (
                    <span key={border} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {border}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {country.maps?.googleMaps && (
              <div className="pt-4 flex gap-4">
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neu-btn flex-1 text-center text-sm"
                >
                  Ver no Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
