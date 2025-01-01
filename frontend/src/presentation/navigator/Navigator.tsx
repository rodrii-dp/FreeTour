import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen.tsx';
import {RegisterScreen} from '../screens/auth/RegisterScreen.tsx';
import {LoginScreen} from '../screens/auth/LoginScreen.tsx';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen.tsx';
import {ResetPasswordScreen} from '../screens/auth/ResetPasswordScreen.tsx';

export type RootStackParams = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: {email: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
