import { trpcShared } from './trpc-shared';

describe('trpcShared', () => {
  it('should work', () => {
    expect(trpcShared()).toEqual('trpc-shared');
  });
});
