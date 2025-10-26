import * as MuiIcons from '@mui/icons-material';
import { Box, Button, Container, IconButton, Paper, TextField, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import IconPicker from '../components/IconPicker';
import type { Place } from '../types/Place';
import { addPlace, getPlaces, updatePlace } from '../utils/storage';

const AddPlace: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const returnFocusTo = location.state?.returnFocusTo;

  const [name, setName] = useState('');
  const [places, setPlaces] = useState('');
  const [icon, setIcon] = useState('Place');
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [errors, setErrors] = useState({ name: '', places: '' });

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Places (Accessible)', path: '/places' },
    { label: isEditMode ? 'Edit Place' : 'Add Place' },
  ];

  const loadPlace = async (placeId: string) => {
    const allPlaces = await getPlaces();
    const place = allPlaces.find((p) => p.id === placeId);
    if (place) {
      setName(place.name);
      setPlaces(place.places);
      setIcon(place.icon);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: adding loadPlace is unnecessary
  useEffect(() => {
    if (isEditMode && id) {
      loadPlace(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  const validateForm = (): boolean => {
    const newErrors = { name: '', places: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!places.trim()) {
      newErrors.places = 'Places is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode && id) {
      const updatedPlace: Place = {
        id,
        name: name.trim(),
        places: places.trim(),
        icon,
      };
      await updatePlace(updatedPlace);
      navigate('/places', {
        state: { successMessage: `"${name.trim()}" updated successfully`, restoreFocusTo: `edit-${id}` },
      });
    } else {
      const newPlaceId = Date.now().toString();
      const newPlace: Place = {
        id: newPlaceId,
        name: name.trim(),
        places: places.trim(),
        icon,
      };
      await addPlace(newPlace);
      navigate('/places', {
        state: { successMessage: `"${name.trim()}" added successfully`, restoreFocusTo: `edit-${newPlaceId}` },
      });
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (MuiIcons as any)[iconName];
    return Icon ? <Icon /> : <MuiIcons.Place />;
  };

  return (
    <Container maxWidth="sm">
      <Breadcrumbs items={breadcrumbItems} />
      <Box sx={{ mb: 1, mt: 2 }}>
        <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
          ✓ Accessibility Enabled
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Place' : 'Add New Place'}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Fields marked with an asterisk (*) are required.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <TextField
            fullWidth
            label="Places"
            variant="outlined"
            margin="normal"
            value={places}
            onChange={(e) => setPlaces(e.target.value)}
            error={!!errors.places}
            helperText={errors.places || 'Enter the location or description of this place'}
            required
            multiline
            rows={3}
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography
              variant="body1"
              component="label"
              gutterBottom
              sx={{ display: 'block', fontWeight: 500 }}
            >
              Icon (optional)
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Select an icon to represent this place
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={() => setIconPickerOpen(true)}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  width: 56,
                  height: 56,
                }}
                aria-label={`Current icon: ${icon}. Click to change icon`}
              >
                {getIconComponent(icon)}
              </IconButton>
              <Button variant="outlined" onClick={() => setIconPickerOpen(true)}>
                Choose Icon
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditMode ? 'Update' : 'Add Place'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/places', { state: { restoreFocusTo: returnFocusTo } })}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>

      <IconPicker
        open={iconPickerOpen}
        onClose={() => setIconPickerOpen(false)}
        onSelect={setIcon}
        selectedIcon={icon}
      />
    </Container>
  );
};

export default AddPlace;
