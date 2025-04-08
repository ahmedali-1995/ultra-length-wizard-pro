
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";
import { convert, formatValue } from '@/utils/conversionUtils';

interface QuickPair {
  id: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  value: number;
}

const quickPairs: QuickPair[] = [
  { id: 'meter-foot', fromUnit: 'meter', toUnit: 'foot', fromName: 'Meters', toName: 'Feet', value: 1 },
  { id: 'km-mile', fromUnit: 'kilometer', toUnit: 'mile', fromName: 'Kilometers', toName: 'Miles', value: 1 },
  { id: 'inch-cm', fromUnit: 'inch', toUnit: 'centimeter', fromName: 'Inches', toName: 'Centimeters', value: 1 },
  { id: 'yard-meter', fromUnit: 'yard', toUnit: 'meter', fromName: 'Yards', toName: 'Meters', value: 1 },
  { id: 'mm-inch', fromUnit: 'millimeter', toUnit: 'inch', fromName: 'Millimeters', toName: 'Inches', value: 10 },
  { id: 'foot-cm', fromUnit: 'foot', toUnit: 'centimeter', fromName: 'Feet', toName: 'Centimeters', value: 1 },
];

interface QuickConvertProps {
  onSelect: (fromUnit: string, toUnit: string) => void;
  precision: number;
}

const QuickConvert: React.FC<QuickConvertProps> = ({ onSelect, precision }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Quick Convert</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickPairs.map((pair) => {
          const result = convert(pair.value, pair.fromUnit, pair.toUnit);
          const formattedResult = formatValue(result, precision);
          
          return (
            <Card key={pair.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(pair.fromUnit, pair.toUnit)}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{pair.value} {pair.fromName}</p>
                  <p className="text-xs text-muted-foreground">{pair.fromUnit}</p>
                </div>
                <ArrowRightLeft className="h-4 w-4 mx-2 text-muted-foreground" />
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium">{formattedResult} {pair.toName}</p>
                  <p className="text-xs text-muted-foreground">{pair.toUnit}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuickConvert;
