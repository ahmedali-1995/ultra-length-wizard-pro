
import React from 'react';
import { Card } from "@/components/ui/card";
import { getConversionFormula } from '@/utils/conversionUtils';
import { Check, X } from 'lucide-react';

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
  const formula = getConversionFormula(fromUnit, toUnit);
  const areCompatible = formula !== 'Unknown conversion';
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Conversion Formula</h3>
        {areCompatible ? (
          <div className="flex items-center text-green-500 text-xs">
            <Check className="h-3 w-3 mr-1" /> Compatible
          </div>
        ) : (
          <div className="flex items-center text-red-500 text-xs">
            <X className="h-3 w-3 mr-1" /> Incompatible
          </div>
        )}
      </div>
      
      <Card className="p-3 bg-muted/50">
        <div className="text-sm font-mono">
          {formula}
        </div>
        
        <div className="mt-2 pt-2 border-t text-xs">
          <div className="flex justify-between">
            <span>Input: {fromValue}</span>
            <span>{fromUnit}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Output: {toValue}</span>
            <span>{toUnit}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormulaView;
