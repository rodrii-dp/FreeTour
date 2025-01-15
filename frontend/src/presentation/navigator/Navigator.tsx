import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen.tsx';
import {SignUpScreen} from '../screens/auth/SignUpScreen.tsx';
import {SignInScreen} from '../screens/auth/SignInScreen.tsx';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen.tsx';
import {ResetPasswordScreen} from '../screens/auth/ResetPasswordScreen.tsx';
import {SignupSuccessScreen} from '../screens/auth/SignupSuccessScreen.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SlidesScreen} from '../screens/onboarding/SlidesScreen.tsx';

export type RootStackParams = {
  Slides: undefined;
  Home: undefined;
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: {email: string};
  SignupSuccess: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        await AsyncStorage.clear();
        const value = await AsyncStorage.getItem('isFirstTime');
        console.log(`valor: ${value}, ${typeof value}`);
        if (value === null) {
          console.log('ENTRO Y SETTEO');
          await AsyncStorage.setItem('isFirstTime', 'false');
          setIsFirstTime(true);
        } else {
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
      }
    };

    checkFirstTime();
  }, []);

  console.log(isFirstTime);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isFirstTime ? (
        <Stack.Screen name="Slides" component={SlidesScreen} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Login" component={SignInScreen} />
      {/*<Stack.Screen name="Home" component={HomeScreen} />*/}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
    </Stack.Navigator>
  );
};
