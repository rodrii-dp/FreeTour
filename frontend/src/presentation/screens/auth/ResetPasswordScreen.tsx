import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {GenericIcon} from '../../icons/Icon.tsx';
import {PasswordInput} from '../../components/common/PasswordInput.tsx';
import {Message} from '../../components/common/Message.tsx';

// interface Props extends StackScreenProps<RootStackParams, 'ResetPassword'> {}

export const ResetPasswordScreen = () =>
  // {route}: Props
  {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    // const {email} = route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showFirstPassword, setShowFirstPassword] = useState(false);
    const [showSecondPassword, setShowSecondPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<'first' | 'second' | null>(
      null,
    );
    const [error, setError] = useState('');

    const handleFocus = (input: 'first' | 'second') => setFocusedInput(input);
    const handleBlur = () => setFocusedInput(null);
    const handleResetPassword = () => {
      if (!password || !confirmPassword) {
        setError('Rellena todos los campos');
        return;
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas deben coincidir');
        return;
      }

      if (password === confirmPassword) {
        navigation.navigate('Login');
      }
    };

    return (
      <View style={globalStyles.container}>
        <BackArrowButton
          onPress={() => navigation.goBack()}
          style={{marginBottom: 50}}
        />
        <View style={{marginBottom: 30}}>
          <Text style={{...globalStyles.title, marginBottom: 10}}>
            Reestablecer contraseña
          </Text>
          <Text style={{color: '#4c5667', fontSize: 18}}>
            Introduce tu dirección de correo electrónico para obtener el enlace
            de restablecimiento de contraseña
          </Text>
        </View>

        <View style={[globalStyles.inputContainer, {marginTop: 50}]}>
          <PasswordInput
            label="Introduce tu nueva contraseña"
            placeholder="152@@##PAss"
            value={password}
            onChangeText={setPassword}
            isFocused={focusedInput === 'first'}
            onFocus={() => handleFocus('first')}
            onBlur={handleBlur}
            showPassword={showFirstPassword}
            togglePasswordVisibility={() =>
              setShowFirstPassword(!showFirstPassword)
            }
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <PasswordInput
            label="Vuelve a introducir tu nueva contraseña"
            placeholder="152@@##PAss"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isFocused={focusedInput === 'second'}
            onFocus={() => handleFocus('second')}
            onBlur={handleBlur}
            showPassword={showSecondPassword}
            togglePasswordVisibility={() =>
              setShowSecondPassword(!showSecondPassword)
            }
          />
        </View>

        <Pressable style={globalStyles.button} onPress={handleResetPassword}>
          <Text style={globalStyles.buttonText}>Reestablecer contraseña</Text>
        </Pressable>

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

/*
const styles = StyleSheet.create({
  inputFocused: {
    borderColor: 'black',
  },
});
*/
