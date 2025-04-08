
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { getConversionFormula } from '@/utils/conversionUtils';
import { Check, X, ChevronDown, ChevronUp, Copy } from 'lucide-react';
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
  
  return (
    <div className="space-y-3">
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Conversion Formula</h3>
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
                    <div className="text-xs font-medium mb-1">Step-by-step calculation:</div>
                    <div className="space-y-1 text-xs">
                      <div className="grid grid-cols-[1fr_auto] gap-2">
                        <div>Input value:</div>
                        <div className="font-mono">{fromValue}</div>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2">
                        <div>From unit:</div>
                        <div className="font-mono">{fromUnit}</div>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2">
                        <div>To unit:</div>
                        <div className="font-mono">{toUnit}</div>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2">
                        <div>Result:</div>
                        <div className="font-mono">{toValue}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
        
        {!expanded && (
          <Card className="p-2 bg-muted/30 mt-2">
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
