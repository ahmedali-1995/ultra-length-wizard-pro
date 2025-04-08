
import React from 'react';
import { Button } from "@/components/ui/button";
import { Ruler, SquareGantt, Cube } from 'lucide-react';
import { cn } from '@/lib/utils';

type DimensionType = 'length' | 'area' | 'volume';

interface DimensionSelectorProps {
  selectedDimension: DimensionType;
  onChange: (dimension: DimensionType) => void;
}

const DimensionSelector: React.FC<DimensionSelectorProps> = ({ 
  selectedDimension, 
  onChange 
}) => {
  const dimensions = [
    { id: 'length', name: 'Length', icon: <Ruler className="h-4 w-4 mr-2" /> },
    { id: 'area', name: 'Area', icon: <SquareGantt className="h-4 w-4 mr-2" /> },
    { id: 'volume', name: 'Volume', icon: <Cube className="h-4 w-4 mr-2" /> }
  ] as const;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {dimensions.map((dim) => (
        <Button
          key={dim.id}
          variant={selectedDimension === dim.id ? 'default' : 'outline'}
          size="sm"
          className={cn(
            "flex items-center gap-1.5",
            selectedDimension === dim.id ? 'bg-primary text-primary-foreground' : ''
          )}
          onClick={() => onChange(dim.id)}
        >
          {dim.icon}
          {dim.name}
        </Button>
      ))}
    </div>
  );
};

export default DimensionSelector;
