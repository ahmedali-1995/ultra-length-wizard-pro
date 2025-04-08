
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
    { 
      id: 'length', 
      name: 'Length', 
      icon: <Ruler className="h-4 w-4 mr-2" />,
      description: 'Measure distances between points'
    },
    { 
      id: 'area', 
      name: 'Area', 
      icon: <Square className="h-4 w-4 mr-2" />,
      description: 'Compare surface measurements' 
    },
    { 
      id: 'volume', 
      name: 'Volume', 
      icon: <Box className="h-4 w-4 mr-2" />,
      description: 'Calculate space in three dimensions'
    }
  ] as const;

  // Find the currently selected dimension
  const selectedIndex = dimensions.findIndex(d => d.id === selectedDimension);
  
  return (
    <div className="space-y-2">
      <div className="relative flex flex-wrap gap-2 justify-center mb-6">
        {dimensions.map((dim, index) => (
          <motion.div
            key={dim.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
          className="absolute -bottom-3 h-1 bg-primary rounded-full"
          initial={false}
          animate={{ 
            left: `${selectedIndex * 33.33 + (33.33/2) - 10}%`,
            width: '20%' 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      
      {/* Description text */}
      <motion.div 
        key={selectedDimension}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center text-sm text-muted-foreground"
      >
        {dimensions.find(d => d.id === selectedDimension)?.description}
      </motion.div>
    </div>
  );
};

export default DimensionSelector;
