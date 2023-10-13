import { AppRouter } from '@joseph/trpc-shared';

export type GetAllSnippetsSingle =
  AppRouter['getSnippets']['_def']['_output_in'][number];
