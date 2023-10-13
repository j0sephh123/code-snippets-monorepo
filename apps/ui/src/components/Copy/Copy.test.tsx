import { screen, fireEvent, waitFor } from '@testing-library/react';
import Copy from './Copy';
import { renderWithProvider } from '../../tests/renderUtils';

describe('components > Copy', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  it('renders', async () => {
    const { asFragment } = renderWithProvider(
      <Copy onClick={() => undefined} className="className" />,
      { provider: 'mantine' }
    );

    const btn = screen.getByRole('button');

    fireEvent.mouseOver(btn);

    await waitFor(() => {
      // screen.debug();
      // expect(screen.getByText('Copy').textContent).toBe(1);
    });

    expect(asFragment()).toMatchSnapshot();
  });
});

export {};
