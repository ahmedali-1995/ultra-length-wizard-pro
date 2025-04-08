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
import { ArrowRight, Maximize2, Minimize2, RefreshCcw, Info, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const ConversionVisualizer: React.FC = () => {
  const [dimension, setDimension] = useState<'length' | 'area' | 'volume'>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [value, setValue] = useState<string>('1');
  const [scale, setScale] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<boolean>(true);
  const [showRealWorldExamples, setShowRealWorldExamples] = useState<boolean>(true);
  
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
  
  // Real-world examples data based on dimensions and selected units
  const getRealWorldExamples = () => {
    const examples: { name: string; size: number; unit: string; description: string }[] = [];
    
    // Add examples based on dimension
    if (dimension === 'length') {
      examples.push(
        { name: 'Ant', size: 0.005, unit: 'meter', description: 'Average size of a worker ant' },
        { name: 'Credit card', size: 0.086, unit: 'meter', description: 'Length of a standard card' },
        { name: 'Smartphone', size: 0.15, unit: 'meter', description: 'Length of typical smartphone' },
        { name: 'Basketball', size: 0.24, unit: 'meter', description: 'Diameter of basketball' },
        { name: 'Door height', size: 2.1, unit: 'meter', description: 'Standard door height' },
        { name: 'Car length', size: 4.5, unit: 'meter', description: 'Average passenger car' },
        { name: 'Swimming pool', size: 25, unit: 'meter', description: 'Olympic pool length' },
        { name: 'Football field', size: 105, unit: 'meter', description: 'Standard field length' },
        { name: 'Eiffel Tower', size: 324, unit: 'meter', description: 'Height to the tip' },
        { name: 'Golden Gate Bridge', size: 2737, unit: 'meter', description: 'Total length' }
      );
    } else if (dimension === 'area') {
      examples.push(
        { name: 'Postage stamp', size: 0.0004, unit: 'square-meter', description: 'Area of typical stamp' },
        { name: 'Smartphone screen', size: 0.01, unit: 'square-meter', description: 'Screen area of typical smartphone' },
        { name: 'Piece of paper', size: 0.06, unit: 'square-meter', description: 'Standard A4 sheet' },
        { name: 'Door', size: 1.6, unit: 'square-meter', description: 'Standard door area' },
        { name: 'Parking space', size: 12, unit: 'square-meter', description: 'Standard car parking spot' },
        { name: 'Tennis court', size: 260, unit: 'square-meter', description: 'Singles court area' },
        { name: 'Basketball court', size: 420, unit: 'square-meter', description: 'NBA regulation court' },
        { name: 'Football field', size: 7140, unit: 'square-meter', description: 'Standard field area' },
        { name: 'City block', size: 18000, unit: 'square-meter', description: 'Typical urban block' },
        { name: 'Central Park', size: 3410000, unit: 'square-meter', description: 'NYC Central Park area' }
      );
    } else if (dimension === 'volume') {
      examples.push(
        { name: 'Teaspoon', size: 0.000005, unit: 'cubic-meter', description: '5 milliliters' },
        { name: 'Shot glass', size: 0.00004, unit: 'cubic-meter', description: '40 milliliters' },
        { name: 'Cup', size: 0.00025, unit: 'cubic-meter', description: '250 milliliters' },
        { name: 'Bottle of water', size: 0.001, unit: 'cubic-meter', description: '1 liter bottle' },
        { name: 'Microwave', size: 0.02, unit: 'cubic-meter', description: 'Interior volume' },
        { name: 'Refrigerator', size: 0.6, unit: 'cubic-meter', description: 'Average refrigerator' },
        { name: 'Hot tub', size: 1.8, unit: 'cubic-meter', description: '6-person hot tub' },
        { name: 'Cargo van', size: 11, unit: 'cubic-meter', description: 'Large cargo van' },
        { name: 'Shipping container', size: 33, unit: 'cubic-meter', description: 'Standard 20ft container' },
        { name: 'Swimming pool', size: 1250, unit: 'cubic-meter', description: 'Olympic-sized pool' }
      );
    }
    
    // Convert all examples to the user's currently selected units for better comprehension
    return examples.map(example => {
      try {
        const convertedSize = convert(example.size, example.unit, fromUnit);
        return {
          ...example,
          sizeInSelectedUnit: convertedSize,
          formattedSize: formatValue(convertedSize, 4)
        };
      } catch (error) {
        // If conversion fails (incompatible units), return original
        return {
          ...example,
          sizeInSelectedUnit: null,
          formattedSize: 'N/A'
        };
      }
    });
  };
  
  const realWorldExamples = getRealWorldExamples();

  // Find closest example to the entered value
  const findClosestExample = () => {
    if (!value || isNaN(parseFloat(value)) || !realWorldExamples.length) return null;
    
    const numericValue = parseFloat(value);
    const validExamples = realWorldExamples.filter(ex => ex.sizeInSelectedUnit !== null);
    
    if (validExamples.length === 0) return null;
    
    // Find closest example by absolute difference
    return validExamples.reduce((closest, current) => {
      const currentDiff = Math.abs((current.sizeInSelectedUnit as number) - numericValue);
      const closestDiff = Math.abs((closest.sizeInSelectedUnit as number) - numericValue);
      return currentDiff < closestDiff ? current : closest;
    });
  };

  const closestExample = findClosestExample();
  
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
      
      {/* Real-world examples section */}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Real-world Examples</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowRealWorldExamples(!showRealWorldExamples)}
            className="flex items-center gap-1"
          >
            {showRealWorldExamples ? 'Hide Examples' : 'Show Examples'}
            <ArrowDown className={`h-4 w-4 transition-transform ${showRealWorldExamples ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {showRealWorldExamples && (
          <div className="space-y-4">
            {/* Closest example highlight */}
            {closestExample && (
              <Card className="p-3 border-primary/50 bg-primary/5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-primary">{closestExample.name}</h4>
                    <p className="text-sm text-muted-foreground">{closestExample.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{closestExample.formattedSize} {getUnitAbbreviation(fromUnit)}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      ≈ {value} {getUnitAbbreviation(fromUnit)}
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Examples visualization */}
            <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
              <div className="mb-3 text-sm text-center text-muted-foreground">
                Sizes relative to your selected unit: {getUnitName(fromUnit)}
              </div>
              
              <div className="relative h-[300px] w-full">
                <ChartContainer 
                  className="h-full"
                  config={{
                    example: { color: "hsl(var(--primary))" },
                    selected: { color: "hsl(var(--destructive))" }
                  }}
                >
                  {realWorldExamples
                    .filter(ex => ex.sizeInSelectedUnit !== null)
                    .sort((a, b) => (a.sizeInSelectedUnit as number) - (b.sizeInSelectedUnit as number))
                    .slice(0, 10)
                    .map((example, index) => {
                      const isClosest = closestExample && closestExample.name === example.name;
                      const isInRange = example.sizeInSelectedUnit !== null && 
                                      ((example.sizeInSelectedUnit as number) >= parseFloat(value) * 0.1) && 
                                      ((example.sizeInSelectedUnit as number) <= parseFloat(value) * 10);
                      
                      return (
                        <div 
                          key={example.name}
                          className="absolute left-0 transition-all duration-300"
                          style={{
                            bottom: `${(index / (realWorldExamples.filter(ex => ex.sizeInSelectedUnit !== null).length - 1)) * 100}%`,
                            transform: `translateY(50%)`
                          }}
                        >
                          <div className={`flex items-center gap-2 ${isClosest ? 'font-medium text-primary' : ''}`}>
                            <div 
                              className={`h-3 w-3 rounded-full ${
                                isClosest ? 'bg-primary ring-2 ring-primary/30' : 
                                isInRange ? 'bg-primary/70' : 'bg-muted-foreground/40'
                              }`}
                            />
                            <div className="flex gap-1 items-baseline">
                              <span className="font-medium">{example.name}</span>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                ({example.formattedSize} {getUnitAbbreviation(fromUnit)})
                              </span>
                            </div>
                          </div>
                          <motion.div 
                            className={`h-1 bg-primary/30 mt-1 rounded-full ${isClosest ? 'bg-primary' : ''}`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: Math.min(Math.max(
                                Math.log10((example.sizeInSelectedUnit as number) + 1) * 50, 
                                20
                              ), 200) 
                            }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                          />
                        </div>
                      );
                    })}
                    
                    {/* Current value indicator */}
                    {value && !isNaN(parseFloat(value)) && (
                      <div 
                        className="absolute left-0 w-full border-t border-dashed border-destructive/50 transition-all duration-300"
                        style={{
                          bottom: `${calculatePositionPercentage(parseFloat(value), 
                            realWorldExamples
                              .filter(ex => ex.sizeInSelectedUnit !== null)
                              .map(ex => ex.sizeInSelectedUnit as number)
                          )}%`,
                        }}
                      >
                        <div className="absolute right-0 -top-3 bg-background px-1 text-xs text-destructive">
                          Your value: {value} {getUnitAbbreviation(fromUnit)}
                        </div>
                      </div>
                    )}
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                {realWorldExamples
                  .filter(ex => ex.sizeInSelectedUnit !== null)
                  .sort((a, b) => (a.sizeInSelectedUnit as number) - (b.sizeInSelectedUnit as number))
                  .slice(0, 6)
                  .map(example => {
                    const isClosest = closestExample && closestExample.name === example.name;
                    return (
                      <Card 
                        key={example.name}
                        className={`p-3 text-sm ${isClosest ? 'border-primary shadow-sm' : ''}`}
                      >
                        <div className="font-medium">{example.name}</div>
                        <div className="text-muted-foreground text-xs">{example.description}</div>
                        <div className="mt-1 font-mono">{example.formattedSize} {getUnitAbbreviation(fromUnit)}</div>
                      </Card>
                    );
                  })
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  // Helper function to calculate position percentage for the value marker
  function calculatePositionPercentage(value: number, allValues: number[]): number {
    if (allValues.length === 0) return 50;
    
    // Add our value to the array for calculation
    const values = [...allValues, value].sort((a, b) => a - b);
    const index = values.indexOf(value);
    
    // If the value is the smallest, position near bottom
    if (index === 0) return 5;
    // If the value is the largest, position near top
    if (index === values.length - 1) return 95;
    
    // Otherwise, calculate a position between adjacent examples
    return (index / (values.length - 1)) * 100;
  }
};

export default ConversionVisualizer;
