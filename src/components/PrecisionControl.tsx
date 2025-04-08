
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PrecisionControlProps {
  precision: number;
  onChange: (value: number) => void;
}

const PrecisionControl: React.FC<PrecisionControlProps> = ({ precision, onChange }) => {
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <Label htmlFor="precision">Precision: {precision} {precision === 1 ? 'decimal place' : 'decimal places'}</Label>
      </div>
      <Slider
        id="precision"
        min={0}
        max={10}
        step={1}
        value={[precision]}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
    </div>
  );
};

export default PrecisionControl;
