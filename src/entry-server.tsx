
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { renderToString } from 'react-dom/server'

// This helps with SSR by providing a simulated environment for components
// that might rely on browser-only APIs
if (typeof window === 'undefined') {
  // @ts-ignore - We're deliberately creating partial mock objects for SSR
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
      getItem: () => null,
      setItem: () => null,
      length: 0,
      clear: () => {},
      key: () => null,
      removeItem: () => {}
    }
  };

  // @ts-ignore - We're deliberately creating partial mock objects for SSR
  global.document = {
    // Create a minimal HTMLElement-like object with the properties we need
    documentElement: {
      classList: {
        add: () => {},
        remove: () => {},
        length: 0,
        value: '',
        contains: () => false,
        item: () => null,
        toggle: () => false,
        replace: () => false,
        supports: () => false,
        entries: () => [][Symbol.iterator](),
        forEach: () => {},
        keys: () => [][Symbol.iterator](),
        values: () => [][Symbol.iterator](),
        toString: () => '',
        [Symbol.iterator]: () => [][Symbol.iterator]()
      },
      // Add minimum required HTMLElement properties
      nodeName: 'HTML',
      nodeType: 1,
      tagName: 'HTML',
      localName: 'html',
      ownerDocument: {},
      namespaceURI: 'http://www.w3.org/1999/xhtml',
      getAttribute: () => null,
      setAttribute: () => {},
      hasAttribute: () => false,
      removeAttribute: () => {},
      style: {}
    }
  };
}

export function render(url: string, context = {}) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
