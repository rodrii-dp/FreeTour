import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUpScreen} from '../screens/auth/SignUpScreen.tsx';
import {SignInScreen} from '../screens/auth/SignInScreen.tsx';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen.tsx';
import {ResetPasswordScreen} from '../screens/auth/ResetPasswordScreen.tsx';
import {SignupSuccessScreen} from '../screens/auth/SignupSuccessScreen.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SlidesScreen} from '../screens/onboarding/SlidesScreen.tsx';
import {ActivityIndicator} from 'react-native';
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
    return (
      <ActivityIndicator
        size={32}
        color="#FF5A5F"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      />
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAppFirstLaunched && (
        <Stack.Screen name="Slides" component={SlidesScreen} />
      )}
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Signin" component={SignInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
    </Stack.Navigator>
  );
};
