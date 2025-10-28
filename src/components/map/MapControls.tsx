import { Box } from '@mui/material';
import type React from 'react';
import PanelButton from './PanelButton';
import type { PanelButtonConfig } from './types';
import ZoomControls from './ZoomControls';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentZoom: number;
  panelButtons: PanelButtonConfig[];
  activePanelId: string | null;
  onPanelToggle: (panelId: string) => void;
}

/**
 * Map controls component - contains panel buttons and zoom controls
 * Positioned in top-right corner of the map
 */
const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  currentZoom,
  panelButtons,
  activePanelId,
  onPanelToggle,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1,
      }}
      role="group"
      aria-label="Map controls"
    >
      {/* Panel buttons */}
      {panelButtons.map((button) => (
        <PanelButton
          key={button.id}
          icon={button.icon}
          label={button.label}
          onClick={() => onPanelToggle(button.id)}
          isActive={activePanelId === button.id}
          ariaLabel={button.ariaLabel}
          ariaControls={`panel-${button.id}`}
        />
      ))}

      {/* Zoom controls */}
      <ZoomControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} currentZoom={currentZoom} />
    </Box>
  );
};

export default MapControls;
