
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { renderToString } from 'react-dom/server'

// This helps with SSR by providing a simulated environment for components
// that might rely on browser-only APIs
if (typeof window === 'undefined') {
  // Use a simplified mocking approach with type assertion
  // This avoids TypeScript errors while providing minimal mocks
  global.window = {
    matchMedia: () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
    document: {},
    navigator: { userAgent: '' },
    location: { pathname: '/' },
  } as any;
  
  global.document = {
    documentElement: { classList: { add: () => {}, remove: () => {} } },
    createElement: () => ({}),
    querySelector: () => null,
  } as any;
}

export function render(url: string, context = {}) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
  
  return html
}
