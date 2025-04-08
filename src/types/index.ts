
export interface ConversionUnit {
  id: string;
  name: string;
  abbreviation: string;
  group: UnitGroup;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export type UnitGroup = 'metric' | 'imperial' | 'us' | 'ancient' | 'astronomical' | 'maritime' | 'other';

export interface ConversionResult {
  id: string;
  timestamp: number;
  fromValue: number;
  fromUnit: string;
  toUnit: string;
  toValue: number;
}

export interface ConversionInput {
  value: string;
  fromUnit: string;
  toUnit: string;
}
