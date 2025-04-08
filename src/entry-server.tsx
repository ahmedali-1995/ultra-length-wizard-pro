
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { renderToString } from 'react-dom/server';

export function render(url: string) {
  // Try-catch to avoid server crashes on rendering errors
  try {
    // Create minimal mocks for browser-only APIs
    if (typeof window === 'undefined') {
      // Only apply the minimal mocks needed for SSR
      global.localStorage = {
        getItem: () => null,
        setItem: () => {},
      } as any;
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
