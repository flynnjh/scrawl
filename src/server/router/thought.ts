import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const thoughtRouter = createRouter()
  .mutation("createThought", {
    input: z.object({
      text: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.thought.create({
        data: {
          text: input.text,
          userId: input.userId,
        },
      });
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const thought = await ctx.prisma.thought.findUnique({
        where: { id: input.id },
        include: { user: true },
      });
      // if (thought?.userId !== input.userId) {
      //   throw new TRPCError({
      //     code: "UNAUTHORIZED",
      //   });
      // } else {
      //   return thought;
      // }
      return thought;
    },
  })
  .query("getAllbyUser", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.thought.findMany({
        where: { userId: input.userId as string },
        include: { user: true },
      });
    },
  });
