import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import * as path from 'path';
import { appRouter, trpcShared } from '@joseph/trpc-shared';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({
      prisma: new PrismaClient(),
    }),
  })
);

app.get('/api', (_req, res) => {
  res.send({ message: 'Welcome to api!', fromTrpcShared: trpcShared() });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
