import type React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const Routes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const Route = ({ element }: any) => element || null;

export const Link = ({ children, to, ...props }: any) => (
  <a href={to} {...props}>
    {children}
  </a>
);

export const useNavigate = () => jest.fn();
export const useParams = () => ({});
export const useLocation = () => ({ state: null, pathname: '/' });
