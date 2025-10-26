import * as MuiIcons from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import type React from 'react';
import { createRef, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Banner, { type BannerRef } from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import type { Place } from '../types/Place';
import { useStorage } from '../utils/storageApi';

const Places: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getPlaces, deletePlace } = useStorage();

  const editButtonRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement | null> }>({});
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const bannerRef = useRef<BannerRef>(null);

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
        // If there's a success message, focus on the banner's close button
        // Otherwise (cancel operation), restore focus to the previous element
        if (successMessage) {
          bannerRef.current?.focusCloseButton();
        } else {
          if (restoreFocusTo === 'add-button') {
            addButtonRef.current?.focus();
          } else if (restoreFocusTo.startsWith('edit-')) {
            const placeId = restoreFocusTo.replace('edit-', '');
            editButtonRefs.current[placeId]?.current?.focus();
          }
        }
        // Clear the state after focusing
        window.history.replaceState({}, document.title);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state, places]);

  const handleBannerClose = () => {
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

  const handleClearDataClick = () => {
    setClearDialogOpen(true);
  };

  const handleClearDataConfirm = async () => {
    // Clear all data from localStorage
    localStorage.clear();
    // Reload places (will be empty now)
    await loadPlaces();
    // Close dialog
    setClearDialogOpen(false);
    // Show success message
    setSnackbarMessage('All workshop data has been cleared');
    setSnackbarOpen(true);
  };

  const handleClearDataCancel = () => {
    setClearDialogOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (MuiIcons as any)[iconName];
    return Icon ? <Icon /> : <MuiIcons.Place />;
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
          ✓ Accessibility Enabled
        </Typography>
      </Box>
      <Container maxWidth="md">
        <Breadcrumbs items={breadcrumbItems} />
      </Container>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" id="main-content">
            Places
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              ref={addButtonRef}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/places/add', { state: { returnFocusTo: 'add-button' } })}
            >
              Add Place
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<DeleteSweepIcon />}
              onClick={handleClearDataClick}
            >
              Clear All Data
            </Button>
          </Box>
        </Box>

        <Banner
          ref={bannerRef}
          message={snackbarMessage}
          severity="success"
          open={snackbarOpen}
          onClose={handleBannerClose}
        />

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

        <Dialog
          open={clearDialogOpen}
          onClose={handleClearDataCancel}
          aria-labelledby="clear-data-dialog-title"
          aria-describedby="clear-data-dialog-description"
        >
          <DialogTitle id="clear-data-dialog-title">Clear All Saved Places?</DialogTitle>
          <DialogContent>
            <DialogContentText id="clear-data-dialog-description">
              This will permanently delete all places that you have added. This action cannot be
              undone.
              <br />
              <br />
              Note: This only clears data stored locally in your browser.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClearDataCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleClearDataConfirm} variant="contained" color="warning">
              Clear All Data
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Places;
