
import { ConversionResult, ConversionUnit, UnitGroup } from '../types';

// Base unit for length is meter (m)
export const lengthUnits: ConversionUnit[] = [
  // Metric
  {
    id: 'nanometer',
    name: 'Nanometer',
    abbreviation: 'nm',
    group: 'metric',
    toBase: (value) => value * 1e-9,
    fromBase: (value) => value / 1e-9
  },
  {
    id: 'micrometer',
    name: 'Micrometer',
    abbreviation: 'µm',
    group: 'metric',
    toBase: (value) => value * 1e-6,
    fromBase: (value) => value / 1e-6
  },
  {
    id: 'millimeter',
    name: 'Millimeter',
    abbreviation: 'mm',
    group: 'metric',
    toBase: (value) => value * 0.001,
    fromBase: (value) => value / 0.001
  },
  {
    id: 'centimeter',
    name: 'Centimeter',
    abbreviation: 'cm',
    group: 'metric',
    toBase: (value) => value * 0.01,
    fromBase: (value) => value / 0.01
  },
  {
    id: 'meter',
    name: 'Meter',
    abbreviation: 'm',
    group: 'metric',
    toBase: (value) => value,
    fromBase: (value) => value
  },
  {
    id: 'kilometer',
    name: 'Kilometer',
    abbreviation: 'km',
    group: 'metric',
    toBase: (value) => value * 1000,
    fromBase: (value) => value / 1000
  },
  
  // Imperial & US
  {
    id: 'inch',
    name: 'Inch',
    abbreviation: 'in',
    group: 'imperial',
    toBase: (value) => value * 0.0254,
    fromBase: (value) => value / 0.0254
  },
  {
    id: 'foot',
    name: 'Foot',
    abbreviation: 'ft',
    group: 'imperial',
    toBase: (value) => value * 0.3048,
    fromBase: (value) => value / 0.3048
  },
  {
    id: 'yard',
    name: 'Yard',
    abbreviation: 'yd',
    group: 'imperial',
    toBase: (value) => value * 0.9144,
    fromBase: (value) => value / 0.9144
  },
  {
    id: 'mile',
    name: 'Mile',
    abbreviation: 'mi',
    group: 'imperial',
    toBase: (value) => value * 1609.344,
    fromBase: (value) => value / 1609.344
  },
  {
    id: 'nautical-mile',
    name: 'Nautical Mile',
    abbreviation: 'nmi',
    group: 'maritime',
    toBase: (value) => value * 1852,
    fromBase: (value) => value / 1852
  },
  {
    id: 'fathom',
    name: 'Fathom',
    abbreviation: 'ftm',
    group: 'maritime',
    toBase: (value) => value * 1.8288,
    fromBase: (value) => value / 1.8288
  },
  
  // Ancient
  {
    id: 'cubit',
    name: 'Cubit',
    abbreviation: 'cubit',
    group: 'ancient',
    toBase: (value) => value * 0.45,
    fromBase: (value) => value / 0.45
  },
  {
    id: 'league',
    name: 'League',
    abbreviation: 'lea',
    group: 'ancient',
    toBase: (value) => value * 4828.032,
    fromBase: (value) => value / 4828.032
  },
  
  // Astronomical
  {
    id: 'astronomical-unit',
    name: 'Astronomical Unit',
    abbreviation: 'AU',
    group: 'astronomical',
    toBase: (value) => value * 1.496e+11,
    fromBase: (value) => value / 1.496e+11
  },
  {
    id: 'light-year',
    name: 'Light Year',
    abbreviation: 'ly',
    group: 'astronomical',
    toBase: (value) => value * 9.461e+15,
    fromBase: (value) => value / 9.461e+15
  },
  {
    id: 'parsec',
    name: 'Parsec',
    abbreviation: 'pc',
    group: 'astronomical',
    toBase: (value) => value * 3.086e+16,
    fromBase: (value) => value / 3.086e+16
  },
];

// Group units by category
export const groupedLengthUnits = lengthUnits.reduce<Record<UnitGroup, ConversionUnit[]>>(
  (groups, unit) => {
    if (!groups[unit.group]) {
      groups[unit.group] = [];
    }
    groups[unit.group].push(unit);
    return groups;
  },
  { metric: [], imperial: [], us: [], ancient: [], astronomical: [], maritime: [], other: [] }
);

// Convert between any two units
export const convert = (
  value: number,
  fromUnitId: string,
  toUnitId: string
): number => {
  // Find the units
  const fromUnit = lengthUnits.find(unit => unit.id === fromUnitId);
  const toUnit = lengthUnits.find(unit => unit.id === toUnitId);
  
  if (!fromUnit || !toUnit) {
    throw new Error('Invalid units specified');
  }
  
  // Convert to base unit (meter) then to target unit
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
};

// Format the output value to a reasonable number of decimal places
export const formatValue = (value: number): string => {
  if (Math.abs(value) >= 1e6) {
    return value.toExponential(6);
  }
  
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(6);
  }
  
  // Maximum 10 significant digits, but trim trailing zeros
  return parseFloat(value.toPrecision(10)).toString();
};

// Generate a unique ID for the conversion history
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Smart unit detection based on input value
export const suggestUnit = (value: number): string => {
  const absValue = Math.abs(value);
  
  if (absValue === 0) return 'meter'; // Default for zero
  
  if (absValue >= 1e15) return 'light-year';
  if (absValue >= 1e10) return 'astronomical-unit';
  if (absValue >= 1000) return 'kilometer';
  if (absValue >= 1) return 'meter';
  if (absValue >= 0.01) return 'centimeter';
  if (absValue >= 0.001) return 'millimeter';
  if (absValue >= 1e-6) return 'micrometer';
  return 'nanometer';
};
