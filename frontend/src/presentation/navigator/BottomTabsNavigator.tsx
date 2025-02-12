import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoritesScreen} from '../screens/favourites/FavoritesScreen.tsx';
import {ReservationsScreen} from '../screens/reservations/ReservationsScreen.tsx';
import {GenericIcon} from '../icons/GenericIcon.tsx';
import {HomeStackNavigator} from './HomeStackNavigator.tsx';
import {SettingsStackNavigator} from './SettingsStackNavigator.tsx';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  // explore (home), favourites, reservations, settings
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Explore"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="compass-outline" color={color} />
          ),
        }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="favorites"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="heart-outline" color={color} />
          ),
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="reservations"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="ticket-outline" color={color} />
          ),
        }}
        component={ReservationsScreen}
      />
      <Tab.Screen
        name="settings"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="settings-outline" color={color} />
          ),
        }}
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};
