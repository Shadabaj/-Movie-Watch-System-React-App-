import { render, screen } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([])
  });
});

afterEach(() => {
  jest.clearAllMocks();
  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete global.fetch;
  }
});

test('renders the catalog and watchlist navigation', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /watchlist/i })).toBeInTheDocument();
});
