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

  test('allows selecting an icon with instant selection', async () => {
    const user = userEvent.setup();
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    // Click on an icon - should immediately select and close
    const restaurantIcon = screen.getByLabelText(/restaurant icon/i);
    await user.click(restaurantIcon);

    // Verify onSelect and onClose were called immediately with the correct value
    expect(mockOnSelect).toHaveBeenCalledWith('Restaurant');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('has screen reader instructions for instant selection', () => {
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    // Verify screen reader instructions are present
    const instructions = screen.getByText(/clicking an icon will select it and close this dialog/i);
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveClass('sr-only');
  });

  test('displays currently selected icon', () => {
    render(
      <IconPicker
        open={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        selectedIcon="Restaurant"
      />
    );

    expect(screen.getByText(/currently selected:/i)).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });

  test('has a close button in the dialog title', async () => {
    const user = userEvent.setup();
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    const closeButton = screen.getByLabelText(/close dialog/i);
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('filters icons based on search term', async () => {
    const user = userEvent.setup();
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    const searchInput = screen.getByRole('textbox', { name: /search/i });

    // Verify Restaurant icon is present before filtering
    expect(screen.getByLabelText(/restaurant icon/i)).toBeInTheDocument();

    await user.type(searchInput, 'cafe');

    // Should find LocalCafe icon
    expect(screen.getByLabelText(/localcafe icon/i)).toBeInTheDocument();

    // Should not find Restaurant after filtering
    expect(screen.queryByLabelText(/^restaurant icon$/i)).not.toBeInTheDocument();
  });

  test('has ARIA set size and position information', () => {
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    // Check that icon group has proper label
    const iconGroup = screen.getByRole('group', { name: /icons available/i });
    expect(iconGroup).toBeInTheDocument();

    // Get all icon buttons
    const restaurantIcon = screen.getByLabelText(/restaurant icon/i);

    // Verify aria-setsize and aria-posinset are present
    expect(restaurantIcon).toHaveAttribute('aria-setsize');
    expect(restaurantIcon).toHaveAttribute('aria-posinset');

    // The setsize should be greater than 1 (we have multiple icons)
    const setSize = restaurantIcon.getAttribute('aria-setsize');
    expect(Number(setSize)).toBeGreaterThan(1);
  });

  test('updates ARIA set size when search filter is applied', async () => {
    const user = userEvent.setup();
    render(<IconPicker open={true} onClose={mockOnClose} onSelect={mockOnSelect} />);

    // Get initial icon count (matches plural or singular)
    const initialGroup = screen.getByRole('group', { name: /icon(s)? available/i });
    const initialLabel = initialGroup.getAttribute('aria-label');

    // Apply search filter
    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'cafe');

    // Verify the group label updated with filtered count (matches plural or singular)
    const filteredGroup = screen.getByRole('group', { name: /icon(s)? available/i });
    const filteredLabel = filteredGroup.getAttribute('aria-label');

    // The filtered count should be different (and smaller) than the initial count
    expect(filteredLabel).not.toBe(initialLabel);
    expect(filteredLabel).toBe('1 icon available'); // Should be singular when filtered to 1

    // Verify icon has updated setsize
    const cafeIcon = screen.getByLabelText(/localcafe icon/i);
    const setSize = Number(cafeIcon.getAttribute('aria-setsize'));

    // After filtering for 'cafe', should have exactly 1 icon
    expect(setSize).toBe(1);
  });
});
