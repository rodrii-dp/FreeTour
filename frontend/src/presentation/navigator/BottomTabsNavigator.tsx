import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoritesScreen} from '../screens/favorites/FavoritesScreen.tsx';
import {BookingsScreen} from '../screens/reservations/BookingsScreen.tsx';
import {GenericIcon} from '../icons/GenericIcon.tsx';
import {HomeStackNavigator} from './HomeStackNavigator.tsx';
import {SettingsStackNavigator} from './SettingsStackNavigator.tsx';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff5a5f', // Color para el texto e icono activo
        tabBarInactiveTintColor: '#7F8C8D', // Color para el texto e icono inactivo (opcional)
      }}>
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
        name="Favorites"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="heart-outline" color={color} />
          ),
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="Reservations"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="ticket-outline" color={color} />
          ),
        }}
        component={BookingsScreen}
      />
      <Tab.Screen
        name="Settings"
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
