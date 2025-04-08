
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { renderToString } from 'react-dom/server';

// Create minimal mock objects for SSR
// Using 'any' type to avoid TypeScript errors with DOM API mocks
if (typeof window === 'undefined') {
  // Create minimal mocks that won't interfere with hydration
  global.window = {} as any;
  global.document = {
    createElement: () => ({}),
    querySelector: () => null
  } as any;
  
  // Don't try to mock anything else to avoid hydration mismatches
}

export function render(url: string) {
  // Try-catch to avoid server crashes on rendering errors
  try {
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
