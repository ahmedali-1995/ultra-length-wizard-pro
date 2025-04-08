
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  allUnitsByDimension, 
  allGroupedUnitsByDimension,
  convert, 
  formatValue, 
  getRelativeScale, 
  areUnitsCompatible
} from '@/utils/conversionUtils';
import DimensionSelector from './DimensionSelector';
import { toast } from 'sonner';
import { ArrowRight, Maximize2, Minimize2, RefreshCcw, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const ConversionVisualizer: React.FC = () => {
  const [dimension, setDimension] = useState<'length' | 'area' | 'volume'>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [value, setValue] = useState<string>('1');
  const [scale, setScale] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<boolean>(true);
  
  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      try {
        // Check if units are compatible
        if (!areUnitsCompatible(fromUnit, toUnit)) {
          toast.error("Units are not compatible");
          return;
        }
        
        // Calculate conversion
        const numericValue = parseFloat(value);
        const convertedValue = convert(numericValue, fromUnit, toUnit);
        setResult(convertedValue);
        
        // Calculate relative scale for visualization
        const relativeScale = getRelativeScale(fromUnit, toUnit);
        setScale(relativeScale);
        
        // Auto adjust zoom if needed
        if (autoScale) {
          const newZoom = calculateIdealZoom(relativeScale);
          setZoomLevel(newZoom);
        }
      } catch (error) {
        console.error('Visualization error:', error);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, dimension, autoScale]);
  
  // Helper function to calculate ideal zoom level based on scale
  const calculateIdealZoom = (scale: number): number => {
    if (scale > 1000) return 0.01;
    if (scale > 100) return 0.1;
    if (scale > 10) return 0.5;
    if (scale < 0.001) return 100;
    if (scale < 0.01) return 10;
    if (scale < 0.1) return 5;
    return 1;
  };
  
  const handleDimensionChange = (newDimension: 'length' | 'area' | 'volume') => {
    setDimension(newDimension);
    // Reset units based on new dimension
    const defaultUnits = {
      length: { from: 'meter', to: 'foot' },
      area: { from: 'square-meter', to: 'square-foot' },
      volume: { from: 'cubic-meter', to: 'cubic-foot' }
    };
    
    setFromUnit(defaultUnits[newDimension].from);
    setToUnit(defaultUnits[newDimension].to);
  };
  
  const resetZoom = () => {
    setZoomLevel(1);
    setAutoScale(true);
  };
  
  const units = allUnitsByDimension[dimension];
  const groupedUnits = allGroupedUnitsByDimension[dimension];
  
  const getUnitName = (id: string): string => {
    const unit = units.find(u => u.id === id);
    return unit ? unit.name : id;
  };
  
  const getUnitAbbreviation = (id: string): string => {
    const unit = units.find(u => u.id === id);
    return unit ? unit.abbreviation : id;
  };
  
  // Calculate visual representation width
  const fromBarWidth = 100; // Base width percentage
  const toBarWidth = Math.min(Math.max((scale * 100 * zoomLevel), 5), 200); // Adjusted by scale and zoom
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Unit Comparison Visualizer</h2>
      
      <DimensionSelector 
        selectedDimension={dimension} 
        onChange={handleDimensionChange} 
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From Unit</Label>
              <Select
                value={fromUnit}
                onValueChange={setFromUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedUnits).map(([group, groupUnits]) => (
                    groupUnits.length > 0 && (
                      <SelectGroup key={group}>
                        <SelectLabel className="capitalize">{group}</SelectLabel>
                        {groupUnits.map(unit => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.abbreviation})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>To Unit</Label>
              <Select
                value={toUnit}
                onValueChange={setToUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedUnits).map(([group, groupUnits]) => (
                    groupUnits.length > 0 && (
                      <SelectGroup key={group}>
                        <SelectLabel className="capitalize">{group}</SelectLabel>
                        {groupUnits.map(unit => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.abbreviation})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter a number"
              className="text-lg"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>1 {getUnitName(fromUnit)} ({getUnitAbbreviation(fromUnit)})</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
              <span>{scale ? formatValue(scale, 6) : '?'} {getUnitName(toUnit)} ({getUnitAbbreviation(toUnit)})</span>
            </div>
            <div className="text-muted-foreground text-xs">
              {scale > 1 ? 
                `1 ${getUnitName(fromUnit)} is ${scale.toFixed(2)}× larger than 1 ${getUnitName(toUnit)}` :
                scale < 1 ?
                `1 ${getUnitName(fromUnit)} is ${(1/scale).toFixed(2)}× smaller than 1 ${getUnitName(toUnit)}` :
                `1 ${getUnitName(fromUnit)} is equal to 1 ${getUnitName(toUnit)}`
              }
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="zoom" className="min-w-20">Visual Zoom</Label>
            <Slider 
              id="zoom"
              className="flex-1" 
              value={[zoomLevel]} 
              min={0.01} 
              max={10} 
              step={0.01}
              onValueChange={(value) => {
                setZoomLevel(value[0]);
                setAutoScale(false);
              }}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={resetZoom}
              title="Reset zoom"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Visual Zoom</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust the zoom level to better visualize the relative sizes when there are extreme differences.
                    Auto-scaling automatically sets an appropriate zoom level.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        
        <Card className="p-4 flex flex-col justify-center items-center overflow-hidden">
          <div className="text-center mb-4">
            <div className="font-semibold">Visual Comparison</div>
            <div className="text-sm text-muted-foreground">
              (Zoom level: {zoomLevel.toFixed(2)}x)
            </div>
          </div>
          
          {result !== null && (
            <div className="w-full space-y-12 p-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{value} {getUnitAbbreviation(fromUnit)}</span>
                  <span>{getUnitName(fromUnit)}</span>
                </div>
                <motion.div 
                  className="h-10 bg-primary/20 rounded-md w-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${fromBarWidth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{result ? formatValue(result, 4) : '?'} {getUnitAbbreviation(toUnit)}</span>
                  <span>{getUnitName(toUnit)}</span>
                </div>
                <motion.div 
                  className="h-10 bg-primary rounded-md relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${toBarWidth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setZoomLevel(Math.max(zoomLevel / 2, 0.01))}
              className="flex items-center gap-1"
            >
              <Minimize2 className="h-4 w-4" />
              <span>Zoom Out</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setZoomLevel(Math.min(zoomLevel * 2, 10))}
              className="flex items-center gap-1"
            >
              <Maximize2 className="h-4 w-4" />
              <span>Zoom In</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConversionVisualizer;
