import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {Separator} from '../../components/common/Separator.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';

export const SignupScreen = () => {
  const {fields, error, handleInputChange, validateForm} = useFormValidation({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    'name' | 'email' | 'password' | null
  >(null);

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleFocus = (input: 'name' | 'email' | 'password') =>
    setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);
  const handleRegister = () => {
    if (validateForm()) {
      navigation.navigate('SignupSuccess');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Crear cuenta</Text>
      <Input
        label="Nombre"
        placeholder="John Doe"
        value={fields.name}
        onChangeText={value => handleInputChange('name', value)}
        isFocused={focusedInput === 'name'}
        onFocus={() => handleFocus('name')}
        onBlur={handleBlur}
      />
      <Input
        label="Correo electrónico"
        placeholder="hello@example.com"
        value={fields.email}
        onChangeText={value => handleInputChange('email', value)}
        isFocused={focusedInput === 'email'}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />
      <Input
        label="Contraseña"
        placeholder="Password"
        value={fields.password}
        onChangeText={value => handleInputChange('password', value)}
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

      <Pressable
        style={[globalStyles.button, {marginBottom: 30}]}
        onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Registrarse</Text>
      </Pressable>

      <Separator text="o" />

      <Pressable
        style={[globalStyles.googleButton, {marginTop: 30}]}
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
