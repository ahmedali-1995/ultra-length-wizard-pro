import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  allUnitsByDimension, 
  allGroupedUnitsByDimension,
  convert, 
  formatValue, 
  getRelativeScale, 
  areUnitsCompatible
} from '@/utils/conversionUtils';
import DimensionSelector from './DimensionSelector';
import { toast } from 'sonner';
import { 
  ArrowRight, Maximize2, Minimize2, RefreshCcw, Info, 
  ArrowDown, ChevronUp, ChevronDown, Globe, Building, User,
  Microscope, Mountain, Landmark, Star, Map, Ruler,
  Square, Box, Droplet, Home, ParkingCircle, Warehouse, Ship,
  Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ConversionVisualizer: React.FC = () => {
  const [dimension, setDimension] = useState<'length' | 'area' | 'volume'>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [value, setValue] = useState<string>('1');
  const [scale, setScale] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<boolean>(true);
  const [showRealWorldExamples, setShowRealWorldExamples] = useState<boolean>(true);
  const [selectedExample, setSelectedExample] = useState<any>(null);
  const [showExampleDialog, setShowExampleDialog] = useState<boolean>(false);
  
  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      try {
        if (!areUnitsCompatible(fromUnit, toUnit)) {
          toast.error("Units are not compatible");
          return;
        }
        
        const numericValue = parseFloat(value);
        const convertedValue = convert(numericValue, fromUnit, toUnit);
        setResult(convertedValue);
        
        const relativeScale = getRelativeScale(fromUnit, toUnit);
        setScale(relativeScale);
        
        if (autoScale) {
          const newZoom = calculateIdealZoom(relativeScale);
          setZoomLevel(newZoom);
        }
      } catch (error) {
        console.error('Visualization error:', error);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, dimension, autoScale]);

  const calculateIdealZoom = (scale: number): number => {
    if (scale > 1000) return 0.01;
    if (scale > 100) return 0.1;
    if (scale > 10) return 0.5;
    if (scale < 0.001) return 100;
    if (scale < 0.01) return 10;
    if (scale < 0.1) return 5;
    return 1;
  };
  
  const handleDimensionChange = (newDimension: 'length' | 'area' | 'volume') => {
    setDimension(newDimension);
    const defaultUnits = {
      length: { from: 'meter', to: 'foot' },
      area: { from: 'square-meter', to: 'square-foot' },
      volume: { from: 'cubic-meter', to: 'cubic-foot' }
    };
    
    setFromUnit(defaultUnits[newDimension].from);
    setToUnit(defaultUnits[newDimension].to);
  };
  
  const resetZoom = () => {
    setZoomLevel(1);
    setAutoScale(true);
  };
  
  const units = allUnitsByDimension[dimension];
  const groupedUnits = allGroupedUnitsByDimension[dimension];
  
  const getUnitName = (id: string): string => {
    const unit = units.find(u => u.id === id);
    return unit ? unit.name : id;
  };
  
  const getUnitAbbreviation = (id: string): string => {
    const unit = units.find(u => u.id === id);
    return unit ? unit.abbreviation : id;
  };

  const getExampleImage = (example: any, groupName: string): string => {
    const imageMap: Record<string, string> = {
      "Observable Universe": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop",
      "Andromeda Galaxy": "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop",
      "Earth to Sun": "https://images.unsplash.com/photo-1532628965632-a610654b9604?w=800&h=600&fit=crop",
      "Earth's diameter": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop",
      "Great Barrier Reef": "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop",
      "Mount Everest": "https://images.unsplash.com/photo-1575728099259-7ea01d4de3f9?w=800&h=600&fit=crop",
      "Golden Gate Bridge": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
      "Eiffel Tower": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&h=600&fit=crop",
      "Football field": "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&h=600&fit=crop",
      "Swimming pool": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
      "Car length": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
      "Door height": "https://images.unsplash.com/photo-1531153432275-5d383a7fbbb4?w=800&h=600&fit=crop",
      "Basketball": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      "Smartphone": "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=800&h=600&fit=crop",
      "Credit card": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop",
      "Ant": "https://images.unsplash.com/photo-1618605413929-6522d36b089d?w=800&h=600&fit=crop",
      "Human hair": "https://images.unsplash.com/photo-1585751119414-b2e482e21740?w=800&h=600&fit=crop",
      "DNA width": "https://images.unsplash.com/photo-1583318432730-a19c89692612?w=800&h=600&fit=crop",
      
      "Central Park": "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop",
      "Manhattan": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "Lake Tahoe": "https://images.unsplash.com/photo-1548954042-c7fbac6be38d?w=800&h=600&fit=crop",
      "New York City": "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=800&h=600&fit=crop",
      "Texas": "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&h=600&fit=crop",
      "United States": "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800&h=600&fit=crop",
      "Earth's surface": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop",
      "Tennis court": "https://images.unsplash.com/photo-1595413895318-b2c2b5497d52?w=800&h=600&fit=crop",
      "Basketball court": "https://images.unsplash.com/photo-1505666287802-931dc83a5dc9?w=800&h=600&fit=crop",
      
      "Teaspoon": "https://images.unsplash.com/photo-1585032767761-878270336a0b?w=800&h=600&fit=crop",
      "Shot glass": "https://images.unsplash.com/photo-1601061171392-8e4c938358a0?w=800&h=600&fit=crop",
      "Cup": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&h=600&fit=crop",
      "Bottle of water": "https://images.unsplash.com/photo-1606076165784-C2f1eeaeec83?w=800&h=600&fit=crop",
      "Microwave": "https://images.unsplash.com/photo-1574269910231-bc508bcb68d6?w=800&h=600&fit=crop",
      "Refrigerator": "https://images.unsplash.com/photo-1536749730899-48a725b6fde2?w=800&h=600&fit=crop",
      "Hot tub": "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=800&h=600&fit=crop",
      "Shipping container": "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&h=600&fit=crop",
      "Great Lakes": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop",
      "Earth's oceans": "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=800&h=600&fit=crop",
      "Jupiter": "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=600&fit=crop",
      "Sun": "https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800&h=600&fit=crop",
    };

    if (imageMap[example.name]) {
      return imageMap[example.name];
    }

    if (dimension === 'length') {
      if (groupName === "Astronomical") return "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop";
      if (groupName === "Geographic") return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop";
      if (groupName === "Human scale") return "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&h=600&fit=crop";
      return "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=600&fit=crop";
    }
    
    if (dimension === 'area') {
      if (groupName === "Large areas") return "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&h=600&fit=crop";
      if (groupName === "Medium areas") return "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=600&fit=crop";
      return "https://images.unsplash.com/photo-1562619371-b67725b6fde2?w=800&h=600&fit=crop";
    }
    
    if (groupName === "Massive volumes") return "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop";
    if (groupName === "Large volumes") return "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=800&h=600&fit=crop";
    if (groupName === "Medium volumes") return "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&h=600&fit=crop";
    return "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&h=600&fit=crop";
  };

  const fromBarWidth = 100;
  const toBarWidth = Math.min(Math.max((scale * 100 * zoomLevel), 5), 200);
  
  const getExampleIcon = (example: any, groupName: string) => {
    if (dimension === 'length') {
      if (example.size > 1e9) return <Star className="h-4 w-4 text-purple-500" />;
      if (example.size > 1000) return <Globe className="h-4 w-4 text-blue-500" />;
      if (example.size > 0.01) return <Ruler className="h-4 w-4 text-green-500" />;
      return <Microscope className="h-4 w-4 text-amber-500" />;
    }
    
    if (dimension === 'area') {
      if (example.size > 1e6) return <Map className="h-4 w-4 text-blue-500" />;
      if (example.size > 10) return <Building className="h-4 w-4 text-slate-500" />;
      return <Square className="h-4 w-4 text-green-500" />;
    }
    
    if (dimension === 'volume') {
      if (example.size > 1e9) return <Star className="h-4 w-4 text-purple-500" />;
      if (example.size > 100) return <Droplet className="h-4 w-4 text-blue-500" />;
      if (example.size > 0.01) return <Box className="h-4 w-4 text-amber-500" />;
      return <Droplet className="h-4 w-4 text-cyan-500 transform scale-50" />;
    }

    return <Info className="h-4 w-4 text-gray-500" />;
  };

  const getGroupIcon = (groupName: string) => {
    switch (groupName) {
      case "Astronomical":
        return <Star className="h-5 w-5 mr-2 text-purple-500" />;
      case "Geographic":
        return <Globe className="h-5 w-5 mr-2 text-blue-500" />;
      case "Human scale":
        return <User className="h-5 w-5 mr-2 text-green-500" />;
      case "Microscopic":
        return <Microscope className="h-5 w-5 mr-2 text-amber-500" />;
      case "Large areas":
        return <Map className="h-5 w-5 mr-2 text-blue-500" />;
      case "Medium areas":
        return <ParkingCircle className="h-5 w-5 mr-2 text-green-500" />;
      case "Small areas":
        return <Square className="h-5 w-5 mr-2 text-cyan-500" />;
      case "Massive volumes":
        return <Star className="h-5 w-5 mr-2 text-purple-500" />;
      case "Large volumes":
        return <Ship className="h-5 w-5 mr-2 text-blue-500" />;
      case "Medium volumes":
        return <Home className="h-5 w-5 mr-2 text-green-500" />;
      case "Small volumes":
        return <Droplet className="h-5 w-5 mr-2 text-cyan-500" />;
      default:
        return <Info className="h-5 w-5 mr-2 text-gray-500" />;
    }
  };

  const calculatePositionPercentage = (value: number, allValues: number[]): number => {
    if (allValues.length === 0) return 50;
    
    const values = [...allValues, value].sort((a, b) => a - b);
    const index = values.indexOf(value);
    
    if (index === 0) return 5;
    if (index === values.length - 1) return 95;
    
    return (index / (values.length - 1)) * 100;
  };

  const getRealWorldExamples = () => {
    const examples: { name: string; size: number; unit: string; description: string }[] = [];
    
    if (dimension === 'length') {
      examples.push(
        { name: 'Observable Universe', size: 8.8e26, unit: 'meter', description: 'Diameter of observable universe' },
        { name: 'Andromeda Galaxy', size: 2.5e21, unit: 'meter', description: 'Diameter of Andromeda' },
        { name: 'Light year', size: 9.46e15, unit: 'meter', description: 'Distance light travels in a year' },
        { name: 'Solar System', size: 9e12, unit: 'meter', description: 'Diameter to Kuiper Belt' },
        { name: 'Earth to Sun', size: 1.496e11, unit: 'meter', description: 'Average distance (1 AU)' },
        
        { name: 'Earth\'s diameter', size: 12742000, unit: 'meter', description: 'Average diameter of Earth' },
        { name: 'Great Barrier Reef', size: 2300000, unit: 'meter', description: 'Length of reef system' },
        { name: 'Mount Everest', size: 8849, unit: 'meter', description: 'Height above sea level' },
        { name: 'Golden Gate Bridge', size: 2737, unit: 'meter', description: 'Total length' },
        { name: 'Eiffel Tower', size: 324, unit: 'meter', description: 'Height to the tip' },
        
        { name: 'Football field', size: 105, unit: 'meter', description: 'Standard field length' },
        { name: 'Swimming pool', size: 25, unit: 'meter', description: 'Olympic pool length' },
        { name: 'Car length', size: 4.5, unit: 'meter', description: 'Average passenger car' },
        { name: 'Door height', size: 2.1, unit: 'meter', description: 'Standard door height' },
        { name: 'Basketball', size: 0.24, unit: 'meter', description: 'Diameter of basketball' },
        
        { name: 'Smartphone', size: 0.15, unit: 'meter', description: 'Length of typical smartphone' },
        { name: 'Credit card', size: 0.086, unit: 'meter', description: 'Length of a standard card' },
        { name: 'Ant', size: 0.005, unit: 'meter', description: 'Average size of a worker ant' },
        
        { name: 'Human hair', size: 0.00008, unit: 'meter', description: 'Average diameter of human hair' },
        { name: 'Virus', size: 0.0000001, unit: 'meter', description: 'Average size of a virus' },
        { name: 'DNA width', size: 0.0000000023, unit: 'meter', description: 'Width of a DNA double helix' },
        { name: 'Atom', size: 0.0000000001, unit: 'meter', description: 'Typical diameter of an atom' }
      );
    } else if (dimension === 'area') {
      examples.push(
        { name: 'Red blood cell', size: 0.0000000001, unit: 'square-meter', description: 'Surface area of a red blood cell' },
        { name: 'Bacteria', size: 0.000000001, unit: 'square-meter', description: 'Surface area of a typical bacterium' },
        
        { name: 'Postage stamp', size: 0.0004, unit: 'square-meter', description: 'Area of typical stamp' },
        { name: 'Smartphone screen', size: 0.01, unit: 'square-meter', description: 'Screen area of typical smartphone' },
        { name: 'Piece of paper', size: 0.06, unit: 'square-meter', description: 'Standard A4 sheet' },
        { name: 'Door', size: 1.6, unit: 'square-meter', description: 'Standard door area' },
        
        { name: 'Parking space', size: 12, unit: 'square-meter', description: 'Standard car parking spot' },
        { name: 'Studio apartment', size: 35, unit: 'square-meter', description: 'Small apartment' },
        { name: 'Tennis court', size: 260, unit: 'square-meter', description: 'Singles court area' },
        { name: 'Basketball court', size: 420, unit: 'square-meter', description: 'NBA regulation court' },
        
        { name: 'Football field', size: 7140, unit: 'square-meter', description: 'Standard field area' },
        { name: 'City block', size: 18000, unit: 'square-meter', description: 'Typical urban block' },
        { name: 'Central Park', size: 3410000, unit: 'square-meter', description: 'NYC Central Park area' },
        { name: 'Manhattan', size: 59100000, unit: 'square-meter', description: 'Total area of Manhattan' },
        
        { name: 'Lake Tahoe', size: 495000000, unit: 'square-meter', description: 'Surface area of Lake Tahoe' },
        { name: 'New York City', size: 784000000, unit: 'square-meter', description: 'Total area of NYC' },
        { name: 'Texas', size: 696200000000, unit: 'square-meter', description: 'Total area of Texas' },
        { name: 'United States', size: 9834000000000, unit: 'square-meter', description: 'Total area of the US' },
        
        { name: 'Earth\'s surface', size: 5.1e14, unit: 'square-meter', description: 'Total surface area of Earth' },
        { name: 'Jupiter\'s surface', size: 6.1e16, unit: 'square-meter', description: 'Surface area of Jupiter' },
        { name: 'Sun\'s surface', size: 6.08e18, unit: 'square-meter', description: 'Surface area of the Sun' }
      );
    } else if (dimension === 'volume') {
      examples.push(
        { name: 'Water molecule', size: 3e-29, unit: 'cubic-meter', description: 'Volume of a single water molecule' },
        { name: 'Red blood cell', size: 9e-17, unit: 'cubic-meter', description: 'Volume of a red blood cell' },
        
        { name: 'Teaspoon', size: 0.000005, unit: 'cubic-meter', description: '5 milliliters' },
        { name: 'Shot glass', size: 0.00004, unit: 'cubic-meter', description: '40 milliliters' },
        { name: 'Cup', size: 0.00025, unit: 'cubic-meter', description: '250 milliliters' },
        { name: 'Bottle of water', size: 0.001, unit: 'cubic-meter', description: '1 liter bottle' },
        
        { name: 'Microwave', size: 0.02, unit: 'cubic-meter', description: 'Interior volume' },
        { name: 'Refrigerator', size: 0.6, unit: 'cubic-meter', description: 'Average refrigerator' },
        { name: 'Hot tub', size: 1.8, unit: 'cubic-meter', description: '6-person hot tub' },
        { name: 'Cargo van', size: 11, unit: 'cubic-meter', description: 'Large cargo van' },
        
        { name: 'Shipping container', size: 33, unit: 'cubic-meter', description: 'Standard 20ft container' },
        { name: 'Swimming pool', size: 1250, unit: 'cubic-meter', description: 'Olympic-sized pool' },
        { name: 'Goodyear Blimp', size: 8425, unit: 'cubic-meter', description: 'Volume of the blimp envelope' },
        { name: 'House', size: 1000, unit: 'cubic-meter', description: 'Average single-family home' },
        
        { name: 'Great Lakes', size: 22671000000000, unit: 'cubic-meter', description: 'Combined volume of all Great Lakes' },
        { name: 'Earth\'s oceans', size: 1.3e18, unit: 'cubic-meter', description: 'Total volume of Earth\'s oceans' },
        
        { name: 'Earth', size: 1.08e21, unit: 'cubic-meter', description: 'Total volume of Earth' },
        { name: 'Jupiter', size: 1.43e24, unit: 'cubic-meter', description: 'Volume of planet Jupiter' },
        { name: 'Sun', size: 1.41e27, unit: 'cubic-meter', description: 'Volume of our Sun' },
        { name: 'VY Canis Majoris', size: 5e30, unit: 'cubic-meter', description: 'Volume of one of the largest known stars' }
      );
    }
    
    return examples.map(example => {
      try {
        const convertedSize = convert(example.size, example.unit, fromUnit);
        return {
          ...example,
          sizeInSelectedUnit: convertedSize,
          formattedSize: formatValue(convertedSize, 4)
        };
      } catch (error) {
        return {
          ...example,
          sizeInSelectedUnit: null,
          formattedSize: 'N/A'
        };
      }
    });
  };
  
  const realWorldExamples = getRealWorldExamples();
  
  const findClosestExample = () => {
    if (!value || isNaN(parseFloat(value)) || !realWorldExamples.length) return null;
    
    const numericValue = parseFloat(value);
    const validExamples = realWorldExamples.filter(ex => ex.sizeInSelectedUnit !== null);
    
    if (validExamples.length === 0) return null;
    
    return validExamples.reduce((closest, current) => {
      const currentDiff = Math.abs((current.sizeInSelectedUnit as number) - numericValue);
      const closestDiff = Math.abs((closest.sizeInSelectedUnit as number) - numericValue);
      return currentDiff < closestDiff ? current : closest;
    });
  };

  const closestExample = findClosestExample();
  
  const groupExamplesByScale = () => {
    if (dimension === 'length') {
      return [
        { 
          name: "Astronomical", 
          description: "Cosmic distances and objects",
          examples: realWorldExamples.filter(e => e.size > 1e9)
        },
        { 
          name: "Geographic", 
          description: "Earth-scale features",
          examples: realWorldExamples.filter(e => e.size <= 1e9 && e.size > 1000)
        },
        { 
          name: "Human scale", 
          description: "Everyday objects",
          examples: realWorldExamples.filter(e => e.size <= 1000 && e.size > 0.01)
        },
        { 
          name: "Microscopic", 
          description: "Requires magnification to see",
          examples: realWorldExamples.filter(e => e.size <= 0.01)
        }
      ];
    } else if (dimension === 'area') {
      return [
        { name: "Large areas", description: "Geographical regions", examples: realWorldExamples.filter(e => e.size > 1e6) },
        { name: "Medium areas", description: "Buildings and plots", examples: realWorldExamples.filter(e => e.size <= 1e6 && e.size > 10) },
        { name: "Small areas", description: "Everyday objects", examples: realWorldExamples.filter(e => e.size <= 10) },
      ];
    } else {
      return [
        { name: "Massive volumes", description: "Astronomical objects", examples: realWorldExamples.filter(e => e.size > 1e9) },
        { name: "Large volumes", description: "Lakes and reservoirs", examples: realWorldExamples.filter(e => e.size <= 1e9 && e.size > 100) },
        { name: "Medium volumes", description: "Rooms and containers", examples: realWorldExamples.filter(e => e.size <= 100 && e.size > 0.01) },
        { name: "Small volumes", description: "Everyday items", examples: realWorldExamples.filter(e => e.size <= 0.01) },
      ];
    }
  };

  const groupedExamples = groupExamplesByScale();

  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    "Astronomical": false,
    "Geographic": false,
    "Human scale": true,
    "Microscopic": false,
    "Large areas": false,
    "Medium areas": true,
    "Small areas": false,
    "Massive volumes": false,
    "Large volumes": false,
    "Medium volumes": true,
    "Small volumes": false
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleExampleClick = (example: any) => {
    setSelectedExample(example);
    setShowExampleDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Unit Comparison Visualizer</h2>
      
      <DimensionSelector 
        selectedDimension={dimension} 
        onChange={handleDimensionChange} 
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From Unit</Label>
              <Select
                value={fromUnit}
                onValueChange={setFromUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedUnits).map(([group, groupUnits]) => (
                    groupUnits.length > 0 && (
                      <SelectGroup key={group}>
                        <SelectLabel className="capitalize">{group}</SelectLabel>
                        {groupUnits.map(unit => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.abbreviation})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>To Unit</Label>
              <Select
                value={toUnit}
                onValueChange={setToUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedUnits).map(([group, groupUnits]) => (
                    groupUnits.length > 0 && (
                      <SelectGroup key={group}>
                        <SelectLabel className="capitalize">{group}</SelectLabel>
                        {groupUnits.map(unit => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.abbreviation})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter a number"
              className="text-lg"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>1 {getUnitName(fromUnit)} ({getUnitAbbreviation(fromUnit)})</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
              <span>{scale ? formatValue(scale, 6) : '?'} {getUnitName(toUnit)} ({getUnitAbbreviation(toUnit)})</span>
            </div>
            <div className="text-muted-foreground text-xs">
              {scale > 1 ? 
                `1 ${getUnitName(fromUnit)} is ${scale.toFixed(2)}× larger than 1 ${getUnitName(toUnit)}` :
                scale < 1 ?
                `1 ${getUnitName(fromUnit)} is ${(1/scale).toFixed(2)}× smaller than 1 ${getUnitName(toUnit)}` :
                `1 ${getUnitName(fromUnit)} is equal to 1 ${getUnitName(toUnit)}`
              }
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="zoom" className="min-w-20">Visual Zoom</Label>
            <Slider 
              id="zoom"
              className="flex-1" 
              value={[zoomLevel]} 
              min={0.01} 
              max={10} 
              step={0.01}
              onValueChange={(value) => {
                setZoomLevel(value[0]);
                setAutoScale(false);
              }}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={resetZoom}
              title="Reset zoom"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Visual Zoom</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust the zoom level to better visualize the relative sizes when there are extreme differences.
                    Auto-scaling automatically sets an appropriate zoom level.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        
        <Card className="p-4 flex flex-col justify-center items-center overflow-hidden">
          <div className="text-center mb-4">
            <div className="font-semibold">Visual Comparison</div>
            <div className="text-sm text-muted-foreground">
              (Zoom level: {zoomLevel.toFixed(2)}x)
            </div>
          </div>
          
          {result !== null && (
            <div className="w-full space-y-12 p-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{value} {getUnitAbbreviation(fromUnit)}</span>
                  <span>{getUnitName(fromUnit)}</span>
                </div>
                <motion.div 
                  className="h-10 bg-primary/20 rounded-md w-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${fromBarWidth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{result ? formatValue(result, 4) : '?'} {getUnitAbbreviation(toUnit)}</span>
                  <span>{getUnitName(toUnit)}</span>
                </div>
                <motion.div 
                  className="h-10 bg-primary rounded-md relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${toBarWidth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setZoomLevel(Math.max(zoomLevel / 2, 0.01))}
              className="flex items-center gap-1"
            >
              <Minimize2 className="h-4 w-4" />
              <span>Zoom Out</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setZoomLevel(Math.min(zoomLevel * 2, 10))}
              className="flex items-center gap-1"
            >
              <Maximize2 className="h-4 w-4" />
              <span>Zoom In</span>
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Real-world Examples</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowRealWorldExamples(!showRealWorldExamples)}
            className="flex items-center gap-1"
          >
            {showRealWorldExamples ? 'Hide Examples' : 'Show Examples'}
            <ArrowDown className={`h-4 w-4 transition-transform ${showRealWorldExamples ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {showRealWorldExamples && (
          <div className="space-y-4">
            {closestExample && (
              <Card 
                className="p-3 border-primary/50 bg-primary/5 shadow-sm cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => handleExampleClick(closestExample)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getExampleIcon(closestExample, "")}
                    <div>
                      <h4 className="font-medium text-primary">{closestExample.name}</h4>
                      <p className="text-sm text-muted-foreground">{closestExample.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{closestExample.formattedSize} {getUnitAbbreviation(fromUnit)}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      ≈ {value} {getUnitAbbreviation(fromUnit)}
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="mb-3 text-sm text-center text-muted-foreground">
                Sizes in {getUnitName(fromUnit)}
              </div>
              
              <div className="space-y-3">
                {groupedExamples.map((group) => (
                  <div key={group.name} className="border border-border rounded-lg overflow-hidden">
                    <button 
                      className="w-full flex justify-between items-center p-3 bg-background hover:bg-muted/20 transition-colors"
                      onClick={() => toggleGroup(group.name)}
                    >
                      <div className="flex items-center">
                        {getGroupIcon(group.name)}
                        <div className="flex flex-col items-start">
                          <span className="font-semibold">{group.name}</span>
                          <span className="text-xs text-muted-foreground">{group.description}</span>
                        </div>
                      </div>
                      {expandedGroups[group.name] ? 
                        <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      }
                    </button>
                    
                    <AnimatePresence>
                      {expandedGroups[group.name] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 space-y-2">
                            {group.examples
                              .sort((a, b) => (b.sizeInSelectedUnit as number) - (a.sizeInSelectedUnit as number))
                              .slice(0, 5)
                              .map(example => {
                                const isClosest = closestExample && closestExample.name === example.name;
                                return (
                                  <div 
                                    key={example.name}
                                    className={`flex items-center justify-between p-2 rounded-md ${isClosest ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'} cursor-pointer`}
                                    onClick={() => handleExampleClick(example)}
                                  >
                                    <div className="flex items-center gap-2">
                                      {getExampleIcon(example, group.name)}
                                      <div>
                                        <div className="font-medium text-sm">{example.name}</div>
                                        <div className="text-xs text-muted-foreground">{example.description}</div>
                                      </div>
                                    </div>
                                    <div className="font-mono text-xs whitespace-nowrap">
                                      {example.formattedSize}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showExampleDialog} onOpenChange={setShowExampleDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedExample && (
                <>
                  {getExampleIcon(selectedExample, "")}
                  {selectedExample.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedExample?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedExample && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-md border">
                <AspectRatio ratio={4/3} className="bg-muted">
                  <div className="relative w-full h-full">
                    <img 
                      src={getExampleImage(selectedExample, "")} 
                      alt={selectedExample.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </AspectRatio>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="text-sm font-medium">In {getUnitName(fromUnit)}</div>
                  <div className="font-mono text-xl">{selectedExample.formattedSize} {getUnitAbbreviation(fromUnit)}</div>
                </div>
                
                {result !== null && (
                  <div className="p-3 bg-primary/5 rounded-md">
                    <div className="text-sm font-medium">Compare to your input</div>
                    <div className="font-mono text-xl">{value} {getUnitAbbreviation(fromUnit)}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConversionVisualizer;
