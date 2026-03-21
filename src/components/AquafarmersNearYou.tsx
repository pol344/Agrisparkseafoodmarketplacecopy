import { Star, MapPin, Truck, Award } from 'lucide-react';
import { mockFarms } from '../data/mockFarms';
import { Farm } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AquafarmersNearYouProps {
  onFarmClick?: (farm: Farm) => void;
}

export function AquafarmersNearYou({ onFarmClick }: AquafarmersNearYouProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-[#00796b] px-4">Aquafarmers Near You</h2>
      
      <div className="space-y-3 px-4">
        {mockFarms.map((farm) => (
          <button
            key={farm.id}
            onClick={() => onFarmClick?.(farm)}
            className="w-full text-left"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Hero Image */}
              <div className="relative h-32 overflow-hidden">
                <ImageWithFallback
                  src={farm.heroImage}
                  alt={farm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Farm Info */}
              <div className="p-4">
                {/* Farm Logo & Name */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={farm.logo}
                    alt={`${farm.name} logo`}
                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#00796b] mb-1 line-clamp-1">{farm.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{farm.rating}</span>
                      </div>
                      <span>|</span>
                      <span>{farm.harvestInfo}</span>
                      <span>|</span>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>₱{farm.deliveryFee} delivery</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{farm.description}</p>
                  </div>
                </div>

                {/* Specialties & Certifications */}
                <div className="flex flex-wrap gap-2">
                  {farm.specialties.slice(0, 2).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#e0f7fa] text-[#00796b] rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                  {farm.certifications.length > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                      <Award className="w-3 h-3" />
                      <span>{farm.certifications[0]}</span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{farm.location}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
