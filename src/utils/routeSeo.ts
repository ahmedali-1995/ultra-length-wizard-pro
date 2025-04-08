
import { updateSEO, addFAQSchema, addBreadcrumbSchema } from './seoUtils';

type RouteConfig = {
  title: string;
  description: string;
  keywords: string[];
  breadcrumbs: {name: string, url: string}[];
  faqs: {question: string, answer: string}[];
};

// Map of routes to their SEO configurations
const routeConfigs: Record<string, RouteConfig> = {
  '/': {
    title: 'UltraLength Wizard Pro - Advanced Unit Converter Tool',
    description: 'Convert between any length, area, and volume units with this advanced, user-friendly conversion tool. Support for metric, imperial, astronomical and ancient units.',
    keywords: ['unit converter', 'length converter', 'area converter', 'volume converter', 'measurement tool'],
    breadcrumbs: [
      { name: "Home", url: "https://ultralength.lovable.app/" }
    ],
    faqs: [
      {
        question: "How accurate is UltraLength Wizard's conversion?",
        answer: "UltraLength Wizard provides precise unit conversions with customizable decimal precision up to 10 decimal places."
      },
      {
        question: "What types of units can I convert with UltraLength Wizard?",
        answer: "UltraLength Wizard supports length, area, and volume conversions across metric, imperial, astronomical, and historical unit systems."
      }
    ]
  },
  '/length-converter': {
    title: 'Length Unit Converter - Convert Between Any Length Units | UltraLength',
    description: 'Free online length converter to convert between metric, imperial, and historical length units. Convert inches to cm, feet to meters, miles to kilometers and more.',
    keywords: ['length converter', 'distance converter', 'meters to feet', 'inches to centimeters', 'miles to kilometers'],
    breadcrumbs: [
      { name: "Home", url: "https://ultralength.lovable.app/" },
      { name: "Length Converter", url: "https://ultralength.lovable.app/length-converter" }
    ],
    faqs: [
      {
        question: "How do I convert inches to centimeters?",
        answer: "To convert inches to centimeters, multiply the value in inches by 2.54. Our converter does this automatically - just select inches as your input unit and centimeters as your output unit."
      },
      {
        question: "What is the difference between a mile and a kilometer?",
        answer: "One mile equals approximately 1.60934 kilometers. A mile is commonly used in the United States and United Kingdom, while a kilometer is the standard unit of distance in the metric system used by most countries."
      }
    ]
  },
  '/area-converter': {
    title: 'Area Unit Converter - Convert Square Feet, Square Meters & More | UltraLength',
    description: 'Free online area converter to convert between square feet, square meters, acres, hectares and other area units. Perfect for real estate and land measurements.',
    keywords: ['area converter', 'square feet to square meters', 'acres to hectares', 'area calculation'],
    breadcrumbs: [
      { name: "Home", url: "https://ultralength.lovable.app/" },
      { name: "Area Converter", url: "https://ultralength.lovable.app/area-converter" }
    ],
    faqs: [
      {
        question: "How many square feet are in an acre?",
        answer: "There are 43,560 square feet in one acre. An acre is commonly used for measuring land area in the United States and UK."
      },
      {
        question: "What is a hectare compared to an acre?",
        answer: "A hectare is equal to 10,000 square meters or approximately 2.471 acres. Hectares are commonly used in the metric system for measuring large areas of land."
      }
    ]
  },
  '/volume-converter': {
    title: 'Volume Unit Converter - Convert Cubic Meters, Gallons, Liters | UltraLength',
    description: 'Free online volume converter for cubic meters, liters, gallons, and more. Perfect for cooking, construction, and scientific calculations.',
    keywords: ['volume converter', 'cubic meters to cubic feet', 'gallons to liters', 'fluid volume calculator'],
    breadcrumbs: [
      { name: "Home", url: "https://ultralength.lovable.app/" },
      { name: "Volume Converter", url: "https://ultralength.lovable.app/volume-converter" }
    ],
    faqs: [
      {
        question: "How many cups are in a gallon?",
        answer: "There are 16 cups in a U.S. gallon. In the imperial system, there are approximately 18.18 imperial cups in an imperial gallon."
      },
      {
        question: "What is the difference between a U.S. gallon and an Imperial gallon?",
        answer: "A U.S. gallon equals approximately 3.785 liters, while an Imperial gallon equals approximately 4.546 liters. This means an Imperial gallon is about 20% larger than a U.S. gallon."
      }
    ]
  }
};

/**
 * Set all SEO-related elements for the current route
 * @param pathname - The current route path
 * @param fromUnit - Optional from unit for dynamic titles
 * @param toUnit - Optional to unit for dynamic titles
 */
export const setRouteSeo = (
  pathname: string, 
  fromUnit?: string, 
  toUnit?: string
): void => {
  // Get the route config, defaulting to home if not found
  const config = routeConfigs[pathname] || routeConfigs['/'];
  
  // Update SEO metadata
  updateSEO(fromUnit, toUnit);
  
  // Add breadcrumb schema for the current route
  addBreadcrumbSchema(config.breadcrumbs);
  
  // Add FAQ schema for the current route
  addFAQSchema(config.faqs);

  // Update document title
  document.title = fromUnit && toUnit
    ? `Convert ${fromUnit} to ${toUnit} - UltraLength Wizard Pro`
    : config.title;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", config.description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute("content", config.keywords.join(', '));
  }
};

/**
 * Generate dynamic page title based on units being converted
 */
export const generateDynamicTitle = (fromUnit: string, toUnit: string): string => {
  return `Convert ${fromUnit} to ${toUnit} - UltraLength Wizard Pro`;
};

/**
 * Generate dynamic meta description based on units being converted
 */
export const generateDynamicDescription = (fromUnit: string, toUnit: string): string => {
  return `Convert ${fromUnit} to ${toUnit} easily with our free online calculator. Get precise conversions instantly with UltraLength Wizard Pro.`;
};
