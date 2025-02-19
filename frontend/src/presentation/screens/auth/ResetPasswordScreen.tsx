import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';

export const ResetPasswordScreen = () => {
  const {fields, error, handleInputChange, validatePasswords} =
    useFormValidation({
      password: '',
      confirmPassword: '',
    });

  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'first' | 'second'
  >();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleResetPassword = () => {
    if (validatePasswords(fields.password, fields.confirmPassword)) {
      navigation.navigate('Signin');
    }
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
          Restablecer contraseña
        </Text>
        <Text style={{color: '#4c5667', fontSize: 18}}>
          Introduce tu nueva contraseña dos veces a continuación para
          restablecer una nueva contraseña
        </Text>
      </View>

      <View style={{marginTop: 50}}>
        <Input
          label="Introduce tu nueva contraseña"
          placeholder="152@@##PAss"
          value={fields.password}
          onChangeText={value => handleInputChange('password', value)}
          isFocused={focusedInput === 'first'}
          onFocus={() => handleFocus('first')}
          onBlur={handleBlur}
          isPassword
          showPassword={showFirstPassword}
          togglePasswordVisibility={() =>
            setShowFirstPassword(!showFirstPassword)
          }
        />
      </View>
      <Input
        label="Vuelve a introducir tu nueva contraseña"
        placeholder="152@@##PAss"
        value={fields.confirmPassword}
        onChangeText={value => handleInputChange('confirmPassword', value)}
        isFocused={focusedInput === 'second'}
        onFocus={() => handleFocus('second')}
        onBlur={handleBlur}
        isPassword
        showPassword={showSecondPassword}
        togglePasswordVisibility={() =>
          setShowSecondPassword(!showSecondPassword)
        }
      />

      <CustomButton
        text="Restablecer contraseña"
        textStyle={globalStyles.buttonText}
        style={globalStyles.button}
        onPress={handleResetPassword}
      />

      {error && <Message error={error} />}

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
    </View>
  );
};
