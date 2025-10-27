import * as MuiIcons from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useEffect, useId, useState } from 'react';

interface IconPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({ open, onClose, onSelect, selectedIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dialogTitleId = useId();

  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchTerm('');
    }
  }, [open]);

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

  const handleSelect = (iconName: string) => {
    onSelect(iconName);
    onClose();
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (MuiIcons as any)[iconName];
    return Icon ? <Icon /> : <MuiIcons.Place />;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby={dialogTitleId}>
      <Box sx={{ position: 'relative' }}>
        <DialogTitle id={dialogTitleId} sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Select an Icon
          <IconButton
            aria-label="Close dialog"
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Box>
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
            {getIconComponent(selectedIcon || 'Place')}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Currently selected: <strong>{selectedIcon || 'Place'}</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              <span className="sr-only">
                Clicking an icon will select it and close this dialog.
              </span>
            </Typography>
          </Box>
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
          role="group"
          aria-label={`${filteredIcons.length} icon${filteredIcons.length === 1 ? '' : 's'} available`}
        >
          {filteredIcons.map((iconName, index) => {
            const Icon = (MuiIcons as any)[iconName];
            const isSelected = selectedIcon === iconName;
            return (
              <IconButton
                key={iconName}
                onClick={() => handleSelect(iconName)}
                sx={{
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  aspectRatio: '1',
                }}
                aria-label={`${iconName} icon${isSelected ? ' (currently selected)' : ''}`}
                aria-pressed={isSelected}
                aria-setsize={filteredIcons.length}
                aria-posinset={index + 1}
              >
                {Icon && <Icon />}
              </IconButton>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default IconPicker;
