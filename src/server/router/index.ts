import { bookmarkRouter } from "./bookmark";
import { createRouter } from "./context";
import superjson from "superjson";
import { thoughtRouter } from "./thought";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("thought.", thoughtRouter)
  .merge("user.", userRouter)
  .merge("bookmark.", bookmarkRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
