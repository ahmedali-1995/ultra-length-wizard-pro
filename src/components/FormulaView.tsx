
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { getConversionFormula } from '@/utils/conversionUtils';
import { Check, X, ChevronDown, ChevronUp, Copy, Calculator, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface FormulaViewProps {
  fromUnit: string;
  toUnit: string;
  fromValue: number;
  toValue: number;
}

const FormulaView: React.FC<FormulaViewProps> = ({ 
  fromUnit, 
  toUnit,
  fromValue,
  toValue
}) => {
  const [expanded, setExpanded] = useState(false);
  const formula = getConversionFormula(fromUnit, toUnit);
  const areCompatible = formula !== 'Unknown conversion';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
    toast.success("Formula copied to clipboard");
  };

  // Calculate the steps of the conversion
  const getConversionSteps = (): { description: string; value: number | string }[] => {
    if (!areCompatible) return [];

    // Example of steps for common conversions
    if (fromUnit === 'meter' && toUnit === 'foot') {
      return [
        { description: "Starting value", value: fromValue },
        { description: "Multiply by 3.28084", value: fromValue * 3.28084 },
        { description: "Final result", value: toValue }
      ];
    }
    
    if (fromUnit === 'meter' && toUnit === 'inch') {
      return [
        { description: "Starting value", value: fromValue },
        { description: "Multiply by 39.3701", value: fromValue * 39.3701 },
        { description: "Final result", value: toValue }
      ];
    }
    
    if (fromUnit === 'kilogram' && toUnit === 'pound') {
      return [
        { description: "Starting value", value: fromValue },
        { description: "Multiply by 2.20462", value: fromValue * 2.20462 },
        { description: "Final result", value: toValue }
      ];
    }
    
    // Generic steps for other conversions
    return [
      { description: "Starting value", value: fromValue },
      { description: "Apply conversion formula", value: formula },
      { description: "Final result", value: toValue }
    ];
  };
  
  const conversionSteps = getConversionSteps();
  
  return (
    <div className="space-y-3">
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Conversion Formula</h3>
          </div>
          <div className="flex items-center gap-2">
            {areCompatible ? (
              <div className="flex items-center text-green-500 text-xs">
                <Check className="h-3 w-3 mr-1" /> Compatible
              </div>
            ) : (
              <div className="flex items-center text-red-500 text-xs">
                <X className="h-3 w-3 mr-1" /> Incompatible
              </div>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                {expanded ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-3 bg-muted/50 mt-2">
                  <div className="flex items-start justify-between">
                    <div className="text-sm font-mono">
                      {formula}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-7 w-7 ml-2" 
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-2 border-t">
                    <div className="text-xs font-medium mb-2 flex items-center justify-between">
                      <span>Step-by-step calculation:</span>
                      <span className="text-primary text-xs font-mono">{fromValue} → {toValue}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {conversionSteps.map((step, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-2 rounded-md ${
                            index === 0 ? 'bg-muted/70' : 
                            index === conversionSteps.length - 1 ? 'bg-primary/10' : 
                            'bg-muted/30'
                          }`}
                        >
                          <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                            <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[10px] font-medium">
                              {index + 1}
                            </div>
                            <div>{step.description}</div>
                            <div className="font-mono font-medium">
                              {typeof step.value === 'number' ? step.value.toFixed(4) : step.value}
                            </div>
                          </div>
                          {index < conversionSteps.length - 1 && (
                            <div className="flex justify-center my-1">
                              <ArrowDown className="h-3 w-3 text-muted-foreground/50" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
        
        {!expanded && (
          <Card className="p-2 bg-muted/30 mt-2 hover:bg-muted/40 transition-colors cursor-pointer" onClick={() => setExpanded(true)}>
            <div className="flex justify-between items-center text-xs">
              <span>Input: {fromValue} {fromUnit}</span>
              <span>→</span>
              <span>Output: {toValue} {toUnit}</span>
            </div>
          </Card>
        )}
      </Collapsible>
    </div>
  );
};

export default FormulaView;
