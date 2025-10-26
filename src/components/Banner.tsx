import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton, Slide } from '@mui/material';
import type React from 'react';

export interface BannerProps {
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
  onClose: () => void;
}

const BANNER_HEIGHT = 56;

const Banner: React.FC<BannerProps> = ({ message, severity = 'success', open, onClose }) => {
  return (
    <>
      {/* Fixed banner at the top */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
        }}
      >
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Alert
            severity={severity}
            variant="filled"
            action={
              <IconButton
                aria-label="Close"
                color="inherit"
                size="small"
                onClick={onClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              width: '100%',
              borderRadius: 0,
              boxShadow: 2,
              minHeight: `${BANNER_HEIGHT}px`,
              alignItems: 'center',
            }}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            {message}
          </Alert>
        </Slide>
      </Box>

      {/* Spacer to prevent layout shift */}
      <Box
        sx={{
          height: open ? `${BANNER_HEIGHT}px` : 0,
          transition: 'height 0.3s ease-in-out',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Banner;
