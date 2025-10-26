import type { Place } from '../types/Place';
import { getPlaces, savePlaces, addPlace, updatePlace, deletePlace } from './storage';

// Mock Capacitor Preferences
jest.mock('@capacitor/preferences', () => ({
  Preferences: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

import { Preferences } from '@capacitor/preferences';

describe('Storage Utils', () => {
  const mockPlaces: Place[] = [
    { id: '1', name: 'Central Park', places: 'New York, NY', icon: 'Park' },
    { id: '2', name: 'Coffee Shop', places: 'Downtown', icon: 'LocalCafe' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear console.error spy to avoid cluttering test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getPlaces', () => {
    test('returns places when data exists', async () => {
      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });

      const result = await getPlaces();

      expect(result).toEqual(mockPlaces);
      expect(Preferences.get).toHaveBeenCalledWith({ key: 'places' });
    });

    test('returns empty array when no data exists', async () => {
      (Preferences.get as jest.Mock).mockResolvedValue({ value: null });

      const result = await getPlaces();

      expect(result).toEqual([]);
      expect(Preferences.get).toHaveBeenCalledWith({ key: 'places' });
    });

    test('returns empty array on error', async () => {
      (Preferences.get as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const result = await getPlaces();

      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Error getting places:', expect.any(Error));
    });
  });

  describe('savePlaces', () => {
    test('saves places successfully', async () => {
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await savePlaces(mockPlaces);

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'places',
        value: JSON.stringify(mockPlaces),
      });
    });

    test('handles save error gracefully', async () => {
      (Preferences.set as jest.Mock).mockRejectedValue(new Error('Storage error'));

      await savePlaces(mockPlaces);

      expect(console.error).toHaveBeenCalledWith('Error saving places:', expect.any(Error));
    });
  });

  describe('addPlace', () => {
    test('adds a new place to existing places', async () => {
      const newPlace: Place = { id: '3', name: 'Gym', places: 'Main Street', icon: 'FitnessCenter' };

      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await addPlace(newPlace);

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'places',
        value: JSON.stringify([...mockPlaces, newPlace]),
      });
    });

    test('adds a place when storage is empty', async () => {
      const newPlace: Place = { id: '1', name: 'Gym', places: 'Main Street', icon: 'FitnessCenter' };

      (Preferences.get as jest.Mock).mockResolvedValue({ value: null });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await addPlace(newPlace);

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'places',
        value: JSON.stringify([newPlace]),
      });
    });
  });

  describe('updatePlace', () => {
    test('updates an existing place', async () => {
      const updatedPlace: Place = {
        id: '1',
        name: 'Central Park Updated',
        places: 'New York, NY',
        icon: 'Park',
      };

      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await updatePlace(updatedPlace);

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'places',
        value: JSON.stringify([updatedPlace, mockPlaces[1]]),
      });
    });

    test('does not modify other places when updating', async () => {
      const updatedPlace: Place = {
        id: '2',
        name: 'Coffee Shop Updated',
        places: 'Downtown',
        icon: 'LocalCafe',
      };

      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await updatePlace(updatedPlace);

      const savedValue = (Preferences.set as jest.Mock).mock.calls[0][0].value;
      const savedPlaces = JSON.parse(savedValue);

      expect(savedPlaces[0]).toEqual(mockPlaces[0]); // First place unchanged
      expect(savedPlaces[1]).toEqual(updatedPlace); // Second place updated
    });
  });

  describe('deletePlace', () => {
    test('deletes a place by id', async () => {
      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await deletePlace('1');

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'places',
        value: JSON.stringify([mockPlaces[1]]),
      });
    });

    test('does not modify other places when deleting', async () => {
      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await deletePlace('1');

      const savedValue = (Preferences.set as jest.Mock).mock.calls[0][0].value;
      const savedPlaces = JSON.parse(savedValue);

      expect(savedPlaces).toHaveLength(1);
      expect(savedPlaces[0]).toEqual(mockPlaces[1]);
    });

    test('handles deleting non-existent place gracefully', async () => {
      (Preferences.get as jest.Mock).mockResolvedValue({
        value: JSON.stringify(mockPlaces),
      });
      (Preferences.set as jest.Mock).mockResolvedValue(undefined);

      await deletePlace('999');

      expect(Preferences.set).toHaveBeenCalledWith({
        key: 'places',
        value: JSON.stringify(mockPlaces),
      });
    });
  });
});
