import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {Tour} from '../../../domain/entities/tour';
import {tourService} from '../../../infrastructure/api/tourService';
import {TourCard} from '../home/TourCard';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {useDebounce} from '../../hooks/useDebounce';

type SearchResultsRouteProp = RouteProp<HomeStackParamList, 'SearchResults'>;

export const SearchResultsScreen = () => {
  const route = useRoute<SearchResultsRouteProp>();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const initialQuery = route.params?.query || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced version of the query — triggers auto-search after 500 ms of inactivity
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Track whether this is the very first render so we don't reset the initial query
  const isFirstRender = useRef(true);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setTours([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await tourService.getTours({
        title: query,
        limit: '20',
      });

      const toursArray = Array.isArray(results) ? results : results.data || [];
      setTours(toursArray);
    } catch (error) {
      console.error('Error searching tours:', error);
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fire search whenever the debounced query changes (including on first render
  // when initialQuery is pre-populated).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (debouncedQuery) {
        performSearch(debouncedQuery);
      }
      return;
    }
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      // Query was cleared — reset results
      setTours([]);
      setHasSearched(false);
    }
  }, [debouncedQuery, performSearch]);

  const handleTourPress = (tour: Tour) => {
    navigation.navigate('TourDetails', {tour});
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Typing indicator: true while the user has typed something but the debounce
  // hasn't fired yet (i.e. the live query differs from the debounced one).
  const isTyping = searchQuery !== debouncedQuery;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#333"
          size={24}
          onPress={handleBackPress}
          style={styles.backButton}
        />
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar tours..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={() => performSearch(searchQuery)}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#666"
            placeholderTextColor="#666"
            autoFocus={!initialQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {isLoading || isTyping ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF5A5F" />
            <Text style={styles.loadingText}>Buscando tours...</Text>
          </View>
        ) : hasSearched ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {tours.length} resultado{tours.length !== 1 ? 's' : ''}
                {searchQuery ? ` para "${searchQuery}"` : ''}
              </Text>
            </View>

            {tours.length > 0 ? (
              <View style={styles.resultsContainer}>
                {tours.map(tour => (
                  <View key={tour._id} style={styles.tourCardContainer}>
                    <TourCard tour={tour} onPress={handleTourPress} />
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsTitle}>
                  No se encontraron tours
                </Text>
                <Text style={styles.noResultsText}>
                  Intenta con otros términos de búsqueda o explora nuestras
                  categorías
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>
              ¿Qué te gustaría explorar?
            </Text>
            <Text style={styles.emptyStateText}>
              Busca por nombre del tour, ciudad o tipo de experiencia
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    margin: 0,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
  },
  searchInput: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  resultsHeader: {
    padding: 15,
    paddingBottom: 10,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resultsContainer: {
    paddingHorizontal: 15,
  },
  tourCardContainer: {
    marginBottom: 15,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
