
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { renderToString } from 'react-dom/server';

// This helps with SSR by providing a simulated environment for components
// that might rely on browser-only APIs
if (typeof window === 'undefined') {
  // Simplify mocks to only the absolute minimum required
  global.window = {} as any;
  global.document = {
    createElement: () => ({}),
    querySelector: () => null
  } as any;
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
