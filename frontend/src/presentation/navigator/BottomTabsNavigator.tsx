import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen.tsx';
import {FavoritesScreen} from '../screens/favourites/FavoritesScreen.tsx';
import {ReservationsScreen} from '../screens/reservations/ReservationsScreen.tsx';
import {ProfileScreen} from '../screens/profile/ProfileScreen.tsx';
import {GenericIcon} from '../icons/GenericIcon.tsx';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  // explore (home), favourites, reservations, profile
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="compass-outline" color={color} />
          ),
        }}
        component={HomeScreen}
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
        name="profile"
        options={{
          tabBarIcon: ({color}) => (
            <GenericIcon name="person-outline" color={color} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

/*
  <Tab.Screen
    name="Tab2"
    options={{
      title: 'Tab2',
      tabBarIcon: ({color}) => (
        <IonIcon name="airplane-outline" color={color} />
      ),
    }}
    component={TopTabsNavigator}
  />
 */
