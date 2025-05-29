import {Tour} from '../../domain/entities/tour';
import {create} from 'zustand/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiClient} from '../../infrastructure/api/apiClient';

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
      const {favoriteTours} = state;
      const exists = favoriteTours.some(t => t._id === tour._id);
      if (!exists) {
        const updatedFavorites = [...favoriteTours, tour];
        AsyncStorage.setItem('favoriteTours', JSON.stringify(updatedFavorites));
        return {favoriteTours: updatedFavorites};
      }

      return state;
    });
  },
  removeFavorite: async (tourId: string) => {
    set(state => {
      const updatedFavorites = state.favoriteTours.filter(
        tour => tour._id !== tourId,
      );
      AsyncStorage.setItem('favoriteTours', JSON.stringify(updatedFavorites));
      return {favoriteTours: updatedFavorites};
    });
  },
  loadFavorites: async () => {
    const storedFavorites = await AsyncStorage.getItem('favoriteTours');
    if (storedFavorites) {
      const parsedFavorites: Tour[] = JSON.parse(storedFavorites);

      try {
        // Obtén los tours válidos desde el backend
        const response = await apiClient.get('/tours');
        const validTours: Tour[] = response.data;

        // Filtra los favoritos para incluir solo los tours válidos
        const filteredFavorites = parsedFavorites.filter(favorite =>
          validTours.some(validTour => validTour._id === favorite._id),
        );

        set({favoriteTours: filteredFavorites});
      } catch (error) {
        console.error('Error al cargar tours válidos:', error);
        set({favoriteTours: []});
      }
    }
  },
}));
