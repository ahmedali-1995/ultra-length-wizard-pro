
// Update document title with the current conversion operation
export const updateDocumentTitle = (from?: string, to?: string): void => {
  const baseTitle = "UltraLength Wizard - Advanced Length Converter Tool";
  
  if (from && to) {
    document.title = `Convert ${from} to ${to} - ${baseTitle}`;
  } else {
    document.title = baseTitle;
  }
};

// Update meta description based on the current conversion
export const updateMetaDescription = (from?: string, to?: string): void => {
  const baseDescription = "Convert between any length units with this advanced, user-friendly conversion tool. Support for metric, imperial, astronomical and ancient units.";
  const metaDescription = document.querySelector('meta[name="description"]');
  
  if (metaDescription) {
    if (from && to) {
      metaDescription.setAttribute(
        "content",
        `Convert ${from} to ${to} easily with our advanced length converter. Get precise conversions instantly with UltraLength Wizard.`
      );
    } else {
      metaDescription.setAttribute("content", baseDescription);
    }
  }
};

// Update canonical URL to avoid duplicate content issues
export const updateCanonicalUrl = (): void => {
  let canonicalUrl = document.querySelector('link[rel="canonical"]');
  const currentUrl = window.location.href.split('?')[0]; // Remove query parameters
  
  if (canonicalUrl) {
    canonicalUrl.setAttribute("href", currentUrl);
  } else {
    canonicalUrl = document.createElement('link');
    canonicalUrl.setAttribute("rel", "canonical");
    canonicalUrl.setAttribute("href", currentUrl);
    document.head.appendChild(canonicalUrl);
  }
};

// Update schema markup for rich results
export const addSchemaMarkup = (fromUnit?: string, toUnit?: string): void => {
  // Remove any existing schema
  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UltraLength Wizard - Length Converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": fromUnit && toUnit 
      ? `Convert ${fromUnit} to ${toUnit} with our free online length converter tool.` 
      : "Free online length conversion tool supporting metric, imperial, astronomical and ancient units."
  };
  
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.text = JSON.stringify(schema);
  document.head.appendChild(scriptTag);
};

// Update Open Graph and Twitter meta tags for better social sharing
export const updateSocialMetaTags = (fromUnit?: string, toUnit?: string): void => {
  const title = fromUnit && toUnit
    ? `Convert ${fromUnit} to ${toUnit} - UltraLength Wizard`
    : "UltraLength Wizard - Advanced Length Converter Tool";
    
  const description = fromUnit && toUnit
    ? `Convert ${fromUnit} to ${toUnit} easily with our advanced length converter. Get precise conversions instantly.`
    : "Convert between any length units with this advanced, user-friendly conversion tool.";
  
  // Update Open Graph tags
  updateMetaTag("og:title", title);
  updateMetaTag("og:description", description);
  updateMetaTag("og:type", "website");
  updateMetaTag("og:url", window.location.href);
  
  // Update Twitter tags
  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", description);
};

// Helper function to update or create meta tags
const updateMetaTag = (name: string, content: string): void => {
  const selector = name.startsWith('og:') 
    ? `meta[property="${name}"]` 
    : `meta[name="${name}"]`;
  
  const metaTag = document.querySelector(selector);
  
  if (metaTag) {
    if (name.startsWith('og:')) {
      metaTag.setAttribute("property", name);
    } else {
      metaTag.setAttribute("name", name);
    }
    metaTag.setAttribute("content", content);
  } else {
    const newTag = document.createElement('meta');
    if (name.startsWith('og:')) {
      newTag.setAttribute("property", name);
    } else {
      newTag.setAttribute("name", name);
    }
    newTag.setAttribute("content", content);
    document.head.appendChild(newTag);
  }
};

// Helper function to update all SEO elements at once
export const updateSEO = (fromUnit?: string, toUnit?: string): void => {
  updateDocumentTitle(fromUnit, toUnit);
  updateMetaDescription(fromUnit, toUnit);
  updateCanonicalUrl();
  addSchemaMarkup(fromUnit, toUnit);
  updateSocialMetaTags(fromUnit, toUnit);
};

