

import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from '@hono/node-server';

const app = new Hono();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const localOrigin = process.env.CLIENT_LOCAL_URL ?? "http://localhost:5173";
const productionOrigin = process.env.CLIENT_PRODUCTION_URL;


const allowedOrigins = [
   localOrigin,
   productionOrigin
];

const frontendOrigin = process.env.CLIENT_LOCAL_URL ?? "http://localhost:5173";

// Config
app.use('/api/*', cors({
      origin: (origin) => {
         return allowedOrigins.includes(origin) ? origin : null
      },
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      // exposeHeaders: ['Content-Length'],
      // credentials: true,      // required if your frontend sends cookies or Auth headers
      // maxAge: 600,            // how long browsers cache the preflight response (seconds)
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
