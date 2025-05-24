import {apiClient} from './apiClient';
import type {User} from '../../domain/entities/user';

export const userService = {
  createUser: async (user: Partial<User>) => {
    const response = await apiClient.post('/users', user);
    return response.data;
  },

  findByEmail: async (email: string) => {
    const response = await apiClient.get(`/users/${email}`);
    return response.data;
  },
};
