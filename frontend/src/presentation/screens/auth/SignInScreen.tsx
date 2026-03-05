import React, {useState} from 'react';
import {View, Pressable, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';
import {login, LoginData} from '../../../infrastructure/api/authService.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../context/UserContext.tsx';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';

const {width} = Dimensions.get('window');

export const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {fields, error, handleInputChange, validateForm} =
    useFormValidation<LoginData>({
      email: '',
      password: '',
    });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'email' | 'password'
  >();

  const {setUser} = useUser();

  const fontSize = width < 360 ? 16 : 18;

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setLoginError(null);
    try {
      const res = await login(fields as LoginData);
      await AsyncStorage.setItem('access_token', res.access_token);
      await AsyncStorage.setItem('refresh_token', res.refresh_token);
      setUser(res.user);
      navigation.navigate('BottomTabs');
    } catch (err: any) {
      console.error('Error during login:', err);
      setLoginError(
        err?.response?.data?.message || 'Email o contraseña incorrectos',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={globalStyles.container}>
          <BackArrowButton
            onPress={() => navigation.navigate('Slides')}
            style={{marginBottom: 30}}
          />

          <Text
            variant="headlineLarge"
            style={{fontWeight: '800', marginBottom: 8}}>
            Iniciar sesión
          </Text>
          <Text style={{color: '#4c5667', fontSize, marginBottom: 40}}>
            Bienvenido de vuelta
          </Text>

          <Input
            label="Correo electrónico"
            placeholder="hello@example.com"
            value={fields.email}
            onChangeText={value => handleInputChange('email', value)}
            isFocused={focusedInput === 'email'}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Contraseña"
            rightLabel="¿Olvidaste tu contraseña?"
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

          {error && <Message error={error} />}
          {loginError && <Message error={loginError} />}

          <CustomButton
            text={isLoading ? '' : 'Iniciar sesión'}
            textStyle={globalStyles.buttonText}
            style={{marginTop: 20}}
            onPress={handleSignIn}>
            {isLoading && (
              <ActivityIndicator color="#fff" size="small" />
            )}
          </CustomButton>

          <View style={[globalStyles.footer, {marginTop: 24}]}>
            <Text variant="bodyLarge" style={{color: '#818181'}}>
              ¿No tienes cuenta?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text
                variant="bodyLarge"
                style={{
                  color: '#FF5A5F',
                  fontWeight: 'bold',
                }}>
                Crear cuenta
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
