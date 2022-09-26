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
// .query("getAllbyUser", {
//   input: z.object({
//     userId: z.string(),
//   }),
//   async resolve({ ctx, input }) {
//     return await ctx.prisma.thought.findMany({
//       where: { userId: input.userId as string },
//       include: { user: true },
//     });
//   },
// });
