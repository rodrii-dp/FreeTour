import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {Stop, Tour} from '../../domain/entities/tour.ts';
import {TourDetailsScreen} from '../screens/tour/TourDetailsScreen.tsx';
import {MapScreen} from '../screens/tour/MapScreen.tsx';

export type HomeStackParamList = {
  Home: undefined;
  TourDetails: {tour: Tour};
  Map: {stops: Stop[]};
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
    <Stack.Screen name="Map" component={MapScreen} />
  </Stack.Navigator>
);
