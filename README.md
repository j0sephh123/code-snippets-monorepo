# Code Snippets Monorepo

## Commands cheatsheet

- serve all projects
  `npx nx run-many --target=serve`

- prisma generate is a bit different due to **nx** workspaces
  `npx prisma generate --schema=shared/prisma-shared/prisma/schema.prisma`

- push to db
  `npx prisma db push --schema=./shared/prisma-shared/prisma/schema.prisma`

- generate types from schema
  `npx prisma generate --schema=./shared/prisma-shared/prisma/schema.prisma`

- prisma studio  
  `npx prisma studio --schema=./shared/prisma-shared/prisma/schema.prisma`

- test ui
  `npx nx run ui:test --watch`

- coverage
  `npx nx run ui:test --watch --coverage`

- test code-utils
  `npx nx run code-utils:test --watch`

## apps folder explanation

- `ui` - React setup with Vite
