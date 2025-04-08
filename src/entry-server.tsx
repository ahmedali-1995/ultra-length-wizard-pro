
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { renderToString } from 'react-dom/server'

// This helps with SSR by providing a simulated environment for components
// that might rely on browser-only APIs
if (typeof window === 'undefined') {
  // Use a simpler approach - just define empty objects for browser APIs
  // and then cast them as any to avoid TypeScript errors
  global.window = {
    matchMedia: () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
    innerWidth: 1024,
    localStorage: {
      getItem: (key) => null,
      setItem: () => {},
      length: 0,
      clear: () => {},
      key: () => null,
      removeItem: () => {}
    },
    // Add other frequently used window properties as needed
  } as any;

  // Create a simple document mock
  global.document = {
    documentElement: {},
    head: {},
    body: {},
    createElement: () => ({}),
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
    getElementById: () => null,
  } as any;
}

export function render(url: string, context = {}) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
