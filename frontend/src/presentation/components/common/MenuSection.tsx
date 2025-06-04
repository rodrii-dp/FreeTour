import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SettingRow} from './SettingRow.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from '../../navigator/SettingsStackNavigator.tsx';
import {RootStackParams} from '../../navigator/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../context/UserContext.tsx';

export const MenuSection = () => {
  // Navegación dentro del stack de ajustes
  const settingsNavigation =
    useNavigation<NavigationProp<ProfileStackParamList>>();

  const {user} = useUser();

  // Navegación en el stack raíz
  const rootNavigation = useNavigation<NavigationProp<RootStackParams>>();

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    rootNavigation.navigate('Signin');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>{user?.name ?? ''}</Text>
        <Text style={styles.profileEmail}>{user?.email ?? ''}</Text>
      </View>

      <Text style={styles.sectionHeader}>Ajustes</Text>
      <SettingRow
        title="Perfil"
        value="Detalles"
        onPress={() => settingsNavigation.navigate('ProfileDetails')} // Navegación dentro del stack de ajustes
      />
      <SettingRow title="Notificaciones" onPress={() => {}} />

      <Text style={styles.sectionHeader}>Ayuda</Text>
      <SettingRow title="Sobre TourNest" onPress={() => {}} />
      <SettingRow title="Escríbenos" onPress={() => {}} />

      <Text style={styles.sectionHeader}>Comentarios</Text>
      <SettingRow title="Deja una valoración" onPress={() => {}} />
<<<<<<< HEAD
      <SettingRow
        title="Cerrar sesión"
        onPress={() => rootNavigation.navigate('Signin')} // Navegación en el stack raíz
        red
      />
=======
      <SettingRow title="Cerrar sesión" onPress={logout} red />
>>>>>>> 7f1382538ad45e2c7f880fe858193e24035322ad
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionHeader: {
    padding: 15,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
});
