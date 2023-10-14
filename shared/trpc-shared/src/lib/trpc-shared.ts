import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { DataSource } from '@joseph/prisma-shared';
import { identifyCodeType } from '@joseph/code-utils';

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
        description: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ input: { code, description }, ctx }) => {
      const codeType = identifyCodeType(code);
      console.log({ code, description, codeType });

      if (!codeType) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to parse code snippet',
        });
      }

      return ctx.dataSource.createSnippet({
        code,
        description,
        language: codeType,
      });
    }),
  getOneSnippet: trpc.procedure
    .input(z.number())
    .query(async ({ ctx, input: id }) => ctx.dataSource.getOneSnippet(id)),
  deleteSnippet: trpc.procedure
    .input(z.number())
    .mutation(async ({ ctx, input: id }) => ctx.dataSource.deleteSnippet(id)),
});

export function trpcShared(): string {
  return 'trpc-shared';
}

// export type definition of API
export type AppRouter = typeof appRouter;
