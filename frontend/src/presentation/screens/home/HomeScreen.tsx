import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import YellowUnderline from '../../assets/yellow-underline.svg';
import {TourCard} from './TourCard.tsx';
import {ServiceButton} from './ServiceButton';
import {IconButton, Searchbar} from 'react-native-paper';
import {Service, Tour} from '../../../domain/entities/tour';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator.tsx';

// TODO: Cuando estén listos los esquemas de MongoDB, mostrar los tours que vienen de la API
export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTours([
          {
            id: '1',
            title: 'Paseo en barca',
            description:
              'Disfruta de un paseo en barca por el hermoso lago di Braies, rodeado de montañas majestuosas y aguas cristalinas.',
            location: {
              name: 'Lago di Braies',
              country: 'Italia',
            },
            imageUrl: require('../../assets/lago_di_braies.png'),
            rating: 4.5,
            reviews: Array(150).fill(null),
            price: 50,
          },
          {
            id: '2',
            title: 'Tarde gastronómica',
            description:
              'Disfruta de una tarde por Varenna donde probarás la comida de este grandioso lugar, y que poca gente conoce.',
            location: {
              name: 'Varenna',
              country: 'Italia',
            },
            imageUrl: require('../../assets/varenna.png'),
            rating: 4.5,
            reviews: Array(150).fill(null),
            price: 50,
          },
        ]);

        setServices([
          {
            id: '1',
            name: 'Naturaleza',
            icon: 'pine-tree',
          },
          {
            id: '2',
            name: 'Historia',
            icon: 'castle',
          },
          {
            id: '3',
            name: 'Comida',
            icon: 'silverware-fork-knife',
          },
          {
            id: '4',
            name: 'Aventura',
            icon: 'parachute',
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTourPress = (tour: Tour) => {
    navigation.navigate('TourDetails', {tourId: tour.id});
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require('../../assets/varenna.png')}
            style={styles.heroImage}
            imageStyle={styles.backgroundImage}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBarWrapper}>
                <Searchbar
                  placeholder="Encuentra tours"
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={styles.searchBar}
                  inputStyle={styles.searchInput}
                  iconColor="#666"
                  placeholderTextColor="#666"
                />
              </View>
              <IconButton
                icon="bell-outline"
                iconColor="#666"
                size={32}
                onPress={() => {}}
                style={styles.notificationButton}
              />
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                Vive experiencias{'\n'}únicas en lugares{'\n'}mágicos
              </Text>
              <YellowUnderline />
              <Text style={styles.heroSubtitle}>
                Conoce la belleza de Verenna
              </Text>
              <Text style={styles.heroMoreInfo}>Más información &rarr;</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencias culturales</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tours.map(tour => (
              <TourCard key={tour.id} tour={tour} onPress={handleTourPress} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <Text style={styles.seeAll}>Ver todos</Text>
          </View>
          <View style={styles.servicesContainer}>
            {services.map(service => (
              <ServiceButton
                key={service.id}
                icon={service.icon}
                label={service.name}
                onPress={() => setSelectedService(service.id)}
                isSelected={selectedService === service.id}
              />
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Experiencias culturales</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tours.map(tour => (
              <TourCard key={tour.id} tour={tour} onPress={handleTourPress} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarWrapper: {
    flex: 1,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F8F8F8',
    borderRadius: 50,
  },
  searchInput: {
    fontSize: 16,
  },
  notificationButton: {
    margin: 0,
    backgroundColor: '#f8f8f8',
  },
  heroContainer: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  heroImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  heroContent: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: -5,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  heroMoreInfo: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  seeAll: {
    color: '#FF5A5F',
    fontSize: 14,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastSection: {
    marginBottom: 80,
  },
});
