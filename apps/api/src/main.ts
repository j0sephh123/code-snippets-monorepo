import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import * as path from 'path';
import { appRouter } from '@joseph/trpc-shared';
import { DataSource } from '@joseph/prisma-shared';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({
      dataSource: new DataSource(),
    }),
  })
);

app.get('/api', (_req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
