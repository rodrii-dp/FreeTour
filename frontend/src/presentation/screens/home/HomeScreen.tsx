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
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {useToursStore} from '../../stores/toursStore.tsx';
import {TourCard} from './TourCard.tsx';
import {ServiceButton} from './ServiceButton';
<<<<<<< HEAD
<<<<<<< HEAD
import {IconButton, Searchbar} from 'react-native-paper';
import {Service, Tour} from '../../../domain/entities/tour';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator.tsx';
=======
=======
>>>>>>> 7f1382538ad45e2c7f880fe858193e24035322ad
import {HeroSlider} from '../../components/common/HeroSlider.tsx';
import {tourService} from '../../../infrastructure/api/tourService.ts';
import {apiClient} from '../../../infrastructure/api/apiClient.ts';
import {useUser} from '../../context/UserContext.tsx';
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> 7f1382538ad45e2c7f880fe858193e24035322ad

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Service[]>([]);
  const [categoriesWithTours, setCategoriesWithTours] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryTours, setCategoryTours] = useState<Tour[]>([]);
  const [loadingCategoryTours, setLoadingCategoryTours] = useState(false);

  const {user, isLoading: isUserLoading} = useUser();
  const tours = useToursStore(state => state.tours);
  const setTours = useToursStore(state => state.setTours);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const checkCategoryHasTours = async (
    categoryName: string,
  ): Promise<boolean> => {
    try {
      const categoryToursResponse = await tourService.getTours({
        category: categoryName.toLowerCase(),
        limit: '1', // Just check if at least one tour exists
      });

      const toursData = Array.isArray(categoryToursResponse)
        ? categoryToursResponse
        : categoryToursResponse.data || [];

      return toursData.length > 0;
    } catch (error) {
      console.error(
        `Error checking tours for category ${categoryName}:`,
        error,
      );
      return false;
    }
  };

  const fetchPopularTours = async (category: string) => {
    try {
      const popularTours = await tourService.getTours({category, limit: '5'});
      const toursData = Array.isArray(popularTours)
        ? popularTours
        : popularTours.data || [];
      return toursData;
    } catch (error) {
      console.error(`Error fetching popular tours for ${category}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7f1382538ad45e2c7f880fe858193e24035322ad
        const toursResponse = await tourService.getTours({
          onlyDiscounted: true,
          limit: '3',
        });
        const toursData = Array.isArray(toursResponse)
          ? toursResponse
          : toursResponse.data || [];
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> 7f1382538ad45e2c7f880fe858193e24035322ad

        setTours(toursData);
        setCategoryTours(toursData);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setTours]);

  const heroSlides = tours.map(tour => ({
    id: tour._id,
    tourId: tour._id,
    imageUrl:
      tour.images && tour.images[0]?.imageUrl
        ? {uri: tour.images[0].imageUrl}
        : require('../../assets/no_image.png'),
    title: tour.title,
    subtitle: tour.location?.name || '',
  }));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/categories');
        console.log('Fetched categories:', response.data);

        // Filter categories that have tours
        const categoriesWithToursPromises = response.data.map(
          async (category: Service) => {
            const hasTours = await checkCategoryHasTours(category.name);
            return hasTours ? category : null;
          },
        );

        const categoriesResults = await Promise.all(
          categoriesWithToursPromises,
        );
        const filteredCategories = categoriesResults.filter(
          category => category !== null,
        );

        setCategories(response.data); // Keep all categories for reference
        setCategoriesWithTours(filteredCategories); // Only categories with tours
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = async (
    categoryId: string,
    categoryName: string,
  ) => {
    setSelectedCategory(categoryId);
    setLoadingCategoryTours(true);

    try {
      // Call the API to get tours for this specific category
      const categoryToursResponse = await tourService.getTours({
        category: categoryName.toLowerCase(),
        limit: '10', // You can adjust this limit as needed
      });

      const toursData = Array.isArray(categoryToursResponse)
        ? categoryToursResponse
        : categoryToursResponse.data || [];

      console.log(`Tours for category ${categoryName}:`, toursData);

      // Update the categoryTours state with the filtered tours
      setCategoryTours(toursData);
    } catch (error) {
      console.error('Error fetching category tours:', error);
      // In case of error, show empty array or fallback to all tours
      setCategoryTours([]);
    } finally {
      setLoadingCategoryTours(false);
    }
  };

  // Function to reset category selection
  const resetCategorySelection = () => {
    setSelectedCategory(null);
    setCategoryTours(tours); // Show all tours again
  };

  const handleTourPress = (tour: Tour) => {
    navigation.navigate('TourDetails', {tour: tour});
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', {query: searchQuery.trim()});
    }
  };

  // Function to get the section title based on selected category
  const getSectionTitle = () => {
    if (selectedCategory && categoriesWithTours.length > 0) {
      const category = categoriesWithTours.find(
        cat => cat._id === selectedCategory,
      );
      return category
        ? category.name.charAt(0).toUpperCase() + category.name.slice(1)
        : 'Experiencias culturales';
    }
    return 'Experiencias culturales';
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }

  console.log('CATEGORIES WITH TOURS:', categoriesWithTours);

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
              <TourCard key={tour._id} tour={tour} onPress={handleTourPress} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <ServiceButton
              key="all"
              icon="view-grid"
              label="Todos"
              onPress={resetCategorySelection}
              isSelected={selectedCategory === null}
            />
            {categoriesWithTours.map((category, index) => (
              <ServiceButton
                key={category._id}
                icon={category.icon}
                label={category.name[0].toUpperCase() + category.name.slice(1)}
                onPress={() => handleCategoryPress(category._id, category.name)}
                isSelected={String(selectedCategory) === String(category._id)}
              />
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>{getSectionTitle()}</Text>
          {loadingCategoryTours ? (
            <View style={styles.categoryLoadingContainer}>
              <ActivityIndicator size="small" color="#FF5A5F" />
              <Text style={styles.loadingText}>Cargando tours...</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoryTours.length > 0 ? (
                categoryTours.map(tour => (
                  <TourCard
                    key={tour._id}
                    tour={tour}
                    onPress={handleTourPress}
                  />
                ))
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>
                    No hay tours disponibles para esta categoría
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
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
  categoryLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastSection: {
    marginBottom: 80,
  },
});
