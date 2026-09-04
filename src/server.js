import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from '@hono/node-server';

const app = new Hono();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const frontendOrigin = process.env.CLIENT_URL ?? "http://localhost:5173";

// Config
app.use("/api/*", cors({
      origin: frontendOrigin,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
   })
);

// Health
app.get("/api/health", (c) => {
   return c.json({
      status: "ok",
      message:
         "Backend is connected! Visit https://vercel.com/docs/frameworks/backend/hono to learn more.",
      timestamp: new Date().toISOString(),
   });
});

// Start
serve({ fetch: app.fetch, port: SERVER_PORT }, (info) => {
   console.log(`Node server started on port: ${info.port}`)
 });

export default app;
