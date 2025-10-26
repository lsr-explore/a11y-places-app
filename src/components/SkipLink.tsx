import { Link } from '@mui/material';
import type React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      sx={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        '&:focus': {
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'auto',
          height: 'auto',
          overflow: 'visible',
          zIndex: 9999,
          padding: '8px 16px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          fontWeight: 'bold',
          outline: '3px solid',
          outlineColor: 'warning.main',
        },
      }}
    >
      {children}
    </Link>
  );
};

export default SkipLink;
