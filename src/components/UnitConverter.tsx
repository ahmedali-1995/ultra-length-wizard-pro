
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversionInput, ConversionResult } from '@/types';
import { ArrowRightLeft, Copy, RotateCw, Clipboard } from 'lucide-react';
import { lengthUnits, groupedLengthUnits, convert, formatValue, generateId } from '@/utils/conversionUtils';
import { toast } from 'sonner';
import ConversionHistory from './ConversionHistory';
import { updateSEO } from '@/utils/seoUtils';
import ThemeToggle from './ThemeToggle';
import PrecisionControl from './PrecisionControl';
import QuickConvert from './QuickConvert';
import ComparisonTable from './ComparisonTable';
import FavoriteConversions from './FavoriteConversions';

const UnitConverter: React.FC = () => {
  const [input, setInput] = useState<ConversionInput>({
    value: '1',
    fromUnit: 'meter',
    toUnit: 'foot'
  });
  
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<ConversionResult[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('metric');
  const [precision, setPrecision] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<string>('converter');
  const [comparisonUnits, setComparisonUnits] = useState<Array<{id: string, name: string}>>([]);
  
  // Update the result when any input changes
  useEffect(() => {
    if (input.value && !isNaN(parseFloat(input.value))) {
      try {
        const numericValue = parseFloat(input.value);
        const convertedValue = convert(numericValue, input.fromUnit, input.toUnit);
        setResult(formatValue(convertedValue, precision));
        
        // Update SEO
        const fromUnit = lengthUnits.find(unit => unit.id === input.fromUnit);
        const toUnit = lengthUnits.find(unit => unit.id === input.toUnit);
        if (fromUnit && toUnit) {
          updateSEO(fromUnit.name, toUnit.name);
        }
      } catch (error) {
        setResult('Error');
        console.error('Conversion error:', error);
      }
    } else {
      setResult('');
    }
  }, [input, precision]);
  
  // Initialize comparison units
  useEffect(() => {
    // Get 5 popular units for comparison
    const popularUnits = [
      { id: 'meter', name: 'Meters' },
      { id: 'foot', name: 'Feet' },
      { id: 'inch', name: 'Inches' },
      { id: 'centimeter', name: 'Centimeters' },
      { id: 'kilometer', name: 'Kilometers' },
      { id: 'mile', name: 'Miles' }
    ];
    
    setComparisonUnits(popularUnits);
  }, []);
  
  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse saved history:', e);
      }
    }
  }, []);
  
  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);
  
  // Get the name of a unit by its ID
  const getUnitName = (unitId: string): string => {
    const unit = lengthUnits.find(u => u.id === unitId);
    return unit ? unit.name : unitId;
  };
  
  // Handle the conversion and add to history
  const handleConvert = useCallback(() => {
    if (input.value && !isNaN(parseFloat(input.value))) {
      try {
        const numericValue = parseFloat(input.value);
        const convertedValue = convert(numericValue, input.fromUnit, input.toUnit);
        
        // Add to history
        const newHistoryItem: ConversionResult = {
          id: generateId(),
          timestamp: Date.now(),
          fromValue: numericValue,
          fromUnit: getUnitName(input.fromUnit),
          toUnit: getUnitName(input.toUnit),
          toValue: convertedValue
        };
        
        setHistory(prev => [newHistoryItem, ...prev].slice(0, 20)); // Keep only last 20 conversions
        toast.success("Conversion completed", {
          description: `${formatValue(numericValue, precision)} ${getUnitName(input.fromUnit)} = ${formatValue(convertedValue, precision)} ${getUnitName(input.toUnit)}`
        });
      } catch (error) {
        toast.error("Conversion failed", {
          description: "An error occurred during the conversion."
        });
      }
    }
  }, [input, precision]);
  
  // Swap the from and to units
  const handleSwapUnits = useCallback(() => {
    setInput(prev => ({
      ...prev,
      fromUnit: prev.toUnit,
      toUnit: prev.fromUnit
    }));
  }, []);
  
  // Copy the result to clipboard
  const handleCopyResult = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(`${input.value} ${getUnitName(input.fromUnit)} = ${result} ${getUnitName(input.toUnit)}`);
      toast.success("Copied to clipboard");
    }
  }, [result, input]);
  
  // Copy a specific history item to clipboard
  const handleCopyHistoryItem = useCallback((item: ConversionResult) => {
    navigator.clipboard.writeText(`${formatValue(item.fromValue, precision)} ${item.fromUnit} = ${formatValue(item.toValue, precision)} ${item.toUnit}`);
    toast.success("Copied to clipboard");
  }, [precision]);
  
  // Clear all history
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('conversionHistory');
    toast.success("History cleared");
  }, []);
  
  // Remove a specific history item
  const handleRemoveHistoryItem = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);
  
  // Handle quick conversion selection
  const handleQuickConvert = useCallback((fromUnit: string, toUnit: string) => {
    setInput(prev => ({
      ...prev,
      fromUnit,
      toUnit
    }));
    
    // Switch to converter tab
    setActiveTab('converter');
  }, []);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="converter-card animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Length Converter</h2>
          <ThemeToggle />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="converter" className="py-4">
            <div className="grid gap-6">
              {/* Favorites */}
              <FavoriteConversions 
                onSelect={(fromUnit, toUnit) => {
                  setInput(prev => ({ ...prev, fromUnit, toUnit }));
                }}
                currentFromUnit={input.fromUnit}
                currentToUnit={input.toUnit}
                precision={precision}
                value={input.value}
              />
              
              {/* Input Value */}
              <div className="space-y-2">
                <Label htmlFor="value">Enter Value</Label>
                <Input
                  id="value"
                  type="text"
                  placeholder="Enter a number"
                  value={input.value}
                  onChange={(e) => setInput(prev => ({ ...prev, value: e.target.value }))}
                  className="converter-input text-lg"
                />
              </div>
              
              {/* Precision Control */}
              <PrecisionControl 
                precision={precision} 
                onChange={setPrecision} 
              />
              
              {/* Unit Selection */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor="fromUnit">From</Label>
                  <Select
                    value={input.fromUnit}
                    onValueChange={(value) => setInput(prev => ({ ...prev, fromUnit: value }))}
                  >
                    <SelectTrigger className="converter-select">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(groupedLengthUnits).map(([group, units]) => (
                        units.length > 0 && (
                          <SelectGroup key={group}>
                            <SelectLabel className="capitalize">{group}</SelectLabel>
                            {units.map(unit => (
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
                
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwapUnits}
                    className="rounded-full h-10 w-10 hover:bg-muted transition-all"
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="toUnit">To</Label>
                  <Select 
                    value={input.toUnit}
                    onValueChange={(value) => setInput(prev => ({ ...prev, toUnit: value }))}
                  >
                    <SelectTrigger className="converter-select">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(groupedLengthUnits).map(([group, units]) => (
                        units.length > 0 && (
                          <SelectGroup key={group}>
                            <SelectLabel className="capitalize">{group}</SelectLabel>
                            {units.map(unit => (
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
              
              {/* Result */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Result</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyResult}
                    disabled={!result}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                  <div className="text-lg font-medium overflow-x-auto whitespace-nowrap">
                    {result ? result : '—'} {result ? getUnitName(input.toUnit) : ''}
                  </div>
                </div>
              </div>
              
              {/* Convert Button */}
              <Button 
                className="w-full converter-button"
                onClick={handleConvert}
                disabled={!input.value || isNaN(parseFloat(input.value))}
              >
                Convert
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="py-4">
            <div className="space-y-6">
              {/* Quick Convert Section */}
              <QuickConvert 
                onSelect={handleQuickConvert} 
                precision={precision}
              />
              
              {/* Comparison Table */}
              <ComparisonTable 
                value={parseFloat(input.value)} 
                fromUnit={input.fromUnit} 
                units={comparisonUnits}
                precision={precision}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="py-2">
              <ConversionHistory 
                history={history}
                onClear={handleClearHistory}
                onCopy={handleCopyHistoryItem}
                onRemoveItem={handleRemoveHistoryItem}
              />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default UnitConverter;
