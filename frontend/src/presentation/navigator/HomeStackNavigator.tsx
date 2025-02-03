import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {TourDetailsScreen} from '../screens/tour/TourDetailsScreen.tsx';

export type HomeStackParamList = {
  Home: undefined;
  TourDetails: {tourId: string};
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
  </Stack.Navigator>
);
