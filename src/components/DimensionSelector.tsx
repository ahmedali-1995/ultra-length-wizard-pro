
import React from 'react';
import { Button } from "@/components/ui/button";
import { Ruler, Square, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    { id: 'area', name: 'Area', icon: <Square className="h-4 w-4 mr-2" /> },
    { id: 'volume', name: 'Volume', icon: <Box className="h-4 w-4 mr-2" /> }
  ] as const;

  return (
    <div className="relative flex flex-wrap gap-2 justify-center mb-4">
      {dimensions.map((dim) => (
        <motion.div
          key={dim.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedDimension === dim.id ? 'default' : 'outline'}
            size="sm"
            className={cn(
              "flex items-center gap-1.5 transition-all duration-200",
              selectedDimension === dim.id ? 'bg-primary text-primary-foreground shadow-md' : ''
            )}
            onClick={() => onChange(dim.id)}
          >
            {dim.icon}
            {dim.name}
          </Button>
        </motion.div>
      ))}
      
      {/* Background indicator */}
      <motion.div 
        className="absolute bottom-0 h-0.5 bg-primary rounded-full"
        initial={false}
        animate={{ 
          left: `${dimensions.findIndex(d => d.id === selectedDimension) * 33.33}%`,
          width: '33.33%' 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default DimensionSelector;
