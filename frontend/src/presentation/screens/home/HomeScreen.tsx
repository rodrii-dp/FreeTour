import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {IconButton, Searchbar} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Service, Tour} from '../../../domain/entities/tour';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {useToursStore} from '../../stores/toursStore.tsx';
import {TourCard} from './TourCard.tsx';
import {ServiceButton} from './ServiceButton';
import {HeroSlider} from '../../components/common/HeroSlider.tsx';
import {tourService} from '../../../infrastructure/api/tourService.ts';
import {apiClient} from '../../../infrastructure/api/apiClient.ts';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoriesWithTours, setCategoriesWithTours] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryTours, setCategoryTours] = useState<Tour[]>([]);
  const [loadingCategoryTours, setLoadingCategoryTours] = useState(false);
  const [heroTours, setHeroTours] = useState<Tour[]>([]);
  const [culturalTours, setCulturalTours] = useState<Tour[]>([]);
  const [featuredCategoryTours, setFeaturedCategoryTours] = useState<Tour[]>(
    [],
  );

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tours para el HeroSlider (más recientes)
        const toursData = await tourService.getMostRecent(3);
        setHeroTours(toursData);
        setTours(toursData); // Si otros componentes dependen de esto

        // Obtener categorías
        const categoriesResponse = await apiClient.get('/categories');
        const categories: Service[] = categoriesResponse.data;
        // Para cada categoría, obtener el primer tour (si existe)
        const firstToursPromises = categories.map(async category => {
          const tours = await tourService.getTours({
            category: category.name.toLowerCase(),
            limit: '1',
          });
          const toursArr = Array.isArray(tours) ? tours : tours.data || [];
          return toursArr.length > 0 ? toursArr[0] : null;
        });
        const firstTours = (await Promise.all(firstToursPromises)).filter(
          Boolean,
        );
        setFeaturedCategoryTours(firstTours);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setTours]);

  const heroSlides = heroTours.map(tour => ({
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

        setCategoriesWithTours(filteredCategories); // Only categories with tours
        // Seleccionar la primera categoría automáticamente si existe
        if (filteredCategories.length > 0) {
          setSelectedCategory(filteredCategories[0]._id);
          // Cargar tours de la primera categoría
          const categoryToursResponse = await tourService.getTours({
            category: filteredCategories[0].name.toLowerCase(),
            limit: '10',
          });
          const toursData = Array.isArray(categoryToursResponse)
            ? categoryToursResponse
            : categoryToursResponse.data || [];
          setCategoryTours(toursData);
        }
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

      setCategoryTours(toursData);
    } catch (error) {
      console.error('Error fetching category tours:', error);
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
              icon="magnify"
              iconColor="#666"
              size={32}
              onPress={handleSearchSubmit}
              style={styles.notificationButton}
            />
          </View>
          <HeroSlider slides={heroSlides} tours={tours} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencias por categoría</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredCategoryTours.map(tour => (
              <TourCard key={tour._id} tour={tour} onPress={handleTourPress} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
          </View>
          <View style={styles.categoriesContainer}>
            {categoriesWithTours.map(category => (
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
