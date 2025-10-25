import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconPicker from './IconPicker';

describe('IconPicker Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders when open', () => {
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Select an Icon')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(<IconPicker open={false} onClose={mockOnClose} onSelect={mockOnSelect} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('calls onSelect and onClose when icon is clicked', async () => {
    const user = userEvent.setup();
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    const placeIcon = screen.getByLabelText(/select place icon/i);
    await user.click(placeIcon);

    expect(mockOnSelect).toHaveBeenCalledWith('Place');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
