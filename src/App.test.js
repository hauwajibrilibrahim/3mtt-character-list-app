import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders loading spinner', () => {
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders characters list', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Rick/i)).toBeInTheDocument();
  });
});
test('renders error message on fetch failure', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Failed to fetch characters'))
  );

  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Failed to fetch characters/i)).toBeInTheDocument();
  });
});