import React from 'react';
import {View, Pressable} from 'react-native';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {fields, error, validateForm, handleInputChange} = useFormValidation({
    email: '',
  });
  const {focusedInput, handleFocus, handleBlur} = useFocus<'email'>();

  const handleResetPassword = () => {
    if (!validateForm()) {
      return;
    }

    navigation.navigate('ResetPassword', {email: fields.email});
  };

  return (
    <View style={globalStyles.container}>
      <BackArrowButton
        onPress={() => navigation.goBack()}
        style={{marginBottom: 50}}
      />
      <View style={{marginBottom: 30}}>
        <Text
          variant="headlineLarge"
          style={{fontWeight: '800', marginBottom: 50}}>
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
        value={fields.email}
        onChangeText={value => handleInputChange('email', value)}
        isFocused={focusedInput === 'email'}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />

      <CustomButton
        style={globalStyles.button}
        onPress={handleResetPassword}
        text="Restablecer contraseña"
        textStyle={{
          color: '#fefeff',
          fontWeight: '500',
        }}
      />

      <Pressable
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 50,
        }}
        onPress={() => navigation.navigate('Signup')}>
        <Text
          variant="bodyLarge"
          style={{color: '#2f4eff', textAlign: 'center', fontWeight: 'bold'}}>
          Crear cuenta
        </Text>
      </Pressable>
      {error && <Message error={error} />}
    </View>
  );
};
