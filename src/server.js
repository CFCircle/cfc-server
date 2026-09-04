import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from '@hono/node-server';

const app = new Hono();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const localOrigin = process.env.CLIENT_LOCAL_URL;
const productionOrigin = process.env.CLIENT_PRODUCTION_URL;

const allowedOrigins = [
   localOrigin,
   productionOrigin
];

// Config
app.use("/api/*", cors({
      origin: (origin) => {
         return allowedOrigins.includes(origin) ? origin : "";
      },
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
