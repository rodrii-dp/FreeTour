import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SettingRow} from './SettingRow.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from '../../navigator/SettingsStackNavigator.tsx';

export const MenuSection = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>Rodrigo De Prat</Text>
        <Text style={styles.profileEmail}>rrddppl@gmail.com</Text>
      </View>

      <Text style={styles.sectionHeader}>Ajustes</Text>
      <SettingRow
        title="Perfil"
        value="Detalles"
        onPress={() => navigation.navigate('ProfileDetails')}
      />
      <SettingRow title="Notificaciones" onPress={() => {}} />

      <Text style={styles.sectionHeader}>Ayuda</Text>
      <SettingRow title="Sobre TourNest" onPress={() => {}} />
      <SettingRow title="Escríbenos" onPress={() => {}} />

      <Text style={styles.sectionHeader}>Comentarios</Text>
      {/* Todo: Redirigir usuario a playstore / appstore. Ver enlace: https://reactnative.dev/docs/linking*/}
      <SettingRow title="Deja una valoración" onPress={() => {}} />
      <SettingRow title="Cerrar sesión" onPress={() => {}} red />
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
