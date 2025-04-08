
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import UnitConverter from '@/components/UnitConverter';
import Footer from '@/components/Footer';
import { updateSEO } from '@/utils/seoUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ConversionVisualizer from '@/components/ConversionVisualizer';

const Index = () => {
  useEffect(() => {
    updateSEO();
  }, []);

  return (
    <>
      <Helmet>
        <title>UltraLength Wizard Pro - Advanced Unit Converter Tool</title>
        <meta name="description" content="Convert between any units with this advanced, user-friendly conversion tool. Support for metric, imperial, astronomical and ancient units." />
        <meta name="keywords" content="unit converter, length converter, area converter, volume converter, metric conversion, imperial units, distance calculator, measurement tool, precise unit conversion, scientific measurement" />
        <meta property="og:title" content="UltraLength Wizard Pro - Advanced Unit Converter Tool" />
        <meta property="og:description" content="Convert between any units with this advanced, user-friendly conversion tool." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UltraLength Wizard Pro - Advanced Unit Converter Tool" />
        <meta name="twitter:description" content="Convert between any units with this advanced, user-friendly conversion tool." />
        <link rel="canonical" href="https://ultralength.lovable.app" />
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
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
