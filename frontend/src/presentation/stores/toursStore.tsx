import {Tour} from '../../domain/entities/tour';
import {create} from 'zustand/react';

interface ToursState {
  tours: Tour[];
  setTours: (tours: Tour[]) => void;
}

export const useToursStore = create<ToursState>()(set => ({
  tours: [],
  setTours: (tours: Tour[]) => set({tours}),
}));
