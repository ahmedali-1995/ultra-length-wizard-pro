
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import UnitConverter from '@/components/UnitConverter';
import Footer from '@/components/Footer';
import { updateSEO } from '@/utils/seoUtils';

const Index = () => {
  useEffect(() => {
    updateSEO();
  }, []);

  return (
    <>
      <Helmet>
        <title>UltraLength Wizard Pro - Advanced Length Converter Tool</title>
        <meta name="description" content="Convert between any length units with this advanced, user-friendly conversion tool. Support for metric, imperial, astronomical and ancient units." />
        <meta name="keywords" content="length converter, unit converter, meter to feet, metric conversion, imperial units, distance calculator, measurement tool" />
        <meta property="og:title" content="UltraLength Wizard Pro - Advanced Length Converter Tool" />
        <meta property="og:description" content="Convert between any length units with this advanced, user-friendly conversion tool." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UltraLength Wizard Pro - Advanced Length Converter Tool" />
        <meta name="twitter:description" content="Convert between any length units with this advanced, user-friendly conversion tool." />
        <link rel="canonical" href="https://ultralength.lovable.app" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <header className="py-8 md:py-12 container">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-primary bg-clip-text text-transparent">
              UltraLength Wizard Pro
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              The most advanced length converter with support for metric, imperial, astronomical, and ancient units.
            </p>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="grid gap-8">
            <section>
              <UnitConverter />
            </section>
            
            <section className="mt-10 space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight">Why Use UltraLength Wizard Pro?</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">Comprehensive Coverage</h3>
                  <p className="text-sm text-muted-foreground">
                    From nanometers to light-years, convert between any units of length instantly.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">High Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Get results with scientific precision for all your professional needs.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">User Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Intuitive interface with instant results and conversion history tracking.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mt-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-4">About Length Units</h2>
              <div className="prose prose-sm max-w-none">
                <p>
                  Length is a fundamental measurement that describes the distance between two points.
                  Throughout history, different civilizations developed their own units of length,
                  often based on parts of the human body or common objects.
                </p>
                <p>
                  Today, the International System of Units (SI) uses the meter as the standard unit of length,
                  defined as the distance light travels in a vacuum in 1/299,792,458 of a second.
                  However, many countries still use imperial units like feet and inches in daily life.
                </p>
                <p>
                  UltraLength Wizard Pro supports both modern and historical units, making it the perfect
                  tool for students, professionals, and anyone who needs to convert between different length measurements.
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
