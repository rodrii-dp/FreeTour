import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {Stop, Tour} from '../../domain/entities/tour.ts';
import {TourDetailsScreen} from '../screens/tour/TourDetailsScreen.tsx';
import {MapScreen} from '../screens/tour/MapScreen.tsx';
import {CalendarScreen} from '../screens/tour/CalendarScreen.tsx';

export type HomeStackParamList = {
  Home: undefined;
  TourDetails: {tour: Tour};
  Map: {stops: Stop[]};
  Calendar: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Map" component={MapScreen} options={{title: 'Mapa'}} />
    <Stack.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{title: 'Disponibilidad'}}
    />
    <Stack.Screen
      name="TourDetails"
      component={TourDetailsScreen}
      options={{title: 'Detalles del Tour'}}
    />
  </Stack.Navigator>
);
