import 'react-native-get-random-values';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './presentation/navigation/Navigator.tsx';
import {PaperProvider} from 'react-native-paper';
import {UserProvider} from './presentation/context/UserContext.tsx';

export const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <UserProvider>
          <Navigator />
        </UserProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};
