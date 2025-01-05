import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {GenericIcon} from '../../icons/Icon.tsx';
import {Message} from '../../components/common/Message.tsx';
import {isValidEmail, isValidPassword} from '../../../utils/validations.ts';
import {Input} from '../../components/common/Input.tsx';

export const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    'name' | 'email' | 'password' | null
  >(null);
  const [error, setError] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleFocus = (input: 'name' | 'email' | 'password') =>
    setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);
  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('Rellena todos los campos');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Introduce una dirección de correo electrónico válida');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Contraseña inválida');
      return;
    }

    navigation.navigate('SignupSuccess');
    setError('');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Crear cuenta</Text>
      <Input
        label="Nombre"
        placeholder="John Doe"
        value={name}
        onChangeText={setName}
        isFocused={focusedInput === 'name'}
        onFocus={() => handleFocus('name')}
        onBlur={handleBlur}
        keyboardType="default"
      />
      <Input
        label="Correo electrónico"
        placeholder="hello@example.com"
        value={email}
        onChangeText={setEmail}
        isFocused={focusedInput === 'email'}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />
      <Input
        label="Contraseña"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isFocused={focusedInput === 'password'}
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
        isPassword
        showPassword={showPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
      />

      <Text style={globalStyles.terms}>
        Al continuar, aceptas nuestros{' '}
        <Text style={globalStyles.link}>términos y condiciones</Text>
      </Text>

      <Pressable style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Registrarse</Text>
      </Pressable>

      <Text style={globalStyles.or}>O</Text>

      <Pressable
        style={globalStyles.googleButton}
        onPress={() => console.log('Pressed')}>
        <View style={globalStyles.googleButtonContent}>
          <GenericIcon name="logo-google" style={{marginRight: 15}} />
          <Text style={globalStyles.googleButtonText}>
            Continuar con Google
          </Text>
        </View>
      </Pressable>

      <View style={globalStyles.footer}>
        <Text style={{fontSize: 16, color: '#818181'}}>
          ¿Ya tienes una cuenta?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={globalStyles.link}>Inicia sesión aquí</Text>
        </Pressable>
      </View>
      <View />

      {error && <Message error={error} />}
    </View>
  );
};
