import {apiClient} from './apiClient';
import type {Tour} from '../../domain/entities/tour';

export const tourService = {
  getTours: async (filters?: {
    title?: string;
    category?: string;
    providerId?: string;
    limit?: string;
    onlyDiscounted?: boolean;
  }) => {
    const params = {
      ...filters,
      limit: filters?.limit || '5',
    };

    const response = await apiClient.get('/tours', {params});
    return response.data;
  },

  getTourById: async (id: string) => {
    const response = await apiClient.get(`/tours/${id}`);
    return response.data;
  },

  getMostPopularsByCategory: async (category: string, limit?: number) => {
    limit = limit || 5;
    const response = await apiClient.get(`/tours/popular/${category}`, {
      params: {limit},
    });
    return response.data;
  },

  getMostRecent: async (limit?: number) => {
    const response = await apiClient.get('/tours/recent', {
      params: {limit: limit || 5},
    });
    return response.data;
  },

  createTour: async (tour: Partial<Tour>) => {
    const response = await apiClient.post('/tours', tour);
    return response.data;
  },

  updateTour: async (id: string, providerId: string, tour: Partial<Tour>) => {
    const response = await apiClient.patch(`/tours/${id}`, {
      providerId,
      ...tour,
    });
    return response.data;
  },

  deleteTour: async (id: string) => {
    const response = await apiClient.delete(`/tours/${id}`);
    return response.data;
  },

  getReviewsByTour: async (tourId: string) => {
    const response = await apiClient.get(`/reviews/tour/${tourId}`);
    return response.data;
  },

  createReview: async (review: any) => {
    const response = await apiClient.post('/reviews', review);
    return response.data;
  },
};

// Mapea _id a id en las reviews de un tour
export function mapReviews(
  reviews: any[],
): import('../../domain/entities/tour').Review[] {
  return reviews.map(r => ({
    id: r._id || r.id,
    title: r.title,
    userId: r.userId,
    date: r.date,
    rating: r.rating,
    comment: r.comment,
  }));
}
