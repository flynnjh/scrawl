// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { thoughtRouter } from "./thought";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("thought.", thoughtRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
