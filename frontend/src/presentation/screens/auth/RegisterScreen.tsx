import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {GenericIcon} from '../../icons/Icon.tsx';
import {PasswordInput} from '../../components/common/PasswordInput.tsx';
import {Message} from '../../components/common/Message.tsx';

export const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'first' | 'second' | null>(
    null,
  );
  const [error, setError] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleFocus = (input: 'first' | 'second') => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);
  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('Rellena todos los campos');
      return;
    }

    navigation.navigate('Login');
    setError('');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Crear cuenta</Text>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Nombre</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="John Doe"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={value => setName(value)}
          keyboardType="default"
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Correo Electrónico</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="hello@example.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <PasswordInput
          label="Contraseña"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isFocused={focusedInput === 'first'}
          onFocus={() => handleFocus('first')}
          onBlur={handleBlur}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />
        <Pressable
          style={globalStyles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={{color: '#1e88e5', fontWeight: 'bold'}}>
            {showPassword ? (
              <GenericIcon name="eye-outline" color="#818181" />
            ) : (
              <GenericIcon name="eye-off-outline" color="#818181" />
            )}
          </Text>
        </Pressable>
      </View>

      <Text style={globalStyles.terms}>
        Al continuar, aceptas nuestros{' '}
        <Text style={globalStyles.link}>términos y condiciones</Text>
      </Text>

      <Pressable
        style={globalStyles.button}
        onPress={() => console.log('Pressed')}>
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
        <Pressable onPress={handleRegister}>
          <Text style={globalStyles.link}>Inicia sesión aquí</Text>
        </Pressable>
      </View>
      <View />

      {error && <Message error={error} />}
    </View>
  );
};
