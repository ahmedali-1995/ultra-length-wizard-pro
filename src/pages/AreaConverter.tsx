
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import UnitConverter from '@/components/UnitConverter';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { setRouteSeo } from '@/utils/routeSeo';

const AreaConverter = () => {
  const location = useLocation();

  useEffect(() => {
    setRouteSeo('/area-converter');
  }, []);

  return (
    <>
      <Helmet>
        <title>Area Unit Converter - Convert Square Feet, Square Meters & More | UltraLength</title>
        <meta name="description" content="Free online area converter to convert between square feet, square meters, acres, hectares and other area units. Perfect for real estate and land measurements." />
        <meta name="keywords" content="area converter, square feet to square meters, acres to hectares, area calculation" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <header className="py-8 md:py-12 container">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Area Unit Converter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              Convert between square feet, square meters, acres, and more
            </p>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="grid gap-8">
            <section>
              <Card className="p-6">
                <UnitConverter defaultDimension="area" />
              </Card>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Common Area Conversions</h2>
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
                      <td className="border p-2">Square Feet</td>
                      <td className="border p-2">Square Meters</td>
                      <td className="border p-2">0.092903</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Square Meters</td>
                      <td className="border p-2">Square Feet</td>
                      <td className="border p-2">10.7639</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Acres</td>
                      <td className="border p-2">Hectares</td>
                      <td className="border p-2">0.404686</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Hectares</td>
                      <td className="border p-2">Acres</td>
                      <td className="border p-2">2.47105</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Square Miles</td>
                      <td className="border p-2">Square Kilometers</td>
                      <td className="border p-2">2.58999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Area Conversion Guide</h2>
              <div className="prose prose-sm max-w-none">
                <p>
                  Area conversion is crucial for real estate, construction, agriculture, and many other fields.
                  Understanding how to convert between different area units ensures accurate measurements for your projects.
                </p>
                
                <h3>Metric Area Units</h3>
                <p>
                  The metric system uses square meters (m²) as the base unit for area. Common metric area units include:
                </p>
                <ul>
                  <li>Square Kilometer (km²) = 1,000,000 square meters</li>
                  <li>Hectare (ha) = 10,000 square meters</li>
                  <li>Are (a) = 100 square meters</li>
                  <li>Square Centimeter (cm²) = 0.0001 square meters</li>
                  <li>Square Millimeter (mm²) = 0.000001 square meters</li>
                </ul>
                
                <h3>Imperial and US Customary Area Units</h3>
                <p>
                  These systems use various units for different scales of measurement:
                </p>
                <ul>
                  <li>Square Mile = 640 acres = 27,878,400 square feet</li>
                  <li>Acre = 43,560 square feet</li>
                  <li>Square Yard = 9 square feet</li>
                  <li>Square Foot = 144 square inches</li>
                  <li>Square Inch = 1/144 square foot</li>
                </ul>
                
                <h3>Real Estate and Land Measurement</h3>
                <p>
                  Different countries use different area units for real estate:
                </p>
                <ul>
                  <li>United States: Square Feet, Acres</li>
                  <li>United Kingdom: Square Feet, Acres</li>
                  <li>European Union: Square Meters, Hectares</li>
                  <li>India: Square Feet, Acres, and local units like Bigha and Marla</li>
                  <li>Japan: Tsubo (approximately 3.3 square meters)</li>
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

export default AreaConverter;
