
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
import { ArrowRight } from 'lucide-react';

const ConversionVisualizer: React.FC = () => {
  const [dimension, setDimension] = useState<'length' | 'area' | 'volume'>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [value, setValue] = useState<string>('1');
  const [scale, setScale] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  
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
      } catch (error) {
        console.error('Visualization error:', error);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, dimension]);
  
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
  
  const units = allUnitsByDimension[dimension];
  const groupedUnits = allGroupedUnitsByDimension[dimension];
  
  const getUnitName = (id: string): string => {
    const unit = units.find(u => u.id === id);
    return unit ? unit.name : id;
  };
  
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
              <span>1 {getUnitName(fromUnit)}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
              <span>{scale ? formatValue(scale, 6) : '?'} {getUnitName(toUnit)}</span>
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
        </div>
        
        <Card className="p-4 flex flex-col justify-center items-center overflow-hidden">
          <div className="text-center mb-4">
            <div className="font-semibold">Visual Comparison</div>
            <div className="text-sm text-muted-foreground">
              (not to actual scale)
            </div>
          </div>
          
          {result !== null && (
            <div className="w-full">
              <div className="mb-8">
                <div className="h-8 bg-primary/20 rounded-md w-full relative">
                  <div className="absolute -top-6 left-0 text-xs">
                    {value} {getUnitName(fromUnit)}
                  </div>
                </div>
              </div>
              
              <div>
                <div 
                  className="h-8 bg-primary rounded-md" 
                  style={{ 
                    width: `${Math.min(Math.max(scale * 100 / 2, 5), 100)}%` 
                  }}
                >
                  <div className="absolute -top-6 left-0 text-xs">
                    {result ? formatValue(result, 4) : '?'} {getUnitName(toUnit)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ConversionVisualizer;
