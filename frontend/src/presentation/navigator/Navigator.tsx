import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen.tsx';
import {SignUpScreen} from '../screens/auth/SignUpScreen.tsx';
import {SignInScreen} from '../screens/auth/SignInScreen.tsx';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen.tsx';
import {ResetPasswordScreen} from '../screens/auth/ResetPasswordScreen.tsx';
import {SignupSuccessScreen} from '../screens/auth/SignupSuccessScreen.tsx';

export type RootStackParams = {
  Home: undefined;
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: {email: string};
  SignupSuccess: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
    </Stack.Navigator>
  );
};
