import React, {PropsWithChildren} from 'react';
import {createContext, useContext, useState, useEffect} from 'react';
import type {User} from '../../domain/entities/tour';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateUser: (userData: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const User: User = {
  id: '1',
  name: 'Rodrigo',
  email: 'rrddppl@gmail.com',
  password: 'Marmota123?',
  role: 'cliente',
};

export const UserProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(User);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(prevUser => ({...prevUser!, ...userData}));
    setIsLoading(false);
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(null);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{user, isLoading, error, updateUser, deleteAccount}}>
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
