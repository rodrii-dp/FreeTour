import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useUser} from '../../context/UserContext';
import {bookingService} from '../../../infrastructure/api/bookingService';
import {Tour} from '../../../domain/entities/tour';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Tipo para las reservas
interface Booking {
  _id: string;
  userId: string;
  tourId: string | Tour;
  date: string;
  hour: string;
  people: number;
  tour?: Tour; // Para cuando se popule el tour
}

export const BookingsScreen = () => {
  const {user} = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        console.log(user._id);
        const data = await bookingService.getBookingsByUserId(user._id);
        setBookings(data);
      } catch (e) {
        console.error('Error al cargar reservas:', e);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const renderBookingItem = ({item}: {item: Booking}) => {
    const tour = (item.tourId as Tour) || ({} as Tour);

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          source={
            tour.images && tour.images[0]?.imageUrl
              ? {uri: tour.images[0].imageUrl}
              : require('../../assets/no_image.png')
          }
          style={styles.image}
          defaultSource={require('../../assets/no_image.png')}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{tour.title || 'Tour sin título'}</Text>
          <View style={styles.detailRow}>
            <Icon
              name="calendar"
              size={16}
              color="#7F8C8D"
              style={styles.icon}
            />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon
              name="clock-outline"
              size={16}
              color="#7F8C8D"
              style={styles.icon}
            />
            <Text style={styles.detailText}>{item.hour}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon
              name="account-group"
              size={16}
              color="#7F8C8D"
              style={styles.icon}
            />
            <Text style={styles.detailText}>
              {item.people} {item.people === 1 ? 'persona' : 'personas'}
            </Text>
          </View>
        </View>
        <Icon
          name="chevron-right"
          size={24}
          color="#BDBDBD"
          style={styles.chevron}
        />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5A5F" />
        <Text style={styles.loadingText}>Cargando reservas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Reservas</Text>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={item => item._id}
          renderItem={renderBookingItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="calendar-blank" size={64} color="#E0E0E0" />
          <Text style={styles.emptyText}>No tienes reservas aún.</Text>
          <Text style={styles.emptySubtext}>
            Explora tours y reserva tu próxima aventura.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2C3E50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  chevron: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7F8C8D',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    marginTop: 8,
  },
});
