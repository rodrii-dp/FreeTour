import React, {useState} from 'react';
import {
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {SeparatorWithText} from '../../components/common/SeparatorWithText.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';

const {width, height} = Dimensions.get('window');

export const SignUpScreen = () => {
  const {fields, error, handleInputChange, validateForm} = useFormValidation({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'name' | 'email' | 'password'
  >();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleSignUp = () => {
    if (validateForm()) {
      navigation.navigate('SignupSuccess');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          padding: 20,
          backgroundColor: '#ffffff',
          marginTop: height * 0.02,
        }}
        showsVerticalScrollIndicator={false}>
        <Text
          variant="headlineLarge"
          style={{marginBottom: 40, fontWeight: '800'}}>
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

        <Text
          variant="bodyLarge"
          style={{
            color: '#4c5667',
            marginTop: 5,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Al continuar, aceptas nuestros{' '}
          <Text
            variant="bodyLarge"
            style={{color: '#FF5A5F', textAlign: 'center', fontWeight: 'bold'}}>
            términos y condiciones
          </Text>
        </Text>

        <CustomButton
          text="Registrarse"
          textStyle={globalStyles.buttonText}
          style={{marginBottom: 30}}
          onPress={handleSignUp}
        />

        <SeparatorWithText text="o" />

        <Pressable
          style={[globalStyles.googleButton, {marginTop: 30}]}
          onPress={() => console.log('Pressed')}>
          <View style={globalStyles.googleButtonContent}>
            <GenericIcon name="logo-google" style={{marginRight: 15}} />
            <Text variant="bodyLarge" style={{color: '#444'}}>
              Continuar con Google
            </Text>
          </View>
        </Pressable>

        {/* Spaced footer that should always be visible */}
        <View
          style={[
            globalStyles.footer,
            {
              marginTop: 'auto', // Push to bottom of available space
              marginBottom: 20,
              paddingBottom: 10,
            },
          ]}>
          <Text variant="bodyLarge" style={{color: '#818181'}}>
            ¿Ya tienes una cuenta?{' '}
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

        {error && <Message error={error} />}
      </ScrollView>
    </SafeAreaView>
  );
};
