import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Layout from './Layout';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Layout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders app bar with title', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('A11y Places Workshop')).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('has accessible menu toggle button', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  test('opens drawer when menu button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Drawer should not be visible initially
    expect(screen.queryByText('Accessible Versions')).not.toBeVisible();

    // Click menu button to open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    // Drawer should now be visible
    await waitFor(() => {
      expect(screen.getByText('Accessible Versions')).toBeVisible();
    });
  });

  test('closes drawer when menu button is clicked again', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Accessible Versions')).toBeVisible();
    });

    // Close drawer
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.queryByText('Accessible Versions')).not.toBeVisible();
    });
  });

  test('navigates to home when Home menu item is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Accessible Versions')).toBeVisible();
    });

    // Click Home menu item
    const homeButton = screen.getByRole('button', { name: /navigate to home/i });
    await user.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to Places (Accessible) when menu item is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Accessible Versions')).toBeVisible();
    });

    // Click Places (Accessible) menu item
    const placesButton = screen.getByRole('button', { name: /navigate to places \(accessible\)/i });
    await user.click(placesButton);

    expect(mockNavigate).toHaveBeenCalledWith('/places');
  });

  test('navigates to Places (Inaccessible) when menu item is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Inaccessible Versions (For Workshop)')).toBeVisible();
    });

    // Click Places (Inaccessible) menu item
    const placesButton = screen.getByRole('button', { name: /navigate to places \(inaccessible\)/i });
    await user.click(placesButton);

    expect(mockNavigate).toHaveBeenCalledWith('/places-inaccessible');
  });

  test('closes drawer after navigating to a page', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Accessible Versions')).toBeVisible();
    });

    // Click Home menu item
    const homeButton = screen.getByRole('button', { name: /navigate to home/i });
    await user.click(homeButton);

    // Drawer should close after navigation
    await waitFor(() => {
      expect(screen.queryByText('Accessible Versions')).not.toBeVisible();
    });
  });

  test('drawer has correct accessible name', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Open drawer
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('A11y Places')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    test('should not have any automatically detectable accessibility issues', async () => {
      const { container } = render(
        <Layout>
          <div>Test Content</div>
        </Layout>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should not have accessibility issues when drawer is open', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Layout>
          <div>Test Content</div>
        </Layout>
      );

      // Open drawer
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByText('Accessible Versions')).toBeVisible();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
