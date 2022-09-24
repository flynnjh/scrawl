// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { thoughtRouter } from "./thought";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("thought.", thoughtRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
