import { Button, Typography } from '@mui/material';
import type React from 'react';

interface PanelButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
  ariaLabel: string;
  ariaControls: string;
}

/**
 * Button for toggling map panels
 * Used in the map controls area
 */
const PanelButton: React.FC<PanelButtonProps> = ({
  icon,
  label,
  onClick,
  isActive,
  ariaLabel,
  ariaControls,
}) => {
  return (
    <Button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isActive}
      aria-controls={ariaControls}
      sx={{
        backgroundColor: isActive ? 'primary.light' : 'white',
        boxShadow: 2,
        minWidth: 100,
        minHeight: 40,
        padding: '8px 16px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        color: isActive ? 'primary.contrastText' : 'text.primary',
        '&:hover': {
          backgroundColor: isActive ? 'primary.main' : 'action.hover',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        outlineOffset: 2,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      {icon}
      <Typography variant="caption" sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
        {label}
      </Typography>
    </Button>
  );
};

export default PanelButton;
