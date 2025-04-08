
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import UnitConverter from '@/components/UnitConverter';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { setRouteSeo } from '@/utils/routeSeo';

const VolumeConverter = () => {
  const location = useLocation();

  useEffect(() => {
    setRouteSeo('/volume-converter');
  }, []);

  return (
    <>
      <Helmet>
        <title>Volume Unit Converter - Convert Cubic Meters, Gallons, Liters | UltraLength</title>
        <meta name="description" content="Free online volume converter for cubic meters, liters, gallons, and more. Perfect for cooking, construction, and scientific calculations." />
        <meta name="keywords" content="volume converter, cubic meters to cubic feet, gallons to liters, fluid volume calculator" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <header className="py-8 md:py-12 container">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Volume Unit Converter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              Convert between cubic meters, gallons, liters, and more
            </p>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="grid gap-8">
            <section>
              <Card className="p-6">
                <UnitConverter defaultDimension="volume" />
              </Card>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Common Volume Conversions</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">From</th>
                      <th className="border p-2 text-left">To</th>
                      <th className="border p-2 text-left">Multiply By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Cubic Meters</td>
                      <td className="border p-2">Cubic Feet</td>
                      <td className="border p-2">35.3147</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Liters</td>
                      <td className="border p-2">Gallons (US)</td>
                      <td className="border p-2">0.264172</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Gallons (US)</td>
                      <td className="border p-2">Liters</td>
                      <td className="border p-2">3.78541</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Cubic Inches</td>
                      <td className="border p-2">Milliliters</td>
                      <td className="border p-2">16.3871</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Fluid Ounces (US)</td>
                      <td className="border p-2">Milliliters</td>
                      <td className="border p-2">29.5735</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Volume Conversion Guide</h2>
              <div className="prose prose-sm max-w-none">
                <p>
                  Volume conversion is essential in many aspects of daily life and professional fields,
                  from cooking and baking to engineering and scientific research.
                </p>
                
                <h3>Metric Volume Units</h3>
                <p>
                  The metric system uses cubic meters (m³) as the base unit for volume, with liters often used for fluids:
                </p>
                <ul>
                  <li>Cubic Meter (m³) - Base unit of volume</li>
                  <li>Liter (L) = 0.001 cubic meters = 1000 cubic centimeters</li>
                  <li>Milliliter (mL) = 0.001 liters = 1 cubic centimeter</li>
                  <li>Cubic Centimeter (cm³) = 0.000001 cubic meters = 1 milliliter</li>
                  <li>Cubic Millimeter (mm³) = 0.000000001 cubic meters</li>
                </ul>
                
                <h3>US Customary and Imperial Volume Units</h3>
                <p>
                  These systems have different units for dry and liquid measurements:
                </p>
                
                <h4>Liquid Volume Units</h4>
                <ul>
                  <li>Gallon (US) = 3.78541 liters = 4 quarts = 128 fluid ounces</li>
                  <li>Gallon (Imperial) = 4.54609 liters = 4 quarts = 160 imperial fluid ounces</li>
                  <li>Quart = 0.946353 liters (US) or 1.13652 liters (Imperial)</li>
                  <li>Pint = 0.473176 liters (US) or 0.568261 liters (Imperial)</li>
                  <li>Cup = 0.236588 liters (US) or 0.284131 liters (Imperial)</li>
                  <li>Fluid Ounce = 0.0295735 liters (US) or 0.0284131 liters (Imperial)</li>
                </ul>
                
                <h4>Dry Volume Units</h4>
                <ul>
                  <li>Bushel = 35.2391 liters (US)</li>
                  <li>Peck = 8.80977 liters (US)</li>
                  <li>Dry Gallon = 4.40488 liters (US)</li>
                  <li>Dry Quart = 1.10122 liters (US)</li>
                </ul>
                
                <h3>Cooking and Baking</h3>
                <p>
                  Volume conversions are particularly important in the kitchen:
                </p>
                <ul>
                  <li>1 tablespoon = 3 teaspoons = 14.7868 milliliters (US)</li>
                  <li>1 teaspoon = 4.92892 milliliters (US)</li>
                  <li>1 cup = 16 tablespoons = 236.588 milliliters (US)</li>
                </ul>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VolumeConverter;
