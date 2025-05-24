import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {IconButton, Searchbar} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Service, Tour} from '../../../domain/entities/tour';
import {HomeStackParamList} from '../../navigation/HomeStackNavigator.tsx';
import {useToursStore} from '../../stores/toursStore.tsx';
import {TourCard} from './TourCard.tsx';
import {ServiceButton} from './ServiceButton';
import {HeroSlider} from '../../components/common/HeroSlider.tsx';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tours = useToursStore(state => state.tours);
  const setTours = useToursStore(state => state.setTours);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  // Define the hero slides data
  const heroSlides = [
    {
      id: '1',
      tourId: '2',
      imageUrl: require('../../assets/varenna.png'),
      title: 'Vive experiencias\núnicas en lugares\nmágicos',
      subtitle: 'Conoce la belleza de Verenna',
    },
    {
      id: '2',
      tourId: '1',
      imageUrl: require('../../assets/lago_di_braies.png'),
      title: 'Descubre paisajes\nimpresionantes',
      subtitle: 'Explora el Lago di Braies',
    },
    {
      id: '3',
      tourId: '2',
      imageUrl: require('../../assets/italian-food.png'),
      title: 'Saborea la auténtica\ncocina italiana',
      subtitle: 'Tours gastronómicos',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // SIEMPRE actualizar los tours con los datos completos incluyendo descuentos
        const toursWithDiscounts: Tour[] = [
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
              date: new Date().toISOString(),
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
              discount: {
                type: 'porcentaje',
                amount: 30,
                description: 'Oferta de temporada',
                validFrom: '2025-03-01',
                validTo: '2025-06-30',
              },
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
            availableDates: [
              {date: '2025-03-10', hours: ['11:30']},
              {date: '2025-04-15', hours: ['10:00']},
              {date: '2025-06-06', hours: ['17:00']},
            ],
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
              date: new Date().toISOString(),
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
              discount: {
                type: 'valor',
                amount: 15,
                description: '¡Solo este mes!',
                validFrom: '2025-02-15',
                validTo: '2025-05-15',
              },
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
            availableDates: [
              {date: '2025-03-10', hours: ['11:30']},
              {date: '2025-04-15', hours: ['10:00']},
              {date: '2025-06-06', hours: ['17:00']},
            ],
          },
        ];

        // Forzar la actualización de los tours
        console.log(
          'Setting tours with discounts:',
          toursWithDiscounts.map(t => ({
            id: t.id,
            title: t.title,
            hasDiscount: !!t.price.discount,
            discount: t.price.discount,
          })),
        );

        setTours(toursWithDiscounts);

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
  }, []); // Removí las dependencias para que siempre se ejecute

  const handleTourPress = (tour: Tour) => {
    navigation.navigate('TourDetails', {tour: tour});
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', {query: searchQuery.trim()});
    }
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
          <View style={styles.searchContainer}>
            <View style={styles.searchBarWrapper}>
              <Searchbar
                placeholder="Encuentra tours"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={handleSearchSubmit}
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
          <HeroSlider slides={heroSlides} tours={tours} />
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
            <Text style={styles.sectionTitle}>Categorías</Text>
            <Text style={styles.seeAll}>Ver todas</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    gap: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
