import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
// @ts-ignore
import Congratulations from '../../assets/congratulations.svg';

export const SignupSuccessScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={globalStyles.container}>
      <BackArrowButton
        onPress={() => navigation.goBack()}
        style={{marginBottom: 50}}
      />

      <Congratulations style={{alignSelf: 'center'}} width={400} height={400} />
      <Text
        style={{...globalStyles.title, marginBottom: 20, textAlign: 'center'}}>
        Felicidades!
      </Text>
      <Text style={{color: '#4c5667', fontSize: 18, textAlign: 'center'}}>
        Te hemos enviado un email de verificación, por favor revisa tu buzón y
        sigue las instrucciones para verificar tu cuenta.
      </Text>
      <Text
        style={{
          color: '#4c5667',
          fontSize: 18,
          textAlign: 'center',
          marginTop: 10,
        }}>
        Gracias por registrarte con nosotros!
      </Text>

      <Pressable
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 50,
        }}
        onPress={() => navigation.navigate('Signup')}>
        <Text
          style={{
            ...globalStyles.link,
            fontSize: 18,
            marginBottom: 50,
            textAlign: 'center',
          }}>
          Iniciar sesión aquí
        </Text>
      </Pressable>
    </View>
  );
};
