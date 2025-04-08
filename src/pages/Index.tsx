
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import UnitConverter from '@/components/UnitConverter';
import Footer from '@/components/Footer';
import { updateSEO, addBreadcrumbSchema } from '@/utils/seoUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ConversionVisualizer from '@/components/ConversionVisualizer';

const Index = () => {
  useEffect(() => {
    updateSEO();
    // Add breadcrumb schema for homepage
    addBreadcrumbSchema([
      { name: "Home", url: "https://ultralength.lovable.app/" }
    ]);
  }, []);

  return (
    <>
      <Helmet>
        <title>UltraLength Wizard Pro - Advanced Unit Converter Tool</title>
        <meta name="description" content="Convert between any units with this advanced, user-friendly conversion tool. Support for metric, imperial, astronomical and ancient units." />
        <meta name="keywords" content="unit converter, length converter, area converter, volume converter, metric conversion, imperial units, distance calculator, measurement tool, precise unit conversion, scientific measurement, ancient units, astronomical units" />
        <meta property="og:title" content="UltraLength Wizard Pro - Advanced Unit Converter Tool" />
        <meta property="og:description" content="Convert between any units with this advanced, user-friendly conversion tool." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ultralength.lovable.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UltraLength Wizard Pro - Advanced Unit Converter Tool" />
        <meta name="twitter:description" content="Convert between any units with this advanced, user-friendly conversion tool." />
        <meta name="twitter:image" content="https://ultralength.lovable.app/twitter-card.jpg" />
        <link rel="canonical" href="https://ultralength.lovable.app" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="author" content="UltraLength Development Team" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <header className="py-8 md:py-12 container">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-primary bg-clip-text text-transparent">
              UltraLength Wizard Pro
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              The most advanced unit converter with support for length, area, volume, and more.
            </p>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="grid gap-8">
            <section>
              <Tabs defaultValue="converter" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="converter">Converter</TabsTrigger>
                  <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="converter" className="mt-0">
                  <UnitConverter />
                </TabsContent>
                
                <TabsContent value="visualizer" className="mt-0">
                  <Card className="p-6">
                    <ConversionVisualizer />
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
            
            <section className="mt-10 space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight">Our Specialized Conversion Tools</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Link to="/length-converter" className="no-underline">
                  <div className="p-4 border rounded-lg bg-card hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Length Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert between meters, feet, miles, and more with precision.
                    </p>
                  </div>
                </Link>
                
                <Link to="/area-converter" className="no-underline">
                  <div className="p-4 border rounded-lg bg-card hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Area Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert square meters, acres, hectares, and other area units.
                    </p>
                  </div>
                </Link>
                
                <Link to="/volume-converter" className="no-underline">
                  <div className="p-4 border rounded-lg bg-card hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Volume Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert cubic meters, gallons, liters, and more volume units.
                    </p>
                  </div>
                </Link>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/common-conversions" className="text-primary hover:underline">
                  View all common conversion tables →
                </Link>
              </div>
            </section>
            
            <section className="mt-10 space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight">Why Use UltraLength Wizard Pro?</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-card hover-card">
                  <h3 className="font-semibold mb-2">Multi-Dimensional</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert between length, area, volume, and more with precision and ease.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-card hover-card">
                  <h3 className="font-semibold mb-2">Visual Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    See the relative sizes and learn how different units compare visually.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-card hover-card">
                  <h3 className="font-semibold mb-2">Scientific Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Get results with scientific notation and custom precision for professional needs.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">About Measurement Units</h2>
              <div className="prose prose-sm max-w-none">
                <p>
                  Measurement is fundamental to understanding our world. Throughout history,
                  different civilizations developed their own systems of units, often based on
                  parts of the human body or common objects.
                </p>
                <p>
                  Today, the International System of Units (SI) provides standardized units for
                  scientific and everyday use worldwide. The meter (length), square meter (area),
                  and cubic meter (volume) are the base units for their respective dimensions.
                </p>
                <p>
                  UltraLength Wizard Pro supports both modern and historical units, making it the perfect
                  tool for students, professionals, engineers, scientists, and anyone who needs to convert
                  between different measurement systems.
                </p>
              </div>
            </section>
            
            {/* SEO-Optimized FAQ Section */}
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How accurate is UltraLength Wizard's conversion?</h3>
                  <p className="text-muted-foreground">
                    UltraLength Wizard provides precise unit conversions with customizable decimal precision up to 10 decimal places. 
                    Our calculations are based on standardized conversion factors to ensure accuracy for both everyday use and 
                    scientific applications.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">What types of units can I convert with UltraLength Wizard?</h3>
                  <p className="text-muted-foreground">
                    UltraLength Wizard supports length, area, and volume conversions across metric (meters, kilometers), 
                    imperial (feet, inches, yards), astronomical (light-years, parsecs), and historical unit systems 
                    (cubits, leagues). Whether you need everyday conversions or specialized scientific units, our tool has you covered.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Can I visualize the difference between units?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our Visualizer tab provides interactive visual comparisons between different units with real-world examples. 
                    This feature is particularly helpful for understanding the relative scale of different units, especially when 
                    dealing with very large or very small measurements.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How do I convert multiple units at once?</h3>
                  <p className="text-muted-foreground">
                    Use the Multi-Convert tab to convert a value to multiple units simultaneously. This feature is perfect for 
                    comparing results across different measurement systems or for generating comprehensive conversion tables for 
                    reports and documentation.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Link to="/common-conversions#faq" className="text-primary hover:underline">
                  See more frequently asked questions →
                </Link>
              </div>
            </section>
            
            {/* Common Conversion Table - Good for SEO */}
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
                      <td className="border p-2">Millimeters</td>
                      <td className="border p-2">Inches</td>
                      <td className="border p-2">0.0393701</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Meters</td>
                      <td className="border p-2">Feet</td>
                      <td className="border p-2">3.28084</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Kilometers</td>
                      <td className="border p-2">Miles</td>
                      <td className="border p-2">0.621371</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/common-conversions" className="text-primary hover:underline">
                  View all conversion tables →
                </Link>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
