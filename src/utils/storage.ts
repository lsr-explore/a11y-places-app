import { Preferences } from '@capacitor/preferences';
import type { Place } from '../types/Place';

const PLACES_KEY = 'places';

export const getPlaces = async (): Promise<Place[]> => {
  try {
    const { value } = await Preferences.get({ key: PLACES_KEY });
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Error getting places:', error);
    return [];
  }
};

export const savePlaces = async (places: Place[]): Promise<void> => {
  try {
    await Preferences.set({
      key: PLACES_KEY,
      value: JSON.stringify(places),
    });
  } catch (error) {
    console.error('Error saving places:', error);
  }
};

export const addPlace = async (place: Place): Promise<void> => {
  const places = await getPlaces();
  places.push(place);
  await savePlaces(places);
};

export const updatePlace = async (updatedPlace: Place): Promise<void> => {
  const places = await getPlaces();
  const updatedPlaces = places.map((place) =>
    place.id === updatedPlace.id ? updatedPlace : place
  );
  await savePlaces(updatedPlaces);
};

export const deletePlace = async (id: string): Promise<void> => {
  const places = await getPlaces();
  const filteredPlaces = places.filter((place) => place.id !== id);
  await savePlaces(filteredPlaces);
};
