import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {isValidEmail} from '../../../utils/validateEmail.ts';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      setError('Introduce una dirección de correo electrónico');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Introduce una dirección de correo electrónico válida');
      return;
    }

    navigation.navigate('ResetPassword', {email});
    setError('');
  };

  return (
    <View style={globalStyles.container}>
      <BackArrowButton
        onPress={() => navigation.goBack()}
        style={{marginBottom: 50}}
      />
      <View style={{marginBottom: 30}}>
        <Text style={{...globalStyles.title, marginBottom: 10}}>
          ¿Olvidaste tu contraseña?
        </Text>
        <Text style={{color: '#4c5667', fontSize: 18}}>
          Introduzca su dirección de correo electrónico para obtener el enlace
          de restablecimiento de contraseña
        </Text>
      </View>

      <View style={{marginTop: 50}}>
        <Text style={{...globalStyles.label, fontWeight: 'bold'}}>
          Correo electrónico
        </Text>
        <TextInput
          style={{...globalStyles.input, marginBottom: 30}}
          placeholder="hello@example.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
        <Pressable style={globalStyles.button} onPress={handleResetPassword}>
          <Text style={globalStyles.buttonText}>Reestablecer contraseña</Text>
        </Pressable>
      </View>

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
            textAlign: 'center',
          }}>
          Crear cuenta
        </Text>
      </Pressable>
      {error && <Message error={error} />}
    </View>
  );
};
