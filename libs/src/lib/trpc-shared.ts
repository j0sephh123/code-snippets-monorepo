import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';

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
});

export function trpcShared(): string {
  return 'trpc-shared';
}

// export type definition of API
export type AppRouter = typeof appRouter;
