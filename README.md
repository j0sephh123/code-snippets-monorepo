# Code Snippets Monorepo

## Commands cheatsheet

- serve `ui`
  `npx nx run ui:serve`

- serve `ui` and `api`
  `npx nx run-many --target=serve --projects=api,ui`

- prisma generate is a bit different due to **nx** workspaces
  `npx prisma generate --schema=shared/prisma-shared/prisma/schema.prisma`

## apps folder explanation

- `ui` - React setup with Vite
