import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';
import type React from 'react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentZoom: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut, currentZoom }) => {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Zoom controls"
      sx={{
        backgroundColor: 'white',
        boxShadow: 2,
        '& .MuiButton-root': {
          minWidth: 40,
          minHeight: 40,
          padding: 1,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        },
      }}
    >
      <Button
        onClick={onZoomIn}
        aria-label={`Zoom in. Current zoom level: ${Math.round(currentZoom)}`}
      >
        <AddIcon />
      </Button>
      <Button
        onClick={onZoomOut}
        aria-label={`Zoom out. Current zoom level: ${Math.round(currentZoom)}`}
      >
        <RemoveIcon />
      </Button>
    </ButtonGroup>
  );
};

export default ZoomControls;
