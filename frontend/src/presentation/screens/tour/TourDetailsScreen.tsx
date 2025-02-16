import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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
import {HomeStackParamList} from '../../navigator/HomeStackNavigator.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import {PaginationDots} from '../../components/common/PaginationDots.tsx';
import {StarRating} from '../../components/common/StarRating.tsx';
import {SettingRow} from '../../components/common/SettingRow.tsx';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type TourDetailsRouteProp = RouteProp<HomeStackParamList, 'TourDetails'>;

export const TourDetailsScreen = () => {
  const route = useRoute<TourDetailsRouteProp>();
  const {tour} = route.params;

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const renderImageCarousel = () => (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={tour.images}
        keyExtractor={item => item.id}
        onScroll={handleScroll}
        renderItem={({item}) => (
          <Image source={{uri: item.imageUrl}} style={styles.image} />
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
    marginBottom: 16,
  },
  availability: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 16,
  },
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
});
