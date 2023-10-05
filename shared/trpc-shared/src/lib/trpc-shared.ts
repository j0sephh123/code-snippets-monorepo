import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { prismaCreatePost, prismaGetAllSnippets } from '@joseph/prisma-shared';
import { PrismaClient } from '@prisma/client';

export const createContext = (): { prisma: PrismaClient } => ({
  prisma: new PrismaClient(),
});
type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  isServer: true,
});

export const appRouter = trpc.router({
  getSnippets: trpc.procedure.query(({ ctx }) => ctx.prisma.snippet.findMany()),
  createPost: trpc.procedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
      })
    )
    .mutation(({ input: { title }, ctx }) => prismaCreatePost(title)),
});

export function trpcShared(): string {
  return 'trpc-shared';
}

// export type definition of API
export type AppRouter = typeof appRouter;
