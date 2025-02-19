import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {useUser} from '../../context/UserContext';
import {SettingsStackParamList} from '../../navigation/SettingsStackNavigator.tsx';
import {Input} from '../../components/common/Input.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {Message} from '../../components/common/Message.tsx';

export const ProfileDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<SettingsStackParamList>>();
  const {user, isLoading, error, updateUser, deleteAccount} = useUser();

  console.log({user, isLoading, error, updateUser, deleteAccount});

  const {
    fields,
    error: formError,
    handleInputChange,
    validateForm,
  } = useFormValidation({
    name: user?.name || '',
    email: user?.email || '',
  });

  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'name' | 'email' | 'role'
  >();

  const handleSave = async () => {
    try {
      if (validateForm()) {
        await updateUser(fields);
        Alert.alert('Éxito', 'Cambios guardados correctamente');
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudieron guardar los cambios');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
              navigation.reset({
                index: 0,
                routes: [{name: 'Ajustes'}],
              });
            } catch (err) {
              Alert.alert('Error', 'No se pudo eliminar la cuenta');
            }
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066FF" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color="#FF0000" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.retryButtonText}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.formGroup}>
          <Input
            label="Nombre"
            style={[
              styles.input,
              focusedInput === 'name' && styles.activeInput,
            ]}
            value={fields.name}
            onChangeText={value => handleInputChange('name', value)}
            placeholder="Nombre"
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.formGroup}>
          <Input
            label="Correo electrónico"
            style={[
              styles.input,
              focusedInput === 'email' && styles.activeInput,
            ]}
            value={fields.email}
            onChangeText={value => handleInputChange('email', value)}
            placeholder="hello@example.com"
            keyboardType="email-address"
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />
        </View>

        {formError && <Message error={formError} />}

        <Pressable onPress={handleDeleteAccount} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar cuenta</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Guardar</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#0066FF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: '4%',
  },
  formGroup: {
    marginBottom: '2%',
  },
  label: {
    fontSize: 16,
    color: '#0066FF',
    marginBottom: '2%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: '4%',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  activeInput: {
    borderColor: '#0066FF',
    borderWidth: 2,
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
  },
  deleteButton: {
    marginVertical: '4%',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: '4%',
  },
  saveButton: {
    backgroundColor: '#0066FF',
    paddingVertical: '4%',
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: '4%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    padding: '2%',
  },
});
