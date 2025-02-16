import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileDetailsScreen} from '../screens/profile/ProfileDetailsScreen.tsx';
import {SettingsScreen} from '../screens/settings/SettingsScreen.tsx';

export type ProfileStackParamList = {
  Ajustes: undefined;
  ProfileDetails: undefined; // {tourId: string};
};

const Stack = createStackNavigator<ProfileStackParamList>();

export const SettingsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Ajustes"
      component={SettingsScreen}
      options={{headerLeft: () => null}}
    />
    <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
  </Stack.Navigator>
);
