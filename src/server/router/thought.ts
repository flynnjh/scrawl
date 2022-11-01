import { DateTime, Duration } from "luxon";

import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const thoughtRouter = createRouter()
  .mutation("create", {
    input: z.object({
      text: z.string().min(1),
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
  .mutation("delete", {
    input: z.object({
      id: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const thought = await ctx.prisma.thought.findUnique({
        where: { id: input.id },
      });

      if (thought?.userId !== input.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return await ctx.prisma.thought.delete({
        where: {
          id: input.id,
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
        include: { user: true, bookmark: true },
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
        include: { user: true, bookmark: true },
        orderBy: { createdAt: "desc" },
      });
    },
  })
  .query("getRecentThoughts", {
    input: z.object({
      userId: z.string(),
      thoughtDate: z.date(),
      days: z.number().default(3),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.thought.findMany({
        take: 6,
        where: {
          createdAt: {
            lte: input.thoughtDate,
            gte: DateTime.fromJSDate(input.thoughtDate)
              .minus(Duration.fromObject({ days: input.days }))
              .toJSDate(),
          },
          userId: input.userId,
        },
        orderBy: { createdAt: "desc" },
        include: { user: true },
      });
    },
  });
