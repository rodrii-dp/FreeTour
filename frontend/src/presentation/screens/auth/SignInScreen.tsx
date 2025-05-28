import React, {useState} from 'react';
import {View, Pressable, ScrollView, Dimensions} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {Checkbox} from '../../components/common/Checkbox.tsx';
import {SeparatorWithText} from '../../components/common/SeparatorWithText.tsx';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';
import {login, LoginData} from '../../../infrastructure/api/authService.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../context/UserContext.tsx';

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
  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'email' | 'password'
  >();

  const {setUser} = useUser();

  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(false);

  const fontSize = width < 360 ? 16 : 18;

  const handleSignIn = async () => {
    if (validateForm()) {
      try {
        setLoginError(null);
        const res = await login(fields as LoginData);
        await AsyncStorage.setItem('access_token', res.access_token);
        await AsyncStorage.setItem('refresh_token', res.refresh_token);
        setUser(res.user);
        navigation.navigate('BottomTabs');
      } catch (err: any) {
        console.error('Error during login:', err);
        setLoginError(
          err?.response?.data?.message || 'Error al iniciar sesión',
        );
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={globalStyles.container}>
          <Text
            variant="headlineLarge"
            style={{fontWeight: '800', marginBottom: 10}}>
            Iniciar sesión
          </Text>
          <Text style={{color: '#4c5667', fontSize}}>Bienvenido de vuelta</Text>
          <View style={{marginTop: 50}}>
            <Input
              label="Correo electrónico"
              placeholder="hello@example.com"
              value={fields.email}
              onChangeText={value => handleInputChange('email', value)}
              isFocused={focusedInput === 'email'}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              keyboardType="email-address"
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

          <CustomButton
            text="Iniciar sesión"
            textStyle={globalStyles.buttonText}
            style={{marginTop: 30}}
            onPress={handleSignIn}
          />

          <SeparatorWithText text="o iniciar sesión con" />

          <Pressable
            style={globalStyles.googleButton}
            onPress={() => console.log('Pressed')}>
            <View style={globalStyles.googleButtonContent}>
              <GenericIcon name="logo-google" style={{marginRight: 15}} />
              <Text variant="bodyLarge" style={{color: '#444'}}>
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
              variant="bodyLarge"
              style={{
                color: '#FF5A5F',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Crear cuenta
            </Text>
          </Pressable>

          {error && <Message error={error} />}
          {loginError && <Message error={loginError} />}
        </View>
      </ScrollView>
    </View>
  );
};
