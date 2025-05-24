import type { Tour } from '../../entities/tour';

export interface ITourService {
  getTours(filters?: {
    title?: string;
    category?: string;
    providerId?: string;
    limit?: string;
  }): Promise<Tour[]>;

  getTourById(id: string): Promise<Tour>;

  getMostPopularsByCategory(category: string, limit?: number): Promise<Tour[]>;

  createTour(tour: Partial<Tour>): Promise<Tour>;

  updateTour(id: string, providerId: string, tour: Partial<Tour>): Promise<Tour>;

  deleteTour(id: string): Promise<any>;
}
