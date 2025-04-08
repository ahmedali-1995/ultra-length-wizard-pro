
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import UnitConverter from '@/components/UnitConverter';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { setRouteSeo } from '@/utils/routeSeo';

const LengthConverter = () => {
  const location = useLocation();

  useEffect(() => {
    setRouteSeo('/length-converter');
  }, []);

  return (
    <>
      <Helmet>
        <title>Length Unit Converter - Convert Between Any Length Units | UltraLength</title>
        <meta name="description" content="Free online length converter to convert between metric, imperial, and historical length units. Convert inches to cm, feet to meters, miles to kilometers and more." />
        <meta name="keywords" content="length converter, distance converter, meters to feet, inches to centimeters, miles to kilometers" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <header className="py-8 md:py-12 container">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Length Unit Converter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              Convert between any length units with precision and ease
            </p>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="grid gap-8">
            <section>
              <Card className="p-6">
                <UnitConverter defaultDimension="length" />
              </Card>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Common Length Conversions</h2>
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
                      <td className="border p-2">Inches</td>
                      <td className="border p-2">Centimeters</td>
                      <td className="border p-2">2.54</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Feet</td>
                      <td className="border p-2">Meters</td>
                      <td className="border p-2">0.3048</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Yards</td>
                      <td className="border p-2">Meters</td>
                      <td className="border p-2">0.9144</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Miles</td>
                      <td className="border p-2">Kilometers</td>
                      <td className="border p-2">1.60934</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Nautical Miles</td>
                      <td className="border p-2">Kilometers</td>
                      <td className="border p-2">1.852</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Length Conversion Guide</h2>
              <div className="prose prose-sm max-w-none">
                <p>
                  Length conversion is essential in many fields, from everyday tasks to professional applications.
                  Whether you're working on a DIY project, studying physics, or planning travel distances, accurate
                  length conversion ensures precision in your measurements.
                </p>
                <h3>Metric System</h3>
                <p>
                  The metric system is based on powers of 10, making conversions straightforward. The base unit is the meter (m).
                  Common metric length units include:
                </p>
                <ul>
                  <li>Kilometer (km) = 1,000 meters</li>
                  <li>Decimeter (dm) = 0.1 meters</li>
                  <li>Centimeter (cm) = 0.01 meters</li>
                  <li>Millimeter (mm) = 0.001 meters</li>
                  <li>Micrometer (μm) = 0.000001 meters</li>
                  <li>Nanometer (nm) = 0.000000001 meters</li>
                </ul>
                
                <h3>Imperial System</h3>
                <p>
                  The imperial system is primarily used in the United States and a few other countries. Common units include:
                </p>
                <ul>
                  <li>Mile = 1,760 yards = 5,280 feet</li>
                  <li>Yard = 3 feet = 36 inches</li>
                  <li>Foot = 12 inches</li>
                  <li>Inch = 1/12 foot</li>
                </ul>
                
                <h3>Historical Units</h3>
                <p>
                  Throughout history, various civilizations developed their own length units. Some historical units that are
                  still referenced today include:
                </p>
                <ul>
                  <li>Cubit - From ancient Egypt, approximately 45-52 cm</li>
                  <li>League - Varied across cultures, typically the distance a person could walk in one hour</li>
                  <li>Fathom - Originally based on the span of a man's outstretched arms, now standardized as 6 feet</li>
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

export default LengthConverter;
