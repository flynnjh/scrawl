import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("updateName", {
    input: z.object({
      userId: z.string(),
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!input.name) {
        throw new Error("name is a required field");
      }
      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          name: input.name,
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
  })
  .mutation("delete", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.delete({
        where: { id: input.userId },
      });
    },
  });
