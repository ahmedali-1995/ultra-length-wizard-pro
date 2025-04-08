
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { setRouteSeo } from '@/utils/routeSeo';

const CommonConversions = () => {
  useEffect(() => {
    setRouteSeo('/common-conversions');
  }, []);

  return (
    <>
      <Helmet>
        <title>Common Unit Conversions | UltraLength Wizard Pro</title>
        <meta name="description" content="Browse our comprehensive list of common unit conversions for length, area, and volume. Find conversion factors, formulas, and practical examples." />
        <meta name="keywords" content="common conversions, conversion table, unit conversion chart, measurement conversion, conversion calculator" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <header className="py-8 md:py-12 container">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Common Unit Conversions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              Quick reference tables for the most frequently used conversions
            </p>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="grid gap-12">
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Popular Conversion Tools</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link to="/length-converter">
                  <Card className="p-6 hover:shadow-lg transition-all hover:scale-105">
                    <h3 className="text-xl font-bold mb-2">Length Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert between meters, feet, inches, miles, and more
                    </p>
                  </Card>
                </Link>
                
                <Link to="/area-converter">
                  <Card className="p-6 hover:shadow-lg transition-all hover:scale-105">
                    <h3 className="text-xl font-bold mb-2">Area Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert between square meters, square feet, acres, hectares, and more
                    </p>
                  </Card>
                </Link>
                
                <Link to="/volume-converter">
                  <Card className="p-6 hover:shadow-lg transition-all hover:scale-105">
                    <h3 className="text-xl font-bold mb-2">Volume Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert between cubic meters, liters, gallons, cubic feet, and more
                    </p>
                  </Card>
                </Link>
              </div>
            </section>
            
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Length Conversions</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Metric to Imperial Conversions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-2 text-left">From (Metric)</th>
                          <th className="border p-2 text-left">To (Imperial)</th>
                          <th className="border p-2 text-left">Formula</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">Millimeters (mm)</td>
                          <td className="border p-2">Inches (in)</td>
                          <td className="border p-2">mm ÷ 25.4 = in</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Centimeters (cm)</td>
                          <td className="border p-2">Inches (in)</td>
                          <td className="border p-2">cm ÷ 2.54 = in</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Meters (m)</td>
                          <td className="border p-2">Feet (ft)</td>
                          <td className="border p-2">m × 3.28084 = ft</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Meters (m)</td>
                          <td className="border p-2">Yards (yd)</td>
                          <td className="border p-2">m × 1.09361 = yd</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Kilometers (km)</td>
                          <td className="border p-2">Miles (mi)</td>
                          <td className="border p-2">km × 0.621371 = mi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Imperial to Metric Conversions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-2 text-left">From (Imperial)</th>
                          <th className="border p-2 text-left">To (Metric)</th>
                          <th className="border p-2 text-left">Formula</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">Inches (in)</td>
                          <td className="border p-2">Millimeters (mm)</td>
                          <td className="border p-2">in × 25.4 = mm</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Inches (in)</td>
                          <td className="border p-2">Centimeters (cm)</td>
                          <td className="border p-2">in × 2.54 = cm</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Feet (ft)</td>
                          <td className="border p-2">Meters (m)</td>
                          <td className="border p-2">ft × 0.3048 = m</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Yards (yd)</td>
                          <td className="border p-2">Meters (m)</td>
                          <td className="border p-2">yd × 0.9144 = m</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Miles (mi)</td>
                          <td className="border p-2">Kilometers (km)</td>
                          <td className="border p-2">mi × 1.60934 = km</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Area Conversions</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">From</th>
                      <th className="border p-2 text-left">To</th>
                      <th className="border p-2 text-left">Formula</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Square Meters (m²)</td>
                      <td className="border p-2">Square Feet (ft²)</td>
                      <td className="border p-2">m² × 10.7639 = ft²</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Square Feet (ft²)</td>
                      <td className="border p-2">Square Meters (m²)</td>
                      <td className="border p-2">ft² × 0.092903 = m²</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Acres</td>
                      <td className="border p-2">Hectares (ha)</td>
                      <td className="border p-2">acres × 0.404686 = ha</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Hectares (ha)</td>
                      <td className="border p-2">Acres</td>
                      <td className="border p-2">ha × 2.47105 = acres</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Square Kilometers (km²)</td>
                      <td className="border p-2">Square Miles (mi²)</td>
                      <td className="border p-2">km² × 0.386102 = mi²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Volume Conversions</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">From</th>
                      <th className="border p-2 text-left">To</th>
                      <th className="border p-2 text-left">Formula</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Liters (L)</td>
                      <td className="border p-2">US Gallons (gal)</td>
                      <td className="border p-2">L × 0.264172 = gal</td>
                    </tr>
                    <tr>
                      <td className="border p-2">US Gallons (gal)</td>
                      <td className="border p-2">Liters (L)</td>
                      <td className="border p-2">gal × 3.78541 = L</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Cubic Meters (m³)</td>
                      <td className="border p-2">Cubic Feet (ft³)</td>
                      <td className="border p-2">m³ × 35.3147 = ft³</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Cubic Feet (ft³)</td>
                      <td className="border p-2">Cubic Meters (m³)</td>
                      <td className="border p-2">ft³ × 0.0283168 = m³</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Milliliters (mL)</td>
                      <td className="border p-2">US Fluid Ounces (fl oz)</td>
                      <td className="border p-2">mL × 0.033814 = fl oz</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CommonConversions;
