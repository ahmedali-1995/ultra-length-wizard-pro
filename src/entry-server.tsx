
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { renderToString } from 'react-dom/server'

// This helps with SSR by providing a simulated environment for components
// that might rely on browser-only APIs
global.window = global.window || {}
global.document = global.document || {
  documentElement: {
    classList: {
      add: () => {},
      remove: () => {}
    }
  }
}
global.localStorage = global.localStorage || {
  getItem: () => null,
  setItem: () => null
}

export function render(url: string, context = {}) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
