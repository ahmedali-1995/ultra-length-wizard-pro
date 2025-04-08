
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { renderToString } from 'react-dom/server';

export function render(url: string) {
  try {
    // Create a simplified version of the app for server rendering
    // that minimizes client/server differences
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
