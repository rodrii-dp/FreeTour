import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileDetailsScreen} from '../screens/profile/ProfileDetailsScreen.tsx';
import {SettingsScreen} from '../screens/settings/SettingsScreen.tsx';

export type SettingsStackParamList = {
  Ajustes: undefined;
  Perfil: undefined; // {tourId: string};
};

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Ajustes"
      component={SettingsScreen}
      options={{headerLeft: () => null}}
    />
    <Stack.Screen name="Perfil" component={ProfileDetailsScreen} />
  </Stack.Navigator>
);
