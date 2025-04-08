
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { renderToString } from 'react-dom/server';

export function render(url: string) {
  // Try-catch to avoid server crashes on rendering errors
  try {
    // Create minimal mocks for browser-only APIs
    if (typeof window === 'undefined') {
      // Do not create any global browser mocks to avoid hydration issues
      // React will handle missing browser APIs appropriately during hydration
    }
    
    const html = renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    );
    
    return html;
  } catch (error) {
    console.error("Server rendering error:", error);
    // Return empty div as fallback when SSR fails
    return '<div id="root"></div>';
  }
}
