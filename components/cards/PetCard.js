// ================================
// src/components/cards/PetCard.jsx - Carte d'animal
// ================================

import React from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import { formatTimeAgo } from '../../utils/helpers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const PetCard = ({ pet, onClick, onParticipate }) => {
  const handleParticipateClick = (e) => {
    e.stopPropagation();
    onParticipate?.(pet.id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick?.(pet)}
    >
      <div className="flex gap-4">
        <div className="text-6xl flex-shrink-0">{pet.image}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg text-gray-800 truncate">{pet.name}</h3>
              <p className="text-gray-600 text-sm">
                {pet.type} • {pet.race} • {pet.color}
              </p>
            </div>
            {pet.reward && (
              <Badge variant="success" size="sm" className="ml-2">
                Récompense {pet.reward}€
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{pet.location} • {pet.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{formatTimeAgo(pet.lostDate)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-blue-600">
                <Users className="w-4 h-4" />
                <span>{pet.participants} participants</span>
              </div>
              <div className="flex items-center gap-1 text-orange-600">
                <MapPin className="w-4 h-4" />
                <span>{pet.sightings} signalements</span>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={handleParticipateClick}
              className="flex-shrink-0"
            >
              Je participe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;