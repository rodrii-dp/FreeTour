import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(
    null,
  );
  const [error, setError] = useState('');

  const handleFocus = (input: 'email' | 'password') => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

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
          value={email}
          onChangeText={setEmail}
          isFocused={focusedInput === 'email'}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
        />
      </View>

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

      <Pressable
        style={globalStyles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
      </Pressable>
      {error && <Message error={error} />}
    </View>
  );
};
