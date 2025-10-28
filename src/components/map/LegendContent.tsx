import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MuseumIcon from '@mui/icons-material/Museum';
import ParkIcon from '@mui/icons-material/Park';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrainIcon from '@mui/icons-material/Train';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import type React from 'react';

interface LegendItem {
  icon: React.ReactNode;
  name: string;
}

interface LegendSection {
  title: string;
  items: LegendItem[];
}

const LEGEND_DATA: LegendSection[] = [
  {
    title: 'Points of Interest',
    items: [
      { icon: <RestaurantIcon />, name: 'Restaurants' },
      { icon: <ParkIcon />, name: 'Parks' },
      { icon: <MuseumIcon />, name: 'Museums' },
    ],
  },
  {
    title: 'Transportation',
    items: [
      { icon: <DirectionsBusIcon />, name: 'Bus Stops' },
      { icon: <TrainIcon />, name: 'Train Stations' },
      { icon: <LocalParkingIcon />, name: 'Parking' },
    ],
  },
];

/**
 * Content component for the map legend
 * This contains just the legend items without any drawer/panel logic
 */
const LegendContent: React.FC = () => {
  return (
    <>
      {LEGEND_DATA.map((section, sectionIndex) => (
        <Box key={section.title} sx={{ mb: sectionIndex < LEGEND_DATA.length - 1 ? 3 : 0 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ px: 2 }}>
            {section.title}
          </Typography>
          <List dense>
            {section.items.map((item) => (
              <ListItem
                key={item.name}
                sx={{
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          {sectionIndex < LEGEND_DATA.length - 1 && <Divider sx={{ mt: 1 }} />}
        </Box>
      ))}
    </>
  );
};

export default LegendContent;
