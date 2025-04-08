
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

// Helper function to update both title and meta description
export const updateSEO = (fromUnit?: string, toUnit?: string): void => {
  updateDocumentTitle(fromUnit, toUnit);
  updateMetaDescription(fromUnit, toUnit);
};
