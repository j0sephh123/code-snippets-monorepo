import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { PrismaClient, Language } from '@prisma/client';

export const createContext = (): { prisma: PrismaClient } => ({
  prisma: new PrismaClient(),
});
type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  isServer: true,
});

export const appRouter = trpc.router({
  getSnippets: trpc.procedure.query(async ({ ctx }) => {
    const snippets = await ctx.prisma.snippet.findMany();

    console.log(snippets);

    return snippets;
  }),
  createSnippet: trpc.procedure
    .input(
      z.object({
        code: z.string().min(1).max(255),
        language: z.nativeEnum(Language),
        description: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ input: { code, language, description }, ctx }) => {
      const createdPost = await ctx.prisma.snippet.create({
        data: {
          code,
          language,
          description,
          authorId: 1,
        },
      });

      return createdPost;
    }),
});

export function trpcShared(): string {
  return 'trpc-shared';
}

// export type definition of API
export type AppRouter = typeof appRouter;
