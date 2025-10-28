import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { PanelPullTab } from './PanelPullTab';

interface MapPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  panelId: string;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const DRAWER_WIDTH = 320;
const COLLAPSED_WIDTH = 40;

/**
 * Generic panel component for map sidebar panels
 * - Full height drawer that pushes map content
 * - Collapsible with arrow button
 * - Keyboard accessible with Escape to close
 * - Focus management
 */
const MapPanel: React.FC<MapPanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  panelId,
  onCollapsedChange,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const usePullTab = true;

  // Focus management: focus close button when panel opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Reset collapsed state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setIsCollapsed(false);
    }
  }, [isOpen]);

  // Notify parent of collapsed state changes
  useEffect(() => {
    if (onCollapsedChange && isOpen) {
      onCollapsedChange(isCollapsed);
    }
  }, [isCollapsed, isOpen, onCollapsedChange]);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: isOpen ? currentWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: currentWidth,
          boxSizing: 'border-box',
          marginTop: '64px', // Account for app bar
          height: 'calc(100% - 64px)',
          transition: 'width 0.3s ease-in-out',
          overflow: 'visible',
        },
      }}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Box
        id={panelId}
        role="dialog"
        aria-label={title}
        onKeyDown={handleKeyDown}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'background.paper',
          position: 'relative',
        }}
      >
        {/* Collapse/Expand Button - positioned on left edge */}
        {usePullTab ? (
          <PanelPullTab
            open={isCollapsed}
            onClick={handleToggleCollapse}
            label={isCollapsed ? `Expand ${title} panel` : `Collapse ${title} panel`}
          />
        ) : (
          <IconButton
            onClick={handleToggleCollapse}
            aria-label={isCollapsed ? `Expand ${title} panel` : `Collapse ${title} panel`}
            aria-expanded={!isCollapsed}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'background.paper',
              borderLeft: '1px solid',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderRight: 'none',
              borderColor: 'divider',
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: 40,
              height: 40,
              boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.1)',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {isCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}

        {/* Header */}
        {!isCollapsed && (
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" component="h2" id={`${panelId}-title`}>
              {title}
            </Typography>
            <IconButton
              ref={closeButtonRef}
              onClick={onClose}
              aria-label={`Close ${title} panel`}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Content */}
        {!isCollapsed && <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>{children}</Box>}
      </Box>
    </Drawer>
  );
};

export default MapPanel;
export { DRAWER_WIDTH, COLLAPSED_WIDTH };
