import * as MuiIcons from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import type { Place } from '../types/Place';
import { deletePlace, getPlaces } from '../utils/storage';
import { useStorage } from '../utils/storageApi';

const PlacesInaccessible: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const navigate = useNavigate();
  const { getPlaces, deletePlace } = useStorage();

  const breadcrumbItems = [{ label: 'Home', path: '/' }, { label: 'Places (Inaccessible)' }];

  const loadPlaces = async () => {
    const loadedPlaces = await getPlaces();
    setPlaces(loadedPlaces);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: adding loadPlaces is unnessary
  useEffect(() => {
    loadPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    await deletePlace(id);
    await loadPlaces();
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (MuiIcons as any)[iconName];
    return Icon ? <Icon /> : <MuiIcons.Place />;
  };

  return (
    <Container maxWidth="md">
      <Breadcrumbs items={breadcrumbItems} />
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color="error.main" sx={{ fontWeight: 'bold' }}>
          ⚠ Accessibility Issues Present (For Workshop Demo)
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Places
        </Typography>
      </Box>

      {places.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No places added yet. Click "Add Place" to get started!
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ position: 'relative' }}>
          <List>
            {places.map((place, index) => {
              return (
                <ListItem
                  key={place.id}
                  divider={index < places.length - 1}
                  sx={{ pr: 15 }} // Make room for buttons
                  data-place-id={place.id} // Used to position edit buttons
                >
                  <ListItemIcon aria-hidden="true">{getIconComponent(place.icon)}</ListItemIcon>
                  <ListItemText
                    primary={place.name}
                    secondary={place.places}
                    primaryTypographyProps={{
                      id: `place-name-${place.id}`,
                    }}
                  />
                  {/* Issue #3: Delete button is a div with click handler - not keyboard accessible */}
                  {/* Adding role="button" makes it detectable by axe-core but still inaccessible */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <div
                    role="button"
                    onClick={() => handleDelete(place.id)}
                    style={{
                      cursor: 'pointer',
                      display: 'inline-flex',
                      padding: '8px',
                      position: 'absolute',
                      right: '8px',
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </ListItem>
              );
            })}
          </List>

          {/* Issue #5: Edit buttons rendered after list but positioned with CSS to appear inline
              This creates awkward keyboard navigation - user tabs through all items first,
              then tabs back to edit buttons at the end */}
          {places.map((place, index) => (
            <Button
              key={place.id}
              onClick={() => navigate(`/places-inaccessible/edit/${place.id}`)}
              size="small"
              sx={{
                position: 'absolute',
                top: `${index * 73 + 16}px`, // Approximate positioning to align with list items
                right: '56px',
              }}
            >
              Edit
            </Button>
          ))}
        </Paper>
      )}

      {/* Issue #4: Add place button moved below the list */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/places-inaccessible/add')}
        >
          Add Place
        </Button>
      </Box>
    </Container>
  );
};

export default PlacesInaccessible;
