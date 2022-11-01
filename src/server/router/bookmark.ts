import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const bookmarkRouter = createRouter()
  .mutation("create", {
    input: z.object({
      thoughtId: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const thought = await ctx.prisma.thought.findUnique({
        where: { id: input.thoughtId },
      });

      if (thought?.userId !== input.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return await ctx.prisma.bookmark.create({
        data: {
          thoughtId: input.thoughtId,
          userId: input.userId,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      bookmarkId: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const bookmark = await ctx.prisma.bookmark.findUnique({
        where: { id: input.bookmarkId },
      });

      if (bookmark?.userId !== input.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return await ctx.prisma.bookmark.delete({
        where: {
          id: input.bookmarkId,
        },
      });
    },
  })
  // .query("getById", {
  //   input: z.object({
  //     id: z.string(),
  //     userId: z.string(),
  //   }),
  //   async resolve({ ctx, input }) {
  //     const thought = await ctx.prisma.thought.findUnique({
  //       where: { id: input.id },
  //       include: { user: true },
  //     });
  //     // if (thought?.userId !== input.userId) {
  //     //   throw new TRPCError({
  //     //     code: "UNAUTHORIZED",
  //     //   });
  //     // } else {
  //     //   return thought;
  //     // }
  //     return thought;
  //   },
  // })
  .query("getAllbyUser", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.bookmark.findMany({
        where: { userId: input.userId as string },
        include: { User: true, thought: true },
        orderBy: { createdAt: "desc" },
      });
    },
  });
