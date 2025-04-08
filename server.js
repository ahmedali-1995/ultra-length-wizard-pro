
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Set up global browser API mocks for server-side rendering
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

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )

      // 2. Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      // 4. Render the app HTML
      const appHtml = await render(url)

      // 5. Inject the app-rendered HTML into the template
      const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)

      // 6. Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173, () => {
    console.log('Server is running at http://localhost:5173')
  })
}

createServer()
