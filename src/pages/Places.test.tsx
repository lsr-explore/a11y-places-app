import { render, screen, waitFor } from '@testing-library/react';
import * as storage from '../utils/storage';
import Places from './Places';

// Mock the storage module
jest.mock('../utils/storage');

// Mock react-router-dom with ability to control useLocation return value
let mockLocationState: any = null;
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('../__mocks__/react-router-dom'),
  useLocation: () => ({ state: mockLocationState, pathname: '/places' }),
}));

describe('Places Component', () => {
  const mockPlaces = [
    { id: '1', name: 'Central Park', places: 'New York, NY', icon: 'Park' },
    { id: '2', name: 'Coffee Shop', places: 'Downtown', icon: 'LocalCafe' },
    { id: '3', name: 'Gym', places: 'Main Street', icon: 'FitnessCenter' },
    { id: '4', name: 'Library', places: 'Oak Avenue', icon: 'LocalLibrary' },
    { id: '5', name: 'Beach', places: 'Coastline', icon: 'Beach' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocationState = null;
  });

  test('renders list of 5 places with Edit buttons', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that all 5 places are displayed
    expect(screen.getByText('Central Park')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Beach')).toBeInTheDocument();

    // Check that Edit buttons exist (one per place)
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    expect(editButtons).toHaveLength(5);
  });

  test('Edit buttons have correct role and accessible name', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that all Edit buttons have the correct accessible name
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    expect(editButtons).toHaveLength(5);

    // Verify each button has the accessible name "Edit"
    editButtons.forEach((button) => {
      expect(button).toHaveAccessibleName('Edit');
    });
  });

  test('Delete buttons have correct accessible name', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that all Delete buttons exist with correct accessible name
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    expect(deleteButtons).toHaveLength(5);
  });

  test('renders empty state when no places exist', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue([]);

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText(/no places added yet/i)).toBeInTheDocument();
    });
  });

  test('displays place information correctly', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue([mockPlaces[0]]);

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    expect(screen.getByText('Central Park')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
  });

  test('displays success banner when place is added', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = {
      successMessage: 'Place added successfully',
      restoreFocusTo: 'edit-1',
    };

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that success message is displayed
    expect(screen.getByText('Place added successfully')).toBeInTheDocument();

    // Check that the alert has the success role for screen readers
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Place added successfully');
  });

  test('displays success banner when place is updated', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = {
      successMessage: 'Place updated successfully',
      restoreFocusTo: 'edit-2',
    };

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    });

    // Check that success message is displayed
    expect(screen.getByText('Place updated successfully')).toBeInTheDocument();
  });

  test('focuses Edit button for newly added place', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = {
      successMessage: 'Place added successfully',
      restoreFocusTo: 'edit-1',
    };

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Wait for focus to be set
    await waitFor(() => {
      const editButtons = screen.getAllByRole('button', { name: 'Edit' });
      // The first edit button (for Central Park with id '1') should have focus
      expect(editButtons[0]).toHaveFocus();
    });
  });

  test('focuses Edit button for updated place', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = {
      successMessage: 'Place updated successfully',
      restoreFocusTo: 'edit-2',
    };

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    });

    // Wait for focus to be set
    await waitFor(() => {
      const editButtons = screen.getAllByRole('button', { name: 'Edit' });
      // The second edit button (for Coffee Shop with id '2') should have focus
      expect(editButtons[1]).toHaveFocus();
    });
  });

  test('focuses Add Place button when returning from cancel', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = {
      restoreFocusTo: 'add-button',
    };

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Wait for focus to be set
    await waitFor(() => {
      const addButton = screen.getByRole('button', { name: 'Add new place' });
      expect(addButton).toHaveFocus();
    });
  });

  test('focuses specific Edit button when returning from cancel on edit form', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = {
      restoreFocusTo: 'edit-3',
    };

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Gym')).toBeInTheDocument();
    });

    // Wait for focus to be set
    await waitFor(() => {
      const editButtons = screen.getAllByRole('button', { name: 'Edit' });
      // The third edit button (for Gym with id '3') should have focus
      expect(editButtons[2]).toHaveFocus();
    });
  });

  test('does not display success banner when no success message in state', async () => {
    (storage.getPlaces as jest.Mock).mockResolvedValue(mockPlaces);
    mockLocationState = null;

    render(<Places />);

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
    });

    // Check that no alert is displayed
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
