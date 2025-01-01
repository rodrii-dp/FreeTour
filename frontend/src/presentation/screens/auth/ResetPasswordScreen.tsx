import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {BackArrowButton} from '../../components/common/BackArrowButton.tsx';
import {GenericIcon} from '../../icons/Icon.tsx';
import {PasswordInput} from '../../components/common/PasswordInput.tsx';

// interface Props extends StackScreenProps<RootStackParams, 'ResetPassword'> {}

export const ResetPasswordScreen = () =>
  // {route}: Props
  {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    // const {email} = route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<'first' | 'second' | null>(
      null,
    );

    const handleFocus = (input: 'first' | 'second') => setFocusedInput(input);
    const handleBlur = () => setFocusedInput(null);

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
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />
          <Pressable
            style={globalStyles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={{color: '#1e88e5', fontWeight: 'bold'}}>
              {showPassword ? (
                <GenericIcon name="eye-outline" color="#818181" />
              ) : (
                <GenericIcon name="eye-off-outline" color="#818181" />
              )}
            </Text>
          </Pressable>
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
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />
        </View>

        <Pressable
          style={globalStyles.button}
          onPress={() => console.log('Pressed')}>
          <Text style={globalStyles.buttonText}>Reestablecer contraseña</Text>
        </Pressable>

        <Pressable
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: 50,
          }}
          onPress={() => navigation.navigate('Register')}>
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
