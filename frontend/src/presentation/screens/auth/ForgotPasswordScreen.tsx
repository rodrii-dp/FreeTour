import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {isValidEmail} from '../../../utils/validations.ts';
import {Input} from '../../components/common/Input.tsx';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState<'email' | null>(null);

  const handleFocus = (input: 'email') => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  const handleResetPassword = () => {
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
          Introduce tu dirección de correo electrónico para obtener el enlace de
          restablecimiento de contraseña
        </Text>
      </View>

      <Input
        label="Correo electrónico"
        placeholder="hello@example.com"
        value={email}
        onChangeText={setEmail}
        isFocused={focusedInput === 'email'}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />
      <Pressable style={globalStyles.button} onPress={handleResetPassword}>
        <Text style={globalStyles.buttonText}>Restablecer contraseña</Text>
      </Pressable>

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
