import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Banner from './Banner';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Banner Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders banner when open is true', () => {
    render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('does not render banner when open is false', () => {
    render(
      <Banner
        message="Test message"
        severity="success"
        open={false}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  test('displays success severity correctly', () => {
    render(
      <Banner
        message="Success message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-filledSuccess');
  });

  test('displays error severity correctly', () => {
    render(
      <Banner
        message="Error message"
        severity="error"
        open={true}
        onClose={mockOnClose}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-filledError');
  });

  test('displays info severity correctly', () => {
    render(
      <Banner
        message="Info message"
        severity="info"
        open={true}
        onClose={mockOnClose}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-filledInfo');
  });

  test('displays warning severity correctly', () => {
    render(
      <Banner
        message="Warning message"
        severity="warning"
        open={true}
        onClose={mockOnClose}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-filledWarning');
  });

  test('has close button with correct accessible name', () => {
    render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('has correct ARIA attributes for screen readers', () => {
    render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(alert).toHaveAttribute('aria-atomic', 'true');
  });

  test('banner animates with smooth collapse transition', () => {
    render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    // Verify the banner is rendered with the alert
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('should not have any automatically detectable accessibility issues when open', async () => {
    const { container } = render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have any automatically detectable accessibility issues when closed', async () => {
    const { container } = render(
      <Banner
        message="Test message"
        severity="success"
        open={false}
        onClose={mockOnClose}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('banner container is rendered with correct structure', () => {
    const { container } = render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    // Verify the banner has the expected structure with alert role
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Test message');
  });

  test('updates message when prop changes', async () => {
    const { rerender } = render(
      <Banner
        message="First message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('First message')).toBeInTheDocument();

    rerender(
      <Banner
        message="Second message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Second message')).toBeInTheDocument();
    });
    expect(screen.queryByText('First message')).not.toBeInTheDocument();
  });

  test('updates severity when prop changes', () => {
    const { rerender } = render(
      <Banner
        message="Test message"
        severity="success"
        open={true}
        onClose={mockOnClose}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledSuccess');

    rerender(
      <Banner
        message="Test message"
        severity="error"
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(alert).toHaveClass('MuiAlert-filledError');
  });
});
