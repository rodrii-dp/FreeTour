import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import type {User} from '../../domain/entities/tour';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiClient} from '../../infrastructure/api/apiClient';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateUser: (userData: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: PropsWithChildren) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const autoLogin = async () => {
      setIsLoading(true);
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const {data} = await apiClient.post('/auth/refresh', {
            refresh_token: refreshToken,
          });
          await AsyncStorage.setItem('access_token', data.access_token);

          const userRes = await apiClient.get('/auth/me', {
            headers: {Authorization: `Bearer ${data.access_token}`},
          });
          setUserState(userRes.data);
        } catch (e) {
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          setUserState(null);
        }
      }
      setIsLoading(false);
    };
    autoLogin();
  }, []);

  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserState(prevUser => ({...prevUser!, ...userData}));
    setIsLoading(false);
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserState(null);
    setIsLoading(false);
  };

  // Exponemos setUser para poder actualizar el usuario desde fuera
  const setUser = (user: User | null) => {
    setUserState(user);
  };

  return (
    <UserContext.Provider
      value={{user, isLoading, error, updateUser, deleteAccount, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
