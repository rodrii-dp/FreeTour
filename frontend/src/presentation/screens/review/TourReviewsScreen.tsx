import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {tourService, mapReviews} from '../../../infrastructure/api/tourService';
import {Review} from '../../../domain/entities/tour';
import {useUser} from '../../context/UserContext';
import {bookingService} from '../../../infrastructure/api/bookingService';

export const TourReviewsScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'TourReviews'>>();
  const {tourId} = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {user} = useUser();
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await tourService.getReviewsByTour(tourId);
        setReviews(mapReviews(response));
      } catch (e) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [tourId]);

  useEffect(() => {
    const checkBooking = async () => {
      if (!user || !user._id) {
        setCanReview(false);
        return;
      }
      try {
        const bookings = await bookingService.getBookingsByUserId(user._id);
        const hasBooking = bookings.some((b: any) => b.tourId === tourId);
        setCanReview(hasBooking);
      } catch {
        setCanReview(false);
      }
    };
    checkBooking();
  }, [user, tourId]);

  const handleAddReview = async () => {
    setError('');
    if (!title.trim() || !comment.trim() || !rating.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      setError('La puntuación debe ser un número entre 1 y 5.');
      return;
    }
    setSubmitting(true);
    try {
      // Aquí deberías obtener el userId real del usuario autenticado
      const userId = 'userId-demo';
      const newReview = {
        title: title.trim(),
        comment: comment.trim(),
        rating: ratingNum,
        date: new Date().toISOString(),
        userId,
        tourId,
      };
      await tourService.createReview(newReview);
      setTitle('');
      setComment('');
      setRating('');
      setError('');
      // Recargar reseñas
      const response = await tourService.getReviewsByTour(tourId);
      setReviews(mapReviews(response));
    } catch (e) {
      setError('Error al enviar la reseña.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }

  if (!reviews.length) {
    return (
      <View style={styles.centered}>
        <Text>No hay reseñas para este tour.</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {!user || !user._id ? (
        <View style={styles.centered}>
          <Text>Debes iniciar sesión para dejar una reseña.</Text>
        </View>
      ) : !canReview ? (
        <View style={styles.centered}>
          <Text>
            Solo puedes dejar una reseña si tienes una reserva para este tour.
          </Text>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Añadir reseña</Text>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Comentario"
            value={comment}
            onChangeText={setComment}
            style={styles.input}
            multiline
          />
          <TextInput
            placeholder="Puntuación (1-5)"
            value={rating}
            onChangeText={setRating}
            style={styles.input}
            keyboardType="numeric"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            title={submitting ? 'Enviando...' : 'Enviar reseña'}
            onPress={handleAddReview}
            disabled={submitting}
          />
        </View>
      )}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF5A5F" />
        </View>
      ) : !reviews.length ? (
        <View style={styles.centered}>
          <Text>No hay reseñas para este tour.</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
          renderItem={({item}) => (
            <View style={styles.reviewCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.rating}>Puntuación: {item.rating}/5</Text>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  rating: {
    color: '#FF5A5F',
    marginBottom: 4,
  },
  comment: {
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
