import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse, IconButton } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export interface BannerProps {
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
  onClose: () => void;
}

export interface BannerRef {
  focusCloseButton: () => void;
}

const Banner = forwardRef<BannerRef, BannerProps>(
  ({ message, severity = 'success', open, onClose }, ref) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      focusCloseButton: () => {
        closeButtonRef.current?.focus();
      },
    }));

    return (
      <Collapse in={open} unmountOnExit>
        <Box sx={{ mb: 2 }}>
          <Alert
            severity={severity}
            variant="filled"
            action={
              <IconButton ref={closeButtonRef} color="inherit" size="small" onClick={onClose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              width: '100%',
              alignItems: 'center',
            }}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            aria-announce={message}
          >
            {message}
          </Alert>
        </Box>
      </Collapse>
    );
  }
);

Banner.displayName = 'Banner';

export default Banner;
