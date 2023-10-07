import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { Language } from '@prisma/client';
import DataSource from 'shared/prisma-shared/src/lib/shared-prisma-shared';

export const trpc = initTRPC.context<{ dataSource: DataSource }>().create({
  // export const trpc = initTRPC.create({
  transformer: superjson,
  isServer: true,
});

export const appRouter = trpc.router({
  getSnippets: trpc.procedure.query(async ({ ctx }) =>
    ctx.dataSource.getAllSnippets()
  ),
  createSnippet: trpc.procedure
    .input(
      z.object({
        code: z.string().min(1).max(255),
        language: z.nativeEnum(Language),
        description: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ input: { code, language, description }, ctx }) =>
      ctx.dataSource.createSnippet({
        code,
        description,
        language,
      })
    ),
});

export function trpcShared(): string {
  return 'trpc-shared';
}

// export type definition of API
export type AppRouter = typeof appRouter;
