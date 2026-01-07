import { defineConfig } from 'vite';
import type { ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'node:path';
import viteCompression from 'vite-plugin-compression';
import type { IncomingMessage, ServerResponse } from 'node:http';
import sitemap from 'vite-plugin-sitemap';
import { routes } from './src/ssg.routes.ts';

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    sitemap({
      hostname: 'https://www.velobar.de',
      dynamicRoutes: routes,
      generateRobotsTxt: false, // Prevent conflict with manual robots.txt
    }),
    // Gzip compression for production
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Brotli compression for production
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    {
      name: 'image-optimization-handler',
      configureServer(server) {
        server.middlewares.use('/api/optimize-image', async (req, res) => {
          try {
            const handler = (await import('./src/api/optimize-image.ts')).handler;
            const response = await handler(req as unknown as Request);

            // Forward the response headers
            for (const [key, value] of response.headers.entries()) {
              res.setHeader(key, value);
            }

            // Send the response
            res.statusCode = response.status;
            res.end(Buffer.from(await response.arrayBuffer()));
          } catch (error) {
            console.error('Image optimization error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Image optimization failed' }));
          }
        });
      },
    },
    {
      name: 'api-dev-handler',
      configureServer(server: ViteDevServer) {
        // Bridge Dev -> Local serverless handlers for API routes
        type RequestWithBody = IncomingMessage & { body?: unknown };
        type NodeHandler = (
          req: RequestWithBody,
          res: ServerResponse,
        ) => unknown | Promise<unknown>;

        const attachNodeHandler = (route: string, modulePath: string): void => {
          server.middlewares.use(route, async (req, res) => {
            try {
              const mod = (await import(modulePath)) as Record<string, unknown>;
              const exported = mod as { default?: unknown; handler?: unknown };
              const candidate = (exported.default ?? exported.handler ?? exported) as unknown;
              if (typeof candidate !== 'function') throw new Error('Invalid API handler export');
              const handler = candidate as NodeHandler;

              const nodeReq = req as RequestWithBody;
              const nodeRes = res as ServerResponse;

              const vercelRes = nodeRes as ServerResponse & {
                status?: (code: number) => unknown;
                json?: (data: unknown) => void;
                send?: (data: unknown) => void;
              };

              if (typeof vercelRes.status !== 'function') {
                vercelRes.status = (code: number) => {
                  vercelRes.statusCode = code;
                  return vercelRes;
                };
              }

              if (typeof vercelRes.json !== 'function') {
                vercelRes.json = (data: unknown) => {
                  if (!vercelRes.getHeader('Content-Type')) {
                    vercelRes.setHeader('Content-Type', 'application/json');
                  }
                  vercelRes.end(JSON.stringify(data));
                };
              }

              if (typeof vercelRes.send !== 'function') {
                vercelRes.send = (data: unknown) => {
                  if (data instanceof Uint8Array || Buffer.isBuffer(data)) {
                    vercelRes.end(data);
                    return;
                  }
                  vercelRes.end(typeof data === 'string' ? data : JSON.stringify(data));
                };
              }

              // Populate req.body similar to Vercel runtime for POST/PUT/PATCH/DELETE
              const method = (nodeReq.method || 'GET').toUpperCase();
              if (method !== 'GET' && method !== 'HEAD') {
                const chunks: Uint8Array[] = [];
                await new Promise<void>((resolve) => {
                  nodeReq.on('data', (c: Uint8Array) => chunks.push(c));
                  nodeReq.on('end', () => resolve());
                  nodeReq.on('error', () => resolve());
                });
                const raw = Buffer.concat(chunks).toString('utf-8');
                const contentTypeHeader = nodeReq.headers['content-type'];
                const contentType = Array.isArray(contentTypeHeader)
                  ? (contentTypeHeader[0] ?? '')
                  : (contentTypeHeader ?? '');

                if (contentType.includes('application/json')) {
                  try {
                    nodeReq.body = raw ? JSON.parse(raw) : {};
                  } catch {
                    nodeReq.body = {};
                  }
                } else if (contentType.includes('application/x-www-form-urlencoded')) {
                  const params = new URLSearchParams(raw);
                  const obj: Record<string, string> = {};
                  params.forEach((v, k) => {
                    obj[k] = v;
                  });
                  nodeReq.body = obj;
                } else {
                  nodeReq.body = raw;
                }
              }

              // Call Node-style handler(req, res)
              return handler(nodeReq, vercelRes);
            } catch (error) {
              console.error(`API handler error for ${route}:`, error);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: 'API handler failed' }));
            }
          });
        };
        attachNodeHandler('/api/booking', path.resolve(__dirname, './api/booking.js'));
        attachNodeHandler('/api/contact', path.resolve(__dirname, './api/contact.js'));
        attachNodeHandler('/api/health', path.resolve(__dirname, './api/health.js'));
        attachNodeHandler(
          '/api/email/sendgrid',
          path.resolve(__dirname, './api/email/sendgrid.js'),
        );
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/foundation': path.resolve(__dirname, './src/foundation'),
      '@core': path.resolve(__dirname, './src/core'),
      scheduler: path.resolve(__dirname, './node_modules/scheduler/index.js'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    dedupe: ['react', 'react-dom', 'scheduler'],
  },
  base: '/',
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: false, // Do not block UI with error overlay
    },
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apps.rokt.com; connect-src 'self' ws: wss: https://apps.rokt.com https://apps-demo.rokt.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://apps.rokt.com; img-src 'self' data: blob: https://*; frame-src 'self'; base-uri 'self'; form-action 'self'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  preview: {
    port: 4173,
    // Note: overlay is only for dev server; preview serves built assets
    headers: {
      // Relaxed CSP for debugging
      'Content-Security-Policy':
        "default-src 'self' https: http: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: blob:; style-src 'self' 'unsafe-inline' https: http:; img-src 'self' data: https: http: blob:; font-src 'self' data: https: http:; frame-src 'self' https: http:; connect-src 'self' https: http: ws: wss:; worker-src 'self' blob:; child-src 'self' blob: https: http:;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    cssCodeSplit: true,
    minify: 'terser', // Use terser for better compression
    cssMinify: true, // Enable CSS minification for production
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Explicitly group React, ReactDOM, and Scheduler
          if (/node_modules[\/](react|react-dom|scheduler)[\/]/.test(id)) {
            return 'vendor';
          }

          // Keep react-router packages with React to avoid circular chunk deps
          if (/node_modules[\/](react-router|react-router-dom|@remix-run\/router)[\/]/.test(id)) {
            return 'vendor';
          }

          // Animation libraries - separate for lazy loading
          if (id.includes('gsap')) {
            return 'vendor-animations';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-framer';
          }

          // Other vendor packages
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('date-fns')) {
              return 'vendor-date';
            }
            if (id.includes('zod')) {
              return 'vendor-validation';
            }
            if (id.includes('axios')) {
              return 'vendor-http';
            }
            if (id.includes('react-day-picker')) {
              return 'vendor-datepicker';
            }
            return 'vendor';
          }
          if (id.includes('/components/ui/')) {
            return 'ui';
          }
          if (id.includes('/components/primitives/')) {
            return 'primitives';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
});