import { render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as storage from '../utils/storage';
import PlacesInaccessible from './PlacesInaccessible';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock the storage module
jest.mock('../utils/storage');

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('../__mocks__/react-router-dom'),
}));

describe('PlacesInaccessible Component', () => {
  const mockPlaces = [
    { id: '1', name: 'Central Park', places: 'New York, NY', icon: 'Park' },
    { id: '2', name: 'Coffee Shop', places: 'Downtown', icon: 'LocalCafe' },
    { id: '3', name: 'Gym', places: 'Main Street', icon: 'FitnessCenter' },
    { id: '4', name: 'Library', places: 'Oak Avenue', icon: 'LocalLibrary' },
    { id: '5', name: 'Beach', places: 'Coastline', icon: 'Beach' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list of 5 places', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<PlacesInaccessible />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that all 5 places are displayed
    expect(screen.getByText('Central Park')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Beach')).toBeInTheDocument();
  });

  test('renders Edit buttons', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<PlacesInaccessible />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that Edit buttons exist
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    expect(editButtons).toHaveLength(5);
  });

  test('renders empty state when no places exist', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue([]);

    render(<PlacesInaccessible />);

    await waitFor(() => {
      expect(screen.getByText(/no places added yet/i)).toBeInTheDocument();
    });
  });

  test('displays place information correctly', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue([mockPlaces[0]]);

    render(<PlacesInaccessible />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    expect(screen.getByText('Central Park')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
  });

  test('displays warning message about accessibility issues', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<PlacesInaccessible />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    expect(screen.getByText(/accessibility issues present/i)).toBeInTheDocument();
  });

  test('has Add Place button', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<PlacesInaccessible />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add place/i });
    expect(addButton).toBeInTheDocument();
  });

  describe('Accessibility Issues (Intentional for Workshop)', () => {
    test('should have automatically detectable accessibility issues', async () => {
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      const { container } = render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      const results = await axe(container);

      // This component SHOULD have violations (it's the inaccessible version)
      expect(results.violations.length).toBeGreaterThan(0);
    });

    test('should detect button role violations on delete buttons', async () => {
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      const { container } = render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      const results = await axe(container);

      // Should have aria-command-name violations (buttons without accessible names)
      const commandNameViolations = results.violations.filter(
        (v) => v.id === 'aria-command-name'
      );
      expect(commandNameViolations.length).toBeGreaterThan(0);
    });

    test('delete buttons use non-semantic div elements', async () => {
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      const { container } = render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      // Delete buttons are divs with role="button", not actual buttons
      const divButtons = container.querySelectorAll('div[role="button"]');
      expect(divButtons.length).toBe(5);
    });

    test('Edit buttons have custom styling that may cause poor color contrast', async () => {
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      // Edit buttons exist with custom styling
      const editButtons = screen.getAllByRole('button', { name: 'Edit' });
      expect(editButtons).toHaveLength(5);

      // Note: Color contrast violations may not be detected in jsdom environment
      // but the buttons use backgroundColor: '#9AA88F' which has poor contrast with white text
    });

    test('renders heading with proper structure', async () => {
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      // Should still have proper heading structure
      const heading = screen.getByRole('heading', { name: 'Places', level: 1 });
      expect(heading).toBeInTheDocument();
    });

    test('has breadcrumb navigation', async () => {
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumb).toBeInTheDocument();
    });
  });

  describe('Functionality', () => {
    test('calls deletePlace when delete button is clicked', async () => {
      const mockDeletePlace = jest.fn().mockResolvedValue(undefined);
      (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
      (storage.deletePlace as jest.Mock).mockImplementation(mockDeletePlace);

      const { container } = render(<PlacesInaccessible />);

      await waitFor(() => {
        expect(screen.getByText('Central Park')).toBeInTheDocument();
      });

      // Find the first delete button (div with role="button")
      const deleteButtons = container.querySelectorAll('div[role="button"]');
      expect(deleteButtons.length).toBeGreaterThan(0);

      // Click the first delete button
      deleteButtons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await waitFor(() => {
        expect(mockDeletePlace).toHaveBeenCalledWith('1');
      });
    });
  });
});
