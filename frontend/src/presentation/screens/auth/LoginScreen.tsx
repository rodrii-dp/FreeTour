import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View>
      <Text>LoginScreen</Text>
      <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={globalStyles.forgotPassword}>
          ¿Has olvidado tu contraseña?
        </Text>
      </Pressable>
    </View>
  );
};
