import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  type NavigationProp,
  type RouteProp,
  useNavigation,
} from '@react-navigation/native';
import type {HomeStackParamList} from '../../navigation/HomeStackNavigator.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import {PaginationDots} from '../../components/common/PaginationDots.tsx';
import {StarRating} from '../../components/common/StarRating.tsx';
import {SettingRow} from '../../components/common/SettingRow.tsx';
import {useScroll} from '../../hooks/useScroll.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';

interface Props {
  route: RouteProp<HomeStackParamList, 'TourDetails'>;
}

const DEFAULT_IMAGE = require('../../assets/no_image.png');

export const TourDetailsScreen = ({route}: Props) => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const {tour} = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  const {activeIndex, onScroll} = useScroll();
  const {width} = useWindowDimensions();

  // TODO: Guardar en AsyncStorage o BBDD
  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

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
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {renderImageCarousel()}
        <View style={styles.content}>
          <Text style={styles.category}>{tour.category.toUpperCase()}</Text>
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.provider}>Proveedor: {tour.provider.name}</Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={tour.rating} />
            <Text style={styles.reviews}> {tour.reviews.length} reseñas</Text>
          </View>

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
              <Text style={styles.price}>{`${tour.price.value}€`}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          style={styles.bookButton}
          onPress={() => navigation.navigate('Calendar', {tour: tour})}>
          <Text style={styles.bookButtonText}>Ver disponibilidad</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    resizeMode: 'cover',
  },
  content: {
    padding: '4%',
  },
  category: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: '1%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: '2%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
  },
  reviews: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  provider: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: '4%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: '2%',
    fontSize: 16,
    color: '#34495E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: '4%',
    marginBottom: '2%',
  },
  description: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
    marginBottom: '4%',
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stopNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3498DB',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
  },
  stopText: {
    fontSize: 16,
    color: '#34495E',
  },
  meetingPoint: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: '4%',
  },
  availability: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: '4%',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4%',
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
  bookButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: '4%',
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  likeButton: {
    padding: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  footer: {
    padding: '4%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
