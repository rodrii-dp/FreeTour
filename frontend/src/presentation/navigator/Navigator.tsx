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
import {Text} from 'react-native';
import {BottomTabsNavigator} from './BottomTabsNavigator.tsx';

export type RootStackParams = {
  Slides: undefined;
  BottomTabs: undefined;
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  ResetPassword: {email: string};
  SignupSuccess: undefined;
};
const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkAppFirstLaunch = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData === null) {
        setIsAppFirstLaunched(true);
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    };

    checkAppFirstLaunch();
  }, []);

  if (isAppFirstLaunched === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAppFirstLaunched && (
        <Stack.Screen name="Slides" component={SlidesScreen} />
      )}
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
    </Stack.Navigator>
  );
};
