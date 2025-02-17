import React from 'react';
import {View, Pressable, Dimensions} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import type {RootStackParams} from '../../navigator/Navigator.tsx';
import {Text} from 'react-native-paper';

// @ts-ignore
import Congratulations from '../../assets/congratulations.svg';

const {width, height} = Dimensions.get('window');

export const SignupSuccessScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const imageSize = Math.min(width * 0.6, 300);
  const fontSize = width < 360 ? 16 : 18;

  return (
    <View style={[globalStyles.container, {justifyContent: 'flex-start'}]}>
      <BackArrowButton
        onPress={() => navigation.goBack()}
        style={{marginTop: height * 0.02}}
      />

      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Congratulations
          style={{alignSelf: 'center'}}
          width={imageSize}
          height={imageSize}
        />
        <Text
          style={{
            ...globalStyles.title,
            marginVertical: height * 0.01,
            textAlign: 'center',
            fontSize: Math.min(width * 0.07, 28),
          }}>
          ¡Felicidades!
        </Text>
        <Text
          style={{
            color: '#4c5667',
            fontSize: fontSize,
            textAlign: 'center',
            paddingHorizontal: width * 0.05,
            marginBottom: height * 0.01,
          }}>
          Te hemos enviado un email de verificación, por favor revisa tu buzón y
          sigue las instrucciones para verificar tu cuenta.
        </Text>
        <Text
          style={{
            color: '#4c5667',
            fontSize: fontSize,
            textAlign: 'center',
            paddingHorizontal: width * 0.05,
          }}>
          ¡Gracias por registrarte con nosotros!
        </Text>
      </View>

      <Pressable
        style={{
          alignSelf: 'center',
          marginBottom: height * 0.05,
        }}
        onPress={() => navigation.navigate('Signin')}>
        <Text
          style={{
            ...globalStyles.link,
            fontSize: fontSize,
            textAlign: 'center',
          }}>
          Iniciar sesión aquí
        </Text>
      </Pressable>
    </View>
  );
};
