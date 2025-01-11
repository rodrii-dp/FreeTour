import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {Checkbox} from '../../components/common/Checkbox.tsx';
import {Separator} from '../../components/common/Separator.tsx';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';

export const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {fields, error, handleInputChange, validateForm} = useFormValidation({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(
    null,
  );
  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(false);

  const handleFocus = (input: 'email' | 'password') => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  const handleLogin = () => {
    if (validateForm()) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={{...globalStyles.title, marginBottom: 10}}>
        Iniciar sesión
      </Text>
      <Text style={{color: '#4c5667', fontSize: 18}}>Bienvenido de vuelta</Text>
      <View style={{marginTop: 50}}>
        <Input
          label="Correo electrónico"
          placeholder="hello@example.com"
          value={fields.email}
          onChangeText={value => handleInputChange('email', value)}
          isFocused={focusedInput === 'email'}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
        />
      </View>

      <Input
        label="Contraseña"
        rightLabel="Olvidaste tu contraseña?"
        onPressRightLabel={() => navigation.navigate('ForgotPassword')}
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

      <Checkbox
        title="Mantener mi sesión iniciada"
        isChecked={isCheckedCheckbox}
        toggle={() => setIsCheckedCheckbox(!isCheckedCheckbox)}
      />

      <Pressable
        style={[globalStyles.button, {marginBottom: 30}]}
        onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
      </Pressable>

      <Separator text="o iniciar sesión con" />

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
