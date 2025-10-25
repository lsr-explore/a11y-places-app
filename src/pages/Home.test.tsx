import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders welcome heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /welcome to a11y places/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders description text', () => {
    render(<Home />);
    expect(screen.getByText(/accessible places management application/i)).toBeInTheDocument();
  });

  test('renders accessibility features list', () => {
    render(<Home />);
    expect(screen.getByText(/semantic html structure/i)).toBeInTheDocument();
    expect(screen.getByText(/aria labels/i)).toBeInTheDocument();
    expect(screen.getByText(/keyboard navigation/i)).toBeInTheDocument();
  });
});
