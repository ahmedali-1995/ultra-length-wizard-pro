
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

// Area units (base unit: square meter, m²)
export const areaUnits: ConversionUnit[] = [
  // Metric
  {
    id: 'square-millimeter',
    name: 'Square Millimeter',
    abbreviation: 'mm²',
    group: 'metric',
    toBase: (value) => value * 1e-6,
    fromBase: (value) => value / 1e-6
  },
  {
    id: 'square-centimeter',
    name: 'Square Centimeter',
    abbreviation: 'cm²',
    group: 'metric',
    toBase: (value) => value * 1e-4,
    fromBase: (value) => value / 1e-4
  },
  {
    id: 'square-meter',
    name: 'Square Meter',
    abbreviation: 'm²',
    group: 'metric',
    toBase: (value) => value,
    fromBase: (value) => value
  },
  {
    id: 'hectare',
    name: 'Hectare',
    abbreviation: 'ha',
    group: 'metric',
    toBase: (value) => value * 10000,
    fromBase: (value) => value / 10000
  },
  {
    id: 'square-kilometer',
    name: 'Square Kilometer',
    abbreviation: 'km²',
    group: 'metric',
    toBase: (value) => value * 1e6,
    fromBase: (value) => value / 1e6
  },
  
  // Imperial
  {
    id: 'square-inch',
    name: 'Square Inch',
    abbreviation: 'in²',
    group: 'imperial',
    toBase: (value) => value * 0.00064516,
    fromBase: (value) => value / 0.00064516
  },
  {
    id: 'square-foot',
    name: 'Square Foot',
    abbreviation: 'ft²',
    group: 'imperial',
    toBase: (value) => value * 0.092903,
    fromBase: (value) => value / 0.092903
  },
  {
    id: 'square-yard',
    name: 'Square Yard',
    abbreviation: 'yd²',
    group: 'imperial',
    toBase: (value) => value * 0.836127,
    fromBase: (value) => value / 0.836127
  },
  {
    id: 'acre',
    name: 'Acre',
    abbreviation: 'ac',
    group: 'imperial',
    toBase: (value) => value * 4046.86,
    fromBase: (value) => value / 4046.86
  },
  {
    id: 'square-mile',
    name: 'Square Mile',
    abbreviation: 'mi²',
    group: 'imperial',
    toBase: (value) => value * 2589988.11,
    fromBase: (value) => value / 2589988.11
  }
];

// Volume units (base unit: cubic meter, m³)
export const volumeUnits: ConversionUnit[] = [
  // Metric
  {
    id: 'cubic-millimeter',
    name: 'Cubic Millimeter',
    abbreviation: 'mm³',
    group: 'metric',
    toBase: (value) => value * 1e-9,
    fromBase: (value) => value / 1e-9
  },
  {
    id: 'cubic-centimeter',
    name: 'Cubic Centimeter',
    abbreviation: 'cm³',
    group: 'metric',
    toBase: (value) => value * 1e-6,
    fromBase: (value) => value / 1e-6
  },
  {
    id: 'milliliter',
    name: 'Milliliter',
    abbreviation: 'mL',
    group: 'metric',
    toBase: (value) => value * 1e-6,
    fromBase: (value) => value / 1e-6
  },
  {
    id: 'liter',
    name: 'Liter',
    abbreviation: 'L',
    group: 'metric',
    toBase: (value) => value * 0.001,
    fromBase: (value) => value / 0.001
  },
  {
    id: 'cubic-meter',
    name: 'Cubic Meter',
    abbreviation: 'm³',
    group: 'metric',
    toBase: (value) => value,
    fromBase: (value) => value
  },
  
  // Imperial & US
  {
    id: 'cubic-inch',
    name: 'Cubic Inch',
    abbreviation: 'in³',
    group: 'imperial',
    toBase: (value) => value * 1.6387e-5,
    fromBase: (value) => value / 1.6387e-5
  },
  {
    id: 'cubic-foot',
    name: 'Cubic Foot',
    abbreviation: 'ft³',
    group: 'imperial',
    toBase: (value) => value * 0.0283168,
    fromBase: (value) => value / 0.0283168
  },
  {
    id: 'us-gallon',
    name: 'US Gallon',
    abbreviation: 'gal',
    group: 'us',
    toBase: (value) => value * 0.00378541,
    fromBase: (value) => value / 0.00378541
  },
  {
    id: 'imperial-gallon',
    name: 'Imperial Gallon',
    abbreviation: 'imp gal',
    group: 'imperial',
    toBase: (value) => value * 0.00454609,
    fromBase: (value) => value / 0.00454609
  },
  {
    id: 'barrel',
    name: 'Oil Barrel',
    abbreviation: 'bbl',
    group: 'us',
    toBase: (value) => value * 0.158987,
    fromBase: (value) => value / 0.158987
  }
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

// Group area units by category
export const groupedAreaUnits = areaUnits.reduce<Record<UnitGroup, ConversionUnit[]>>(
  (groups, unit) => {
    if (!groups[unit.group]) {
      groups[unit.group] = [];
    }
    groups[unit.group].push(unit);
    return groups;
  },
  { metric: [], imperial: [], us: [], ancient: [], astronomical: [], maritime: [], other: [] }
);

// Group volume units by category
export const groupedVolumeUnits = volumeUnits.reduce<Record<UnitGroup, ConversionUnit[]>>(
  (groups, unit) => {
    if (!groups[unit.group]) {
      groups[unit.group] = [];
    }
    groups[unit.group].push(unit);
    return groups;
  },
  { metric: [], imperial: [], us: [], ancient: [], astronomical: [], maritime: [], other: [] }
);

// All units mapped by dimension
export const allUnitsByDimension = {
  length: lengthUnits,
  area: areaUnits,
  volume: volumeUnits
};

// All grouped units mapped by dimension
export const allGroupedUnitsByDimension = {
  length: groupedLengthUnits,
  area: groupedAreaUnits,
  volume: groupedVolumeUnits
};

// Convert between any two units within the same dimension
export const convert = (
  value: number,
  fromUnitId: string,
  toUnitId: string
): number => {
  // Find the units
  let fromUnit, toUnit;
  
  // Search in all unit types (length, area, volume)
  for (const dimension of Object.keys(allUnitsByDimension) as Array<keyof typeof allUnitsByDimension>) {
    const fromUnitCandidate = allUnitsByDimension[dimension].find(unit => unit.id === fromUnitId);
    const toUnitCandidate = allUnitsByDimension[dimension].find(unit => unit.id === toUnitId);
    
    if (fromUnitCandidate && toUnitCandidate) {
      fromUnit = fromUnitCandidate;
      toUnit = toUnitCandidate;
      break;
    }
  }
  
  if (!fromUnit || !toUnit) {
    throw new Error('Invalid units specified or units from different dimensions');
  }
  
  // Convert to base unit then to target unit
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
};

// Format the output value to a specified number of decimal places
export const formatValue = (value: number, precision: number = 4): string => {
  if (Math.abs(value) >= 1e6) {
    return value.toExponential(precision);
  }
  
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(precision);
  }
  
  // Use the provided precision, defaulting to 4 if not specified
  return value.toFixed(precision);
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

// Get the conversion formula between two units
export const getConversionFormula = (
  fromUnitId: string,
  toUnitId: string
): string => {
  // Find the units
  let fromUnit, toUnit, dimension;
  
  // Search in all unit types
  for (const dim of Object.keys(allUnitsByDimension) as Array<keyof typeof allUnitsByDimension>) {
    const fromUnitCandidate = allUnitsByDimension[dim].find(unit => unit.id === fromUnitId);
    const toUnitCandidate = allUnitsByDimension[dim].find(unit => unit.id === toUnitId);
    
    if (fromUnitCandidate && toUnitCandidate) {
      fromUnit = fromUnitCandidate;
      toUnit = toUnitCandidate;
      dimension = dim;
      break;
    }
  }
  
  if (!fromUnit || !toUnit || !dimension) {
    return 'Unknown conversion';
  }
  
  // Get formula based on dimension
  switch (dimension) {
    case 'length':
      if (fromUnitId === 'meter' && toUnitId !== 'meter') {
        return `Divide by ${toUnit.toBase(1)}`;
      } else if (fromUnitId !== 'meter' && toUnitId === 'meter') {
        return `Multiply by ${fromUnit.toBase(1)}`;
      } else {
        return `Multiply by ${fromUnit.toBase(1)} then divide by ${toUnit.toBase(1)}`;
      }
    case 'area':
      if (fromUnitId === 'square-meter' && toUnitId !== 'square-meter') {
        return `Divide by ${toUnit.toBase(1)}`;
      } else if (fromUnitId !== 'square-meter' && toUnitId === 'square-meter') {
        return `Multiply by ${fromUnit.toBase(1)}`;
      } else {
        return `Multiply by ${fromUnit.toBase(1)} then divide by ${toUnit.toBase(1)}`;
      }
    case 'volume':
      if (fromUnitId === 'cubic-meter' && toUnitId !== 'cubic-meter') {
        return `Divide by ${toUnit.toBase(1)}`;
      } else if (fromUnitId !== 'cubic-meter' && toUnitId === 'cubic-meter') {
        return `Multiply by ${fromUnit.toBase(1)}`;
      } else {
        return `Multiply by ${fromUnit.toBase(1)} then divide by ${toUnit.toBase(1)}`;
      }
    default:
      return 'Unknown conversion';
  }
};

// Get the dimension (length, area, volume) for a unit
export const getUnitDimension = (unitId: string): string => {
  for (const dimension of Object.keys(allUnitsByDimension) as Array<keyof typeof allUnitsByDimension>) {
    if (allUnitsByDimension[dimension].some(unit => unit.id === unitId)) {
      return dimension;
    }
  }
  return 'unknown';
};

// Check if two units are compatible (same dimension)
export const areUnitsCompatible = (fromUnitId: string, toUnitId: string): boolean => {
  return getUnitDimension(fromUnitId) === getUnitDimension(toUnitId);
};

// Get relative scale between units (for visualization)
export const getRelativeScale = (fromUnitId: string, toUnitId: string): number => {
  try {
    return convert(1, fromUnitId, toUnitId);
  } catch (e) {
    return 0;
  }
};
