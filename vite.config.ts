import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Dev-only plugin that responds to /mock endpoints with 200 JSON so
    // network activity is visible and successful in browser DevTools.
    {
      name: "dev-mock-endpoints",
      configureServer: (server: ViteDevServer) => {
        server.middlewares.use(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (req: any, res: any, next: (err?: any) => void) => {
            try {
              const r = req as { method?: string; url?: string };
              if (r.method === "POST" && r.url === "/mock/generate") {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({ text: "(mock) generated suggestion" })
                );
                return;
              }
              if (r.method === "POST" && r.url === "/mock/submit") {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({ ok: true, id: Date.now().toString() })
                );
                return;
              }
            } catch (err) {
              // log and continue to next middleware (use a safe console reference)
              const safeConsole = (globalThis as unknown as { console?: any })
                .console;
              safeConsole?.warn?.("dev-mock-endpoints error:", err);
            }
            next();
          }
        );
      },
    },
  ],
});
