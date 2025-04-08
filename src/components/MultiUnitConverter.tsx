
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convert, formatValue, getUnitDimension } from '@/utils/conversionUtils';
import { allUnitsByDimension } from '@/utils/conversionUtils';
import { X, PlusCircle } from 'lucide-react';

interface TargetUnit {
  id: string;
  dimension: string;
}

const MultiUnitConverter: React.FC = () => {
  const [sourceValue, setSourceValue] = useState<string>('1');
  const [sourceUnit, setSourceUnit] = useState<string>('meter');
  const [sourceDimension, setSourceDimension] = useState<string>('length');
  const [targetUnits, setTargetUnits] = useState<TargetUnit[]>([
    { id: 'foot', dimension: 'length' },
    { id: 'inch', dimension: 'length' }
  ]);
  const [results, setResults] = useState<Record<string, number | null>>({});
  const [precision, setPrecision] = useState<number>(4);
  
  // Update source dimension when source unit changes
  useEffect(() => {
    const dimension = getUnitDimension(sourceUnit);
    setSourceDimension(dimension);
    
    // Filter out incompatible target units
    setTargetUnits(prev => 
      prev.filter(unit => getUnitDimension(unit.id) === dimension)
    );
    
    if (targetUnits.length === 0) {
      // Add a default target unit of the same dimension
      const defaultUnit = dimension === 'length' ? 'foot' : 
                          dimension === 'area' ? 'square-foot' : 'cubic-foot';
      setTargetUnits([{ id: defaultUnit, dimension }]);
    }
  }, [sourceUnit]);
  
  // Calculate conversions when inputs change
  useEffect(() => {
    if (sourceValue && !isNaN(parseFloat(sourceValue))) {
      const numericValue = parseFloat(sourceValue);
      const newResults: Record<string, number | null> = {};
      
      targetUnits.forEach(({ id }) => {
        try {
          newResults[id] = convert(numericValue, sourceUnit, id);
        } catch (error) {
          console.error(`Error converting to ${id}:`, error);
          newResults[id] = null;
        }
      });
      
      setResults(newResults);
    } else {
      const emptyResults: Record<string, null> = {};
      targetUnits.forEach(({ id }) => {
        emptyResults[id] = null;
      });
      setResults(emptyResults);
    }
  }, [sourceValue, sourceUnit, targetUnits, precision]);
  
  const handleAddTargetUnit = () => {
    // Find a unit from the same dimension that's not already in the list
    const dimension = getUnitDimension(sourceUnit);
    const availableUnits = allUnitsByDimension[dimension as keyof typeof allUnitsByDimension];
    
    const existingIds = new Set(targetUnits.map(u => u.id));
    const newUnit = availableUnits.find(u => !existingIds.has(u.id));
    
    if (newUnit) {
      setTargetUnits([...targetUnits, { id: newUnit.id, dimension }]);
    }
  };
  
  const handleRemoveTargetUnit = (index: number) => {
    if (targetUnits.length > 1) {
      setTargetUnits(targetUnits.filter((_, i) => i !== index));
    }
  };
  
  const handleChangeTargetUnit = (index: number, unitId: string) => {
    const newTargetUnits = [...targetUnits];
    newTargetUnits[index] = { 
      id: unitId, 
      dimension: getUnitDimension(unitId) 
    };
    setTargetUnits(newTargetUnits);
  };
  
  const getUnitOptions = (dimension: string) => {
    return allUnitsByDimension[dimension as keyof typeof allUnitsByDimension] || [];
  };
  
  const getUnitName = (unitId: string): string => {
    for (const dim in allUnitsByDimension) {
      const unit = allUnitsByDimension[dim as keyof typeof allUnitsByDimension]
        .find(u => u.id === unitId);
      if (unit) return unit.name;
    }
    return unitId;
  };
  
  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Multi-Unit Converter</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sourceValue">Value</Label>
            <Input
              id="sourceValue"
              type="text"
              value={sourceValue}
              onChange={(e) => setSourceValue(e.target.value)}
              className="text-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="sourceUnit">Unit</Label>
            <Select
              value={sourceUnit}
              onValueChange={setSourceUnit}
            >
              <SelectTrigger id="sourceUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {['length', 'area', 'volume'].flatMap(dim => 
                  getUnitOptions(dim).map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.abbreviation})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <Label>Convert To</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddTargetUnit}
              className="text-xs flex items-center gap-1"
            >
              <PlusCircle className="h-3 w-3" />
              Add Unit
            </Button>
          </div>
          
          <div className="space-y-3">
            {targetUnits.map((targetUnit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select
                  value={targetUnit.id}
                  onValueChange={(value) => handleChangeTargetUnit(index, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUnitOptions(sourceDimension).map(unit => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.name} ({unit.abbreviation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="border rounded px-3 py-2 flex-1 bg-muted/30">
                  {results[targetUnit.id] !== null
                    ? formatValue(results[targetUnit.id] || 0, precision)
                    : '—'}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTargetUnit(index)}
                  disabled={targetUnits.length <= 1}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MultiUnitConverter;
