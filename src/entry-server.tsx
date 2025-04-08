
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { renderToString } from 'react-dom/server';

export function render(url: string) {
  try {
    // Render the app with minimal server configuration
    // No browser APIs are mocked to avoid hydration mismatches
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
