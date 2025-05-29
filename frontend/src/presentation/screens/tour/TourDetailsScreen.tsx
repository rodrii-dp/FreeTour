<<<<<<< HEAD
import React, {useState} from 'react';
=======
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
>>>>>>> develop
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
<<<<<<< HEAD
import {HomeStackParamList} from '../../navigator/HomeStackNavigator.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import {PaginationDots} from '../../components/common/PaginationDots.tsx';
import {StarRating} from '../../components/common/StarRating.tsx';
import {SettingRow} from '../../components/common/SettingRow.tsx';
import {useScroll} from '../../hooks/useScroll.tsx';
=======
import type {HomeStackParamList} from '../../navigation/HomeStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {PaginationDots} from '../../components/common/PaginationDots';
import {StarRating} from '../../components/common/StarRating';
import {SettingRow} from '../../components/common/SettingRow';
import {useScroll} from '../../hooks/useScroll';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import {CalendarModal} from '../../components/common/CalendarModal';
import {useFavoritesStore} from '../../stores/favoritesStore';
>>>>>>> develop

const {width: SCREEN_WIDTH} = Dimensions.get('window');

<<<<<<< HEAD
type TourDetailsRouteProp = RouteProp<HomeStackParamList, 'TourDetails'>;

export const TourDetailsScreen = () => {
  const route = useRoute<TourDetailsRouteProp>();
  const {tour} = route.params;

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const {activeIndex, onScroll} = useScroll();

  const renderImageCarousel = () => (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={tour.images}
        keyExtractor={item => item.id}
        onScroll={onScroll}
        renderItem={({item}) => (
          <Image source={{uri: item.imageUrl}} style={styles.image} />
=======
const DEFAULT_IMAGE = require('../../assets/no_image.png');

export const TourDetailsScreen = ({route}: Props) => {
  const {favoriteTours, removeFavorite, loadFavorites, addFavorite} =
    useFavoritesStore();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const {tour} = route.params;

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const {activeIndex, onScroll} = useScroll();
  const {width} = useWindowDimensions();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const isFavorite = favoriteTours.some(
    favoriteTour => favoriteTour._id === tour._id,
  );

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(tour._id);
    } else {
      addFavorite(tour);
    }
  }, [isFavorite, removeFavorite, addFavorite, tour]);

  const toggleFavorite = useCallback(() => {
    handleToggleFavorite();
  }, [handleToggleFavorite]);

  const nonAvailableDates = [
    ...new Set(
      tour.nonAvailableDates?.map(nonAvailableDate => nonAvailableDate.date),
    ),
  ];

  const handleDateSelect = (date: string) => {
    navigation.navigate('Checkout', {
      tour,
      selectedDate: date,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={toggleFavorite} style={{padding: 8}}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'black'}
          />
        </Pressable>
      ),
    });
  }, [navigation, isFavorite, toggleFavorite]);

  const calculateDiscountedPrice = () => {
    if (!tour.price.discount) {
      return null;
    }

    const {value, discount} = tour.price;
    const now = new Date();
    const validFrom = discount.validFrom ? new Date(discount.validFrom) : null;
    const validTo = discount.validTo ? new Date(discount.validTo) : null;

    // Verificar si el descuento es válido actualmente
    const isValid =
      (!validFrom || now >= validFrom) && (!validTo || now <= validTo);

    if (!isValid) {
      return null;
    }

    // Calcular precio con descuento según el tipo
    let discountedPrice = value;
    if (discount.type === 'porcentaje') {
      discountedPrice = value * (1 - discount.amount / 100);
    } else if (discount.type === 'valor') {
      discountedPrice = value - discount.amount;
    }

    return Math.max(0, discountedPrice);
  };

  const renderImageCarousel = () => {
    const getImageSource = (imageUrl: string) => {
      return imageUrl.startsWith('../../assets')
        ? DEFAULT_IMAGE
        : {uri: imageUrl};
    };

    const images =
      tour.images.length > 0
        ? tour.images
        : [{id: 'default', imageUrl: '../../assets/no_image.png'}];

    return (
      <View>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={item => item.id}
          onScroll={onScroll}
          renderItem={({item}) => (
            <Image
              source={getImageSource(item.imageUrl)}
              style={[styles.image, {width: width, height: width * 0.75}]}
            />
          )}
        />
        {tour.images.length > 1 && (
          <View style={styles.paginationDots}>
            <PaginationDots
              activeIndex={activeIndex}
              totalDots={tour.images.length}
            />
          </View>
>>>>>>> develop
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderImageCarousel()}
      <View style={styles.content}>
        <Text style={styles.category}>{tour.category.toUpperCase()}</Text>
        <Text style={styles.title}>{tour.title}</Text>
        <Text style={styles.provider}>Proovedor: {tour.provider.name}</Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={tour.rating} />
          <Text style={styles.reviews}> {tour.reviews.length} reseñas</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="time-outline" size={24} color="#34495E" />
            <Text style={styles.infoText}>{tour.duration}</Text>
          </View>
<<<<<<< HEAD
          <View style={styles.infoItem}>
            <Icon name="language-outline" size={24} color="#34495E" />
            <Text style={styles.infoText}>{tour.language.join(', ')}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Acerca de este tour</Text>
        <Text style={styles.description}>{tour.description}</Text>

        <Text style={styles.sectionTitle}>Itinerario</Text>
        {/*tour.stops.map((stop, index) => (
          <View key={index} style={styles.stopItem}>
            <Text style={styles.stopNumber}>{index + 1}</Text>
            <Text style={styles.stopText}>{stop.stopName}</Text>
          </View>
        ))*/}
        <SettingRow
          title="Ver itinerario"
          onPress={() => navigation.navigate('Map', {stops: tour.stops})}
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 8,
          }}
        />

        <Text style={styles.sectionTitle}>Punto de encuentro</Text>
        <Text style={styles.meetingPoint}>{tour.meetingPoint}</Text>

        <Text style={styles.sectionTitle}>Disponibilidad</Text>
        <Text style={styles.availability}>
          {`Del ${new Date(
            tour.availability.dateStart,
          ).toLocaleDateString()} al ${new Date(
            tour.availability.dateEnd,
          ).toLocaleDateString()}`}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio</Text>
          {tour.price.basedOnTips ? (
            <Text style={styles.price}>Basado en propinas</Text>
          ) : (
            <Text style={styles.price}>{`${tour.price.value}€`}</Text>
          )}
        </View>

        <Pressable style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Reservar ahora</Text>
        </Pressable>
      </View>
    </ScrollView>
=======

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Icon name="time-outline" size={24} color="#34495E" />
              <Text style={styles.infoText}>{tour.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="language-outline" size={24} color="#34495E" />
              <Text style={styles.infoText}>{tour.language.join(', ')}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Acerca de este tour</Text>
          <Text style={styles.description}>{tour.description}</Text>

          <Text style={styles.sectionTitle}>Itinerario</Text>
          <SettingRow
            title="Ver itinerario"
            onPress={() =>
              navigation.navigate('Map', {
                stops: tour.stops,
                meetingPoint: tour.meetingPoint,
              })
            }
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
            }}
          />

          <Text style={styles.sectionTitle}>Punto de encuentro</Text>
          <Text style={styles.meetingPoint}>{tour.meetingPoint}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Precio</Text>
            {tour.price.basedOnTips ? (
              <Text style={styles.price}>Basado en propinas</Text>
            ) : (
              <View style={styles.priceWrapper}>
                {calculateDiscountedPrice() !== null ? (
                  <>
                    <Text style={styles.originalPrice}>
                      {tour.price.value}€
                    </Text>
                    <Text style={styles.discountedPrice}>
                      {calculateDiscountedPrice()}€
                    </Text>
                    {tour.price.discount?.description && (
                      <Text style={styles.discountLabel}>
                        {tour.price.discount.description}
                      </Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.price}>
                    {tour.price.value === 0 ? 'Gratis' : `${tour.price.value}€`}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          style={styles.bookButton}
          onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.bookButtonText}>Ver disponibilidad</Text>
        </Pressable>
      </View>

      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onDateSelect={handleDateSelect}
        nonAvailableDates={nonAvailableDates}
      />
    </SafeAreaView>
>>>>>>> develop
  );
};

const styles = StyleSheet.create({
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: SCREEN_WIDTH,
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  category: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  provider: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#34495E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
    marginBottom: 16,
  },
  meetingPoint: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 16,
  },
<<<<<<< HEAD
  availability: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 16,
  },
=======
>>>>>>> develop
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 16,
    color: '#7F8C8D',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  discountLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    borderRadius: 4,
  },
  bookButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
<<<<<<< HEAD
=======
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    padding: '4%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
>>>>>>> develop
});
