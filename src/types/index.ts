
export type UnitGroup = 'metric' | 'imperial' | 'us' | 'ancient' | 'astronomical' | 'maritime' | 'other';
export type UnitDimension = 'length' | 'area' | 'volume';

export interface ConversionUnit {
  id: string;
  name: string;
  abbreviation: string;
  group: UnitGroup;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface ConversionInput {
  value: string;
  fromUnit: string;
  toUnit: string;
}

export interface ConversionResult {
  id: string;
  timestamp: number;
  fromValue: number;
  fromUnit: string;
  toUnit: string;
  toValue: number;
}

export interface RelativeScale {
  fromUnitId: string;
  toUnitId: string;
  ratio: number;
}

export interface Favorite {
  id: string;
  name: string;
  fromUnit: string;
  toUnit: string;
}
