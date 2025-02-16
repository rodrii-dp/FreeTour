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
            category: 'Actividades acuáticas',
            title: 'Paseo en barca por el Lago di Braies',
            images: [
              {
                id: '1',
                imageUrl:
                  'https://cdn.bookatrekking.com/data/images/2024/03/lago-di-braies-hike-1.jpg',
              },
              {
                id: '2',
                imageUrl:
                  'https://cdn.bookatrekking.com/data/images/2024/03/lago-di-braies-hike-1.jpg',
              },
              {
                id: '3',
                imageUrl:
                  'https://cdn.bookatrekking.com/data/images/2024/03/lago-di-braies-hike-1.jpg',
              },
            ],
            provider: {
              id: 'p1',
              name: 'Aventuras Alpinas',
              tours: ['1'],
              direction: 'Via Lago di Braies, 39030 Braies BZ, Italia',
              contact: '+39 0474 748474',
              verificationStatus: 'verificado',
            },
            rating: 4.5,
            reviews: Array(150).fill({
              id: 'r1',
              title: 'Experiencia inolvidable',
              userId: 'u1',
              date: new Date(),
              rating: 5,
              comment: 'Un paseo maravilloso con vistas impresionantes.',
            }),
            description:
              'Disfruta de un paseo en barca por el hermoso lago di Braies, rodeado de montañas majestuosas y aguas cristalinas.',
            duration: '2 horas',
            language: ['Español', 'Italiano', 'Inglés'],
            price: {
              value: 50,
              basedOnTips: false,
            },
            stops: [
              {
                location: {
                  lat: 46.6948,
                  lng: 12.0849,
                  direction: 'Muelle principal del Lago di Braies',
                },
                stopName: 'Inicio del recorrido',
              },
              {
                location: {
                  lat: 46.6943,
                  lng: 12.086,
                  direction: 'Zona norte del lago',
                },
                stopName: 'Mirador de las Dolomitas',
              },
            ],
            location: {
              name: 'Lago di Braies',
              country: 'Italia',
            },
            meetingPoint:
              'Muelle principal del Lago di Braies, junto al Hotel Lago di Braies',
            availability: {
              dateStart: new Date('2023-05-01'),
              dateEnd: new Date('2023-10-31'),
            },
          },
          {
            id: '2',
            category: 'Gastronomía',
            title: 'Tarde gastronómica en Varenna',
            images: [
              {
                id: '2',
                imageUrl:
                  'https://mediaim.expedia.com/destination/1/bdaa37f1a8f6a663162794bec3280a2a.jpg',
              },
            ],
            provider: {
              id: 'p2',
              name: 'Sabores de Italia',
              tours: ['2'],
              direction: 'Via XX Settembre, 23829 Varenna LC, Italia',
              contact: '+39 0341 830111',
              verificationStatus: 'verificado',
            },
            rating: 4.5,
            reviews: Array(150).fill({
              id: 'r2',
              title: 'Delicioso recorrido',
              userId: 'u2',
              date: new Date(),
              rating: 5,
              comment:
                'Una experiencia culinaria increíble en un lugar encantador.',
            }),
            description:
              'Disfruta de una tarde por Varenna donde probarás la comida de este grandioso lugar, y que poca gente conoce.',
            duration: '4 horas',
            language: ['Español', 'Italiano', 'Inglés'],
            price: {
              value: 50,
              basedOnTips: false,
            },
            stops: [
              {
                location: {
                  lat: 46.0112,
                  lng: 9.2845,
                  direction: 'Plaza central de Varenna',
                },
                stopName: 'Inicio del tour gastronómico',
              },
              {
                location: {
                  lat: 46.0118,
                  lng: 9.285,
                  direction: 'Ristorante Il Caminetto',
                },
                stopName: 'Degustación de pasta fresca',
              },
              {
                location: {
                  lat: 46.0106,
                  lng: 9.2838,
                  direction: 'Gelateria Riva',
                },
                stopName: 'Helados artesanales',
              },
            ],
            location: {
              name: 'Varenna',
              country: 'Italia',
            },
            meetingPoint:
              'Plaza central de Varenna, frente a la iglesia de San Giorgio',
            availability: {
              dateStart: new Date('2023-04-01'),
              dateEnd: new Date('2023-11-30'),
            },
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
    navigation.navigate('TourDetails', {tour: tour});
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
