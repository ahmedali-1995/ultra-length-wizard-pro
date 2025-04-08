
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  
  // Add compression middleware
  app.use(compression());

  // Serve static assets
  app.use(
    serveStatic(path.resolve(__dirname, 'dist/client'), {
      index: false,
      maxAge: '1y', // Cache static assets for 1 year
    })
  );

  // Handle all routes
  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // 1. Read the production index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      );

      try {
        // 2. Load the SSR entry module
        const { render } = await import('./dist/server/entry-server.js');

        // 3. Render the app HTML
        const appHtml = await render(url);

        // 4. Inject the app-rendered HTML into the template
        const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

        // 5. Send the rendered HTML back
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (ssrError) {
        console.error("SSR rendering failed:", ssrError);
        
        // If SSR fails, fall back to client-side rendering
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      }
    } catch (err) {
      console.error("Server error:", err);

      // Send fallback HTML for client-side rendering
      try {
        const fallbackHtml = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(fallbackHtml);
      } catch (readError) {
        res.status(500).send('Internal Server Error');
      }
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Production server running at http://localhost:${PORT}`);
  });
}

createServer();
