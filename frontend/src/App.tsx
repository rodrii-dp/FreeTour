import 'react-native-get-random-values';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './presentation/navigator/Navigator.tsx';
import {PaperProvider} from 'react-native-paper';

export const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
};
