
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convert, formatValue } from '@/utils/conversionUtils';

interface ComparisonTableProps {
  value: number;
  fromUnit: string;
  units: Array<{id: string, name: string}>;
  precision: number;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ value, fromUnit, units, precision }) => {
  if (!value || isNaN(value)) {
    return null;
  }
  
  return (
    <div className="space-y-3 w-full">
      <h3 className="text-lg font-medium">Comparison Table</h3>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map(unit => {
              // Skip if it's the source unit
              if (unit.id === fromUnit) return null;
              
              const convertedValue = convert(value, fromUnit, unit.id);
              
              return (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.name}</TableCell>
                  <TableCell className="text-right">{formatValue(convertedValue, precision)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComparisonTable;
