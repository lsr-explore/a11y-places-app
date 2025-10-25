// utils/storageApi.ts

import { createContext, useContext } from 'react';
import type { Place } from '../types/Place';
import { deletePlace, getPlaces } from './storage';

export interface StorageAPI {
  getPlaces: () => Promise<Place[]>;
  deletePlace: (id: string) => Promise<void>;
}

const defaultApi: StorageAPI = { getPlaces, deletePlace };

export const StorageContext = createContext<StorageAPI>(defaultApi);
export const useStorage = () => useContext(StorageContext);
