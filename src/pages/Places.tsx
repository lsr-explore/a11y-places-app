import * as MuiIcons from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import type React from 'react';
import { createRef, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import type { Place } from '../types/Place';
import { useStorage } from '../utils/storageApi';

const Places: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { getPlaces, deletePlace } = useStorage();

  const editButtonRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement | null> }>({});
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const breadcrumbItems = [{ label: 'Home', path: '/' }, { label: 'Places (Accessible)' }];

  const loadPlaces = async () => {
    const loadedPlaces = await getPlaces();
    setPlaces(loadedPlaces);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: adding loadPlaces is unnessary
  useEffect(() => {
    loadPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore focus and show success message when returning from Add/Edit page
  // biome-ignore lint/correctness/useExhaustiveDependencies: adding restoreFocusTo is unnessary
  useEffect(() => {
    const restoreFocusTo = location.state?.restoreFocusTo;
    const successMessage = location.state?.successMessage;

    if (successMessage) {
      setSnackbarMessage(successMessage);
      setSnackbarOpen(true);
    }

    if (restoreFocusTo) {
      // Use setTimeout to ensure focus happens after render is complete
      const timeoutId = setTimeout(() => {
        if (restoreFocusTo === 'add-button') {
          addButtonRef.current?.focus();
        } else if (restoreFocusTo.startsWith('edit-')) {
          const placeId = restoreFocusTo.replace('edit-', '');
          editButtonRefs.current[placeId]?.current?.focus();
        }
        // Clear the state after focusing
        window.history.replaceState({}, document.title);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state, places]);

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = async (id: string) => {
    // Find the place name before deleting
    const placeToDelete = places.find((place) => place.id === id);
    await deletePlace(id);
    await loadPlaces();

    // Show success message with place name
    if (placeToDelete) {
      setSnackbarMessage(`"${placeToDelete.name}" deleted successfully`);
      setSnackbarOpen(true);
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (MuiIcons as any)[iconName];
    return Icon ? <Icon /> : <MuiIcons.Place />;
  };

  return (
    <Container maxWidth="md">
      <Breadcrumbs items={breadcrumbItems} />
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
          ✓ Accessibility Enabled
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Places
        </Typography>
        <Button
          ref={addButtonRef}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/places/add', { state: { returnFocusTo: 'add-button' } })}
        >
          Add Place
        </Button>
      </Box>

      {places.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No places added yet. Click "Add Place" to get started!
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2}>
          <List>
            {places.map((place, index) => {
              // Create a ref for each edit button if it doesn't exist
              if (!editButtonRefs.current[place.id]) {
                editButtonRefs.current[place.id] = createRef<HTMLButtonElement>();
              }

              return (
                <ListItem
                  key={place.id}
                  divider={index < places.length - 1}
                  secondaryAction={
                    <Box>
                      <Button
                        ref={editButtonRefs.current[place.id]}
                        aria-describedby={`place-name-${place.id}`}
                        onClick={() =>
                          navigate(`/places/edit/${place.id}`, {
                            state: { returnFocusTo: `edit-${place.id}` },
                          })
                        }
                        size="small"
                      >
                        Edit
                      </Button>
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        aria-describedby={`place-name-${place.id}`}
                        onClick={() => handleDelete(place.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon aria-hidden="true">{getIconComponent(place.icon)}</ListItemIcon>
                  <ListItemText
                    primary={place.name}
                    secondary={place.places}
                    primaryTypographyProps={{
                      id: `place-name-${place.id}`,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Places;
