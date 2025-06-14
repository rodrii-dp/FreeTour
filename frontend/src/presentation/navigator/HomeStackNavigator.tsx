import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {Stop, Tour} from '../../domain/entities/tour.ts';
import {TourDetailsScreen} from '../screens/tour/TourDetailsScreen.tsx';
import {MapScreen} from '../screens/tour/MapScreen.tsx';
import {CheckoutScreen} from '../screens/tour/CheckoutScreen.tsx';
import {SearchResultsScreen} from '../screens/search/SearchResultsScreen.tsx';
import {ProviderDetailsScreen} from '../screens/provider/ProviderDetailsScreen';
import {TourReviewsScreen} from '../screens/review/TourReviewsScreen';

export type HomeStackParamList = {
  Home: undefined;
  TourDetails: {tour: Tour};
  Map: {stops: Stop[]};
  Checkout: {tour: Tour; selectedDate: string};
  SearchResults: any;
  ProviderDetails: {providerId: string};
  TourReviews: {tourId: string};
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="TourDetails"
      component={TourDetailsScreen}
      options={{title: 'Detalles del Tour'}}
    />
    <Stack.Screen name="Map" component={MapScreen} options={{title: 'Mapa'}} />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{title: 'Checkout'}}
    />
    <Stack.Screen
      name="SearchResults"
      component={SearchResultsScreen}
      options={{title: 'Resultados de Búsqueda', headerShown: false}}
    />
    <Stack.Screen
      name="ProviderDetails"
      component={ProviderDetailsScreen}
      options={{title: 'Proveedor'}}
    />
    <Stack.Screen
      name="TourReviews"
      component={TourReviewsScreen}
      options={{title: 'Reseñas del Tour'}}
    />
  </Stack.Navigator>
);
