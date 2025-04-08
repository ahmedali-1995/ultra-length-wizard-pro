
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { convert, formatValue, groupedLengthUnits } from '@/utils/conversionUtils';

interface FavoriteConversion {
  id: string;
  fromUnit: string;
  toUnit: string;
}

interface FavoriteConversionsProps {
  onSelect: (fromUnit: string, toUnit: string) => void;
  currentFromUnit: string;
  currentToUnit: string;
  precision: number;
  value: string;
}

const FavoriteConversions: React.FC<FavoriteConversionsProps> = ({
  onSelect,
  currentFromUnit,
  currentToUnit,
  precision,
  value
}) => {
  const [favorites, setFavorites] = useState<FavoriteConversion[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favConversions');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Error parsing favorites:', e);
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteConversion[]) => {
    localStorage.setItem('favConversions', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const addToFavorites = () => {
    const newFavorite = {
      id: `${currentFromUnit}-${currentToUnit}`,
      fromUnit: currentFromUnit,
      toUnit: currentToUnit
    };
    
    // Check if already exists
    const exists = favorites.some(f => f.id === newFavorite.id);
    
    if (!exists) {
      const updatedFavorites = [...favorites, newFavorite];
      saveFavorites(updatedFavorites);
      toast.success("Added to favorites");
    } else {
      toast.info("This conversion is already in your favorites");
    }
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(f => f.id !== id);
    saveFavorites(updatedFavorites);
    toast.success("Removed from favorites");
  };

  // Helper function to get unit name by ID
  const getUnitName = (unitId: string): string => {
    for (const group of Object.values(groupedLengthUnits)) {
      const unit = group.find(u => u.id === unitId);
      if (unit) return unit.name;
    }
    return unitId;
  };

  if (favorites.length === 0) {
    return (
      <div className="mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={addToFavorites}
          className="flex items-center gap-1"
        >
          <Heart className="h-4 w-4" />
          <span>Save this conversion</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Favorites</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addToFavorites}
          className="flex items-center gap-1"
        >
          <Heart className="h-4 w-4" />
          <span>Save current</span>
        </Button>
      </div>
      
      <div className="space-y-2">
        {favorites.map(fav => {
          const fromName = getUnitName(fav.fromUnit);
          const toName = getUnitName(fav.toUnit);
          
          // Only calculate if we have a valid number
          const numericValue = parseFloat(value);
          const result = !isNaN(numericValue) 
            ? formatValue(convert(numericValue, fav.fromUnit, fav.toUnit), precision)
            : '';
          
          return (
            <div 
              key={fav.id} 
              className="flex items-center justify-between bg-muted/50 p-2 rounded-lg hover:bg-muted cursor-pointer"
              onClick={() => onSelect(fav.fromUnit, fav.toUnit)}
            >
              <div className="flex flex-col">
                <div className="text-sm font-medium">
                  {fromName} → {toName}
                </div>
                {!isNaN(numericValue) && (
                  <div className="text-xs text-muted-foreground">
                    {value} {fromName} = {result} {toName}
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(fav.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteConversions;
