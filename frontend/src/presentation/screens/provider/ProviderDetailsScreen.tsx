import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {apiClient} from '../../../infrastructure/api/apiClient';
import {Provider} from '../../../domain/entities/tour.ts';

type ProviderDetailsRouteProp = RouteProp<
  HomeStackParamList,
  'ProviderDetails'
>;

export const ProviderDetailsScreen = () => {
  const route = useRoute<ProviderDetailsRouteProp>();
  const {providerId} = route.params;
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await apiClient.get(`/providers/${providerId}`);
        setProvider(response.data);
      } catch (error) {
        setProvider(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [providerId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }

  if (!provider) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró el proveedor.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{provider.name}</Text>
      <Text>Dirección: {provider.direction}</Text>
      <Text>Teléfono: {formatPhoneNumber(provider.contact)}</Text>
      <Text>Tours publicados: {provider.tours.length}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    return cleaned.replace(/(\+\d{2,3})(\d{3})(\d{3})(\d{3,4})/, '$1 $2 $3 $4');
  }
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  return phone;
}
