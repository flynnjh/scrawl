import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("updateUsername", {
    input: z.object({
      userId: z.string(),
      username: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!input.username) {
        throw new Error("Username is a required field");
      }
      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          username: input.username,
        },
      });
    },
  })
  .query("getUserById", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });
    },
  });
