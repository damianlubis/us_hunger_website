import { MapPin, Star, Clock, Navigation, ExternalLink } from 'lucide-react';

interface LocationCardProps {
  id: string;
  name: string;
  address: string;
  isOpenNow?: boolean;
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  googleMapsUri?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function LocationCard({ 
    id, name, address, isOpenNow, rating, userRatingCount, 
    websiteUri, googleMapsUri, isSelected, onSelect 
}: LocationCardProps) {
  return (
    <div 
      id={`card-${id}`}
      className={`p-4 rounded-xl border transition-all cursor-pointer group ${
        isSelected 
        ? 'bg-secondary/5 border-secondary ring-2 ring-secondary/20 shadow-lg scale-[1.02]' 
        : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1" title={name}>
          {name}
        </h3>
        {isOpenNow !== undefined && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${isOpenNow ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {isOpenNow ? 'Open' : 'Closed'}
          </span>
        )}
      </div>
      
      <div className="flex items-start gap-2 text-slate-500 text-sm mb-3">
        <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
        <span className="line-clamp-2 leading-tight">{address}</span>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4">
        {rating && (
          <div className="flex items-center gap-1 text-orange-500">
            <Star className="w-3 h-3 fill-current" />
            <span>{rating}</span>
            <span className="text-slate-300 font-normal">({userRatingCount})</span>
          </div>
        )}
         <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Updates daily</span>
         </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-50">
        {googleMapsUri && (
          <a 
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 text-slate-600 hover:bg-secondary hover:text-white transition-all text-[10px] font-black uppercase tracking-wider"
          >
            <Navigation className="w-3 h-3" />
            Directions
          </a>
        )}
        {websiteUri && (
          <a 
            href={websiteUri}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 text-slate-600 hover:bg-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-wider"
          >
            <ExternalLink className="w-3 h-3" />
            Website
          </a>
        )}
      </div>
    </div>
  );
}
