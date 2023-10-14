import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { DataSource } from '@joseph/prisma-shared';
import { identifyCodeType } from '@joseph/code-utils';
import {
  FORM_DESCRIPTION_MAX_LENGTH,
  FORM_CODE_MAX_LENGTH,
  FORM_DESCRIPTION_MIN_LENGTH,
  FORM_CODE_MIN_LENGTH,
} from '@joseph/config';

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
        code: z.string().min(FORM_CODE_MIN_LENGTH).max(FORM_CODE_MAX_LENGTH),
        description: z
          .string()
          .min(FORM_DESCRIPTION_MIN_LENGTH)
          .max(FORM_DESCRIPTION_MAX_LENGTH),
      })
    )
    .mutation(async ({ input: { code, description }, ctx }) => {
      const codeType = identifyCodeType(code);

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
  updateSnippetDescription: trpc.procedure
    .input(
      z.object({
        description: z
          .string()
          .min(FORM_DESCRIPTION_MIN_LENGTH)
          .max(FORM_DESCRIPTION_MAX_LENGTH),
        id: z.number(),
      })
    )
    .mutation(({ input: { description, id }, ctx }) => {
      return ctx.dataSource.updateSnippetDescription({
        id,
        description,
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
