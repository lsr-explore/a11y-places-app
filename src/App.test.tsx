import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as storage from './utils/storage';

// Mock storage
jest.mock('./utils/storage');

test('renders A11y Places app', async () => {
  // Mock getPlaces to return empty array to prevent async state updates
  (storage.getPlaces as jest.Mock).mockResolvedValue([]);

  render(<App />);

  // Check for the main heading from the Home page
  const heading = screen.getByRole('heading', { name: /welcome to a11y places/i });
  expect(heading).toBeInTheDocument();

  // Wait for any async operations to complete
  await waitFor(() => {
    expect(storage.getPlaces).toHaveBeenCalled();
  });
});
