/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
/** biome-ignore-all lint/a11y/useFocusableInteractive: workshop demo */
/** biome-ignore-all lint/a11y/useSemanticElements: workshop demo */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: workshop demo */

import * as MuiIcons from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useEffect, useId, useState } from 'react';

interface IconPickerInaccessibleProps {
  open: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

const IconPickerInaccessible: React.FC<IconPickerInaccessibleProps> = ({
  open,
  onClose,
  onSelect,
  selectedIcon,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelectedIcon, setTempSelectedIcon] = useState(selectedIcon || 'Place');
  const dialogTitleId = useId();

  // Update temp selection when dialog opens with new selectedIcon
  useEffect(() => {
    if (open) {
      setTempSelectedIcon(selectedIcon || 'Place');
      setSearchTerm('');
    }
  }, [open, selectedIcon]);

  const commonIcons = [
    'Place',
    'Restaurant',
    'LocalCafe',
    'LocalBar',
    'ShoppingCart',
    'LocalGroceryStore',
    'School',
    'Work',
    'Home',
    'Park',
    'Museum',
    'TheaterComedy',
    'LocalHospital',
    'FitnessCenter',
    'SportsBasketball',
    'LocalLibrary',
    'Beach',
    'Hiking',
    'Pool',
    'LocalMovies',
    'LocalParking',
    'LocalGasStation',
    'LocalAirport',
    'Train',
    'DirectionsBus',
    'AccountBalance',
    'Store',
    'LocalMall',
  ];

  const filteredIcons = commonIcons.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = (iconName: string) => {
    setTempSelectedIcon(iconName);
  };

  const handleApply = () => {
    onSelect(tempSelectedIcon);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (MuiIcons as any)[iconName];
    return Icon ? <Icon /> : <MuiIcons.Place />;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby={dialogTitleId}
      // Issue #7: Focus trap disabled - users can tab out to page behind dialog
      disableEnforceFocus
      disableAutoFocus
      // Issue #8: Escape key disabled - keyboard users can't easily dismiss dialog
      disableEscapeKeyDown
    >
      <DialogTitle id={dialogTitleId}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Select an Icon
          <IconButton aria-label="Close dialog" onClick={handleCancel} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              border: 2,
              borderColor: 'primary.main',
              borderRadius: 1,
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
          >
            {getIconComponent(tempSelectedIcon)}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Currently selected: <strong>{tempSelectedIcon}</strong>
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search icons"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search for icons"
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
            gap: 1,
          }}
        >
          {filteredIcons.map((iconName) => {
            const Icon = (MuiIcons as any)[iconName];
            const isSelected = tempSelectedIcon === iconName;
            return (
              <IconButton
                key={iconName}
                onClick={() => handleIconClick(iconName)}
                sx={{
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  aspectRatio: '1',
                }}
                aria-label={`${iconName} icon${isSelected ? ' (currently selected)' : ''}`}
                aria-pressed={isSelected}
              >
                {Icon && <Icon />}
              </IconButton>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <Button onClick={handleApply} variant="contained" autoFocus>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IconPickerInaccessible;
