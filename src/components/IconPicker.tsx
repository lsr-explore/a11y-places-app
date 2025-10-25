import * as MuiIcons from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import type React from 'react';
import { useId, useState } from 'react';

interface IconPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({ open, onClose, onSelect, selectedIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dialogTitleId = useId();

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby={dialogTitleId}
    >
      <DialogTitle id={dialogTitleId}>Select an Icon</DialogTitle>
      <DialogContent>
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
            return (
              <IconButton
                key={iconName}
                onClick={() => handleSelect(iconName)}
                sx={{
                  border: selectedIcon === iconName ? 2 : 1,
                  borderColor: selectedIcon === iconName ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  aspectRatio: '1',
                }}
                aria-label={`Select ${iconName} icon`}
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
