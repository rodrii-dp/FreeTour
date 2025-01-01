import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './presentation/navigator/Navigator.tsx';

export const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};
