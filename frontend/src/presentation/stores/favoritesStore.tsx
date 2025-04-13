import {Tour} from '../../domain/entities/tour';
import {create} from 'zustand/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favoriteTours: Tour[];
  addFavorite: (tour: Tour) => void;
  removeFavorite: (tourId: string) => void;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(set => ({
  favoriteTours: [],
  addFavorite: async (tour: Tour) => {
    set(state => {
      const updatedFavorites = [...state.favoriteTours, tour];
      AsyncStorage.setItem('favoriteTours', JSON.stringify(updatedFavorites));
      return {favoriteTours: updatedFavorites};
    });
  },
  removeFavorite: async (tourId: string) => {
    set(state => {
      const updatedFavorites = state.favoriteTours.filter(
        tour => tour.id !== tourId,
      );
      AsyncStorage.setItem('favoriteTours', JSON.stringify(updatedFavorites));
      return {favoriteTours: updatedFavorites};
    });
  },
  loadFavorites: async () => {
    const storedFavorites = await AsyncStorage.getItem('favoriteTours');
    if (storedFavorites) {
      set({favoriteTours: JSON.parse(storedFavorites)});
    }
  },
}));
