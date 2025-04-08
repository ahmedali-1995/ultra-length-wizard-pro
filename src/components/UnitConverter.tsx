
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversionInput, ConversionResult } from '@/types';
import { ArrowRightLeft, Copy, RotateCw, Clipboard, Info, Settings, Calculator } from 'lucide-react';
import { allUnitsByDimension, allGroupedUnitsByDimension, convert, formatValue, generateId, areUnitsCompatible } from '@/utils/conversionUtils';
import { toast } from 'sonner';
import ConversionHistory from './ConversionHistory';
import ThemeToggle from './ThemeToggle';
import PrecisionControl from './PrecisionControl';
import QuickConvert from './QuickConvert';
import ComparisonTable from './ComparisonTable';
import FavoriteConversions from './FavoriteConversions';
import DimensionSelector from './DimensionSelector';
import FormulaView from './FormulaView';
import MultiUnitConverter from './MultiUnitConverter';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const UnitConverter: React.FC = () => {
  // Main state
  const [input, setInput] = useState<ConversionInput>({
    value: '1',
    fromUnit: 'meter',
    toUnit: 'foot'
  });
  
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<ConversionResult[]>([]);
  const [precision, setPrecision] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<string>('converter');
  const [comparisonUnits, setComparisonUnits] = useState<Array<{id: string, name: string}>>([]);
  const [showScientificNotation, setShowScientificNotation] = useState<boolean>(false);
  const [dimension, setDimension] = useState<'length' | 'area' | 'volume'>('length');
  const [showFormula, setShowFormula] = useState<boolean>(false);
  
  // Update the result when any input changes
  useEffect(() => {
    if (input.value && !isNaN(parseFloat(input.value))) {
      try {
        if (!areUnitsCompatible(input.fromUnit, input.toUnit)) {
          setResult('Incompatible units');
          return;
        }
        
        const numericValue = parseFloat(input.value);
        const convertedValue = convert(numericValue, input.fromUnit, input.toUnit);
        
        if (showScientificNotation) {
          setResult(convertedValue.toExponential(precision));
        } else {
          setResult(formatValue(convertedValue, precision));
        }
      } catch (error) {
        setResult('Error');
        console.error('Conversion error:', error);
      }
    } else {
      setResult('');
    }
  }, [input, precision, showScientificNotation]);
  
  // Initialize comparison units
  useEffect(() => {
    // Get popular units based on selected dimension
    let popularUnits;
    
    switch(dimension) {
      case 'area':
        popularUnits = [
          { id: 'square-meter', name: 'Square Meters' },
          { id: 'square-foot', name: 'Square Feet' },
          { id: 'square-inch', name: 'Square Inches' },
          { id: 'hectare', name: 'Hectares' },
          { id: 'acre', name: 'Acres' },
          { id: 'square-kilometer', name: 'Square Kilometers' }
        ];
        break;
      case 'volume':
        popularUnits = [
          { id: 'cubic-meter', name: 'Cubic Meters' },
          { id: 'cubic-foot', name: 'Cubic Feet' },
          { id: 'liter', name: 'Liters' },
          { id: 'us-gallon', name: 'US Gallons' },
          { id: 'cubic-inch', name: 'Cubic Inches' },
          { id: 'barrel', name: 'Barrels' }
        ];
        break;
      default: // length
        popularUnits = [
          { id: 'meter', name: 'Meters' },
          { id: 'foot', name: 'Feet' },
          { id: 'inch', name: 'Inches' },
          { id: 'centimeter', name: 'Centimeters' },
          { id: 'kilometer', name: 'Kilometers' },
          { id: 'mile', name: 'Miles' }
        ];
    }
    
    setComparisonUnits(popularUnits);
  }, [dimension]);
  
  // Update default units when dimension changes
  useEffect(() => {
    const defaultUnits = {
      length: { from: 'meter', to: 'foot' },
      area: { from: 'square-meter', to: 'square-foot' },
      volume: { from: 'cubic-meter', to: 'liter' }
    };
    
    setInput(prev => ({
      ...prev,
      fromUnit: defaultUnits[dimension].from,
      toUnit: defaultUnits[dimension].to
    }));
  }, [dimension]);
  
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
    
    // Load user preferences
    const savedPrecision = localStorage.getItem('conversionPrecision');
    if (savedPrecision) {
      setPrecision(parseInt(savedPrecision, 10));
    }
    
    const savedScientific = localStorage.getItem('showScientificNotation');
    if (savedScientific) {
      setShowScientificNotation(savedScientific === 'true');
    }
  }, []);
  
  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);
  
  // Save user preferences
  useEffect(() => {
    localStorage.setItem('conversionPrecision', precision.toString());
    localStorage.setItem('showScientificNotation', showScientificNotation.toString());
  }, [precision, showScientificNotation]);
  
  // Get the name of a unit by its ID
  const getUnitName = (unitId: string): string => {
    for (const dim in allUnitsByDimension) {
      const unit = allUnitsByDimension[dim as keyof typeof allUnitsByDimension]
        .find(u => u.id === unitId);
      if (unit) return unit.name;
    }
    return unitId;
  };
  
  // Handle the conversion and add to history
  const handleConvert = useCallback(() => {
    if (input.value && !isNaN(parseFloat(input.value))) {
      try {
        if (!areUnitsCompatible(input.fromUnit, input.toUnit)) {
          toast.error("Units are not compatible", {
            description: "Cannot convert between different dimensions"
          });
          return;
        }
        
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
    if (result && result !== 'Error' && result !== 'Incompatible units') {
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
  
  // Get units for the current dimension
  const units = allUnitsByDimension[dimension];
  const groupedUnits = allGroupedUnitsByDimension[dimension];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="converter-card animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-primary">Unit Converter</h2>
            <DimensionSelector 
              selectedDimension={dimension}
              onChange={setDimension}
            />
          </div>
          <ThemeToggle />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="converter">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="multi">Multi-Convert</TabsTrigger>
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
              
              {/* Settings Row */}
              <div className="flex flex-wrap justify-between gap-4">
                {/* Precision Control */}
                <div className="flex-1 min-w-[200px]">
                  <PrecisionControl 
                    precision={precision} 
                    onChange={setPrecision} 
                  />
                </div>
                
                {/* Scientific Notation Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="scientific-notation"
                    checked={showScientificNotation}
                    onCheckedChange={setShowScientificNotation}
                  />
                  <Label htmlFor="scientific-notation" className="cursor-pointer">
                    Scientific Notation
                  </Label>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Scientific Notation</h4>
                        <p className="text-xs text-muted-foreground">
                          Displays numbers in the form of a × 10^b, useful for very large or small values.
                          Example: 1.23 × 10^6 (1,230,000)
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              
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
                      {Object.entries(groupedUnits).map(([group, units]) => (
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
                      {Object.entries(groupedUnits).map(([group, units]) => (
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
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowFormula(!showFormula)}
                      className="h-8 w-8"
                      title="Show formula"
                    >
                      <Calculator className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyResult}
                      disabled={!result || result === 'Error' || result === 'Incompatible units'}
                      className="h-8 w-8"
                      title="Copy result"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="More information"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="max-w-lg mx-auto p-4">
                          <DrawerHeader>
                            <DrawerTitle>Unit Information</DrawerTitle>
                            <DrawerDescription>
                              Details about the selected units and their conversion.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="py-4">
                            <div className="grid gap-4">
                              <div className="border rounded-lg p-3">
                                <h4 className="font-semibold mb-2">{getUnitName(input.fromUnit)}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Dimension: {dimension.charAt(0).toUpperCase() + dimension.slice(1)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Symbol: {units.find(u => u.id === input.fromUnit)?.abbreviation || '-'}
                                </p>
                              </div>
                              <div className="border rounded-lg p-3">
                                <h4 className="font-semibold mb-2">{getUnitName(input.toUnit)}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Dimension: {dimension.charAt(0).toUpperCase() + dimension.slice(1)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Symbol: {units.find(u => u.id === input.toUnit)?.abbreviation || '-'}
                                </p>
                              </div>
                            </div>
                            {showFormula && result && result !== 'Error' && result !== 'Incompatible units' && (
                              <div className="mt-4">
                                <FormulaView 
                                  fromUnit={input.fromUnit} 
                                  toUnit={input.toUnit}
                                  fromValue={parseFloat(input.value)}
                                  toValue={parseFloat(result)}
                                />
                              </div>
                            )}
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                  <div className="text-lg font-medium overflow-x-auto whitespace-nowrap">
                    {result ? result : '—'} {result && result !== 'Error' && result !== 'Incompatible units' ? getUnitName(input.toUnit) : ''}
                  </div>
                </div>
                
                {/* Formula View */}
                {showFormula && result && result !== 'Error' && result !== 'Incompatible units' && (
                  <FormulaView 
                    fromUnit={input.fromUnit} 
                    toUnit={input.toUnit}
                    fromValue={parseFloat(input.value)}
                    toValue={parseFloat(result)}
                  />
                )}
              </div>
              
              {/* Convert Button */}
              <Button 
                className="w-full converter-button"
                onClick={handleConvert}
                disabled={!input.value || isNaN(parseFloat(input.value)) || !areUnitsCompatible(input.fromUnit, input.toUnit)}
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
          
          <TabsContent value="multi" className="py-4">
            <MultiUnitConverter />
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
