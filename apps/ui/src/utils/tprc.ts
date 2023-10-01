import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@joseph/trpc-shared'

export const trpc = createTRPCReact<AppRouter>();
