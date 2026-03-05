import React, {useState} from 'react';
import {
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {SeparatorWithText} from '../../components/common/SeparatorWithText.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {
  register,
  RegisterData,
} from '../../../infrastructure/api/authService.ts';

const {height} = Dimensions.get('window');

type RegisterFields = RegisterData & {confirmPassword: string};

export const SignUpScreen = () => {
  const {fields, error, handleInputChange, validateForm} =
    useFormValidation<RegisterFields>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'name' | 'email' | 'password' | 'confirmPassword'
  >();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }
    if (fields.password !== fields.confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }
    setRegisterError(null);
    setIsLoading(true);
    try {
      await register({
        name: fields.name,
        email: fields.email,
        password: fields.password,
      });
      navigation.navigate('SignupSuccess');
    } catch (err: any) {
      console.error(err);
      setRegisterError(
        err?.response?.data?.message || 'Error al crear la cuenta. Inténtalo de nuevo.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: '#ffffff',
          marginTop: height * 0.02,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        <BackArrowButton
          onPress={() => navigation.navigate('Slides')}
          style={{marginBottom: 30}}
        />

        <Text
          variant="headlineLarge"
          style={{marginBottom: 32, fontWeight: '800'}}>
          Crear cuenta
        </Text>

        <Input
          label="Nombre"
          placeholder="John Doe"
          value={fields.name}
          onChangeText={value => handleInputChange('name', value)}
          isFocused={focusedInput === 'name'}
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          autoCapitalize="words"
        />
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
          placeholder="Mínimo 8 caracteres"
          value={fields.password}
          onChangeText={value => handleInputChange('password', value)}
          isFocused={focusedInput === 'password'}
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
          isPassword
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />
        <Input
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          value={fields.confirmPassword}
          onChangeText={value => handleInputChange('confirmPassword', value)}
          isFocused={focusedInput === 'confirmPassword'}
          onFocus={() => handleFocus('confirmPassword')}
          onBlur={handleBlur}
          isPassword
          showPassword={showConfirmPassword}
          togglePasswordVisibility={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />

        <Text
          variant="bodyLarge"
          style={{
            color: '#4c5667',
            marginTop: 4,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Al continuar, aceptas nuestros{' '}
          <Text
            variant="bodyLarge"
            style={{color: '#FF5A5F', fontWeight: 'bold'}}>
            términos y condiciones
          </Text>
        </Text>

        {error && <Message error={error} />}
        {registerError && <Message error={registerError} />}

        <CustomButton
          text={isLoading ? '' : 'Registrarse'}
          textStyle={globalStyles.buttonText}
          style={{marginBottom: 20}}
          onPress={handleSignUp}>
          {isLoading && <ActivityIndicator color="#fff" size="small" />}
        </CustomButton>

        <SeparatorWithText text="o" />

        <View style={[globalStyles.footer, {marginTop: 4}]}>
          <Text variant="bodyLarge" style={{color: '#818181'}}>
            ¿Ya tienes cuenta?{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate('Signin')}>
            <Text
              variant="bodyLarge"
              style={{
                color: '#FF5A5F',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Inicia sesión aquí
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
