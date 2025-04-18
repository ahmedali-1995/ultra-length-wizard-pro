
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      );

      // 2. Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template);

      try {
        // 3. Load the server entry
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

        try {
          // 4. Render the app HTML
          const appHtml = await render(url);

          // 5. Inject the app-rendered HTML into the template
          const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

          // 6. Send the rendered HTML back
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (ssrError) {
          console.error("SSR render error:", ssrError);
          // Fall back to client-side rendering if SSR fails
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        }
      } catch (e) {
        // If an error is caught, let Vite fix the stack trace
        vite.ssrFixStacktrace(e);
        console.error("Server error:", e);
        
        // Send fallback HTML for client-side rendering
        const fallbackHTML = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        res.status(200).set({ 'Content-Type': 'text/html' }).end(fallbackHTML);
      }
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error("Server error:", e);
      next(e);
    }
  });

  app.listen(5173, () => {
    console.log('Server is running at http://localhost:5173');
  });
}

createServer();
