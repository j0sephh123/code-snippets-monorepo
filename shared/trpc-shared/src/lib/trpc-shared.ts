import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { prismaCreatePost, prismaGetAllPosts } from '@joseph/prisma-shared';

export const trpc = initTRPC.create({
  transformer: superjson,
  isServer: true,
});

export const appRouter = trpc.router({
  getUser: trpc.procedure.input(z.string()).query((opts) => {
    return { id: opts.input, name: 'Bilbo' };
  }),
  demo: trpc.procedure.query(() => {
    return { from: 'demo route' };
  }),
  fromPrisma: trpc.procedure.query(async () => {
    const posts = await prismaGetAllPosts();

    return posts;
  }),
  createPost: trpc.procedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
      })
    )
    .mutation(({ input: { title } }) => prismaCreatePost(title)),
});

export function trpcShared(): string {
  return 'trpc-shared';
}

// export type definition of API
export type AppRouter = typeof appRouter;
