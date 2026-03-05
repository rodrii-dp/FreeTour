import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {tourService, mapReviews} from '../../../infrastructure/api/tourService';
import {Review} from '../../../domain/entities/tour';
import {useUser} from '../../context/UserContext';
import {bookingService} from '../../../infrastructure/api/bookingService';
import {StarRating} from '../../components/common/StarRating';
import Icon from 'react-native-vector-icons/Ionicons';

export const TourReviewsScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'TourReviews'>>();
  const {tourId} = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
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
        const hasBooking = bookings.some((b: any) => {
          // b.tourId puede ser string o un objeto
          if (typeof b.tourId === 'string') {
            return b.tourId === tourId;
          } else if (b.tourId && b.tourId._id) {
            return b.tourId._id === tourId;
          }
          return false;
        });
        setCanReview(hasBooking);
      } catch {
        setCanReview(false);
      }
    };
    checkBooking();
  }, [user, tourId]);

  const handleAddReview = async () => {
    setError('');
    if (!title.trim() || !comment.trim() || rating === 0) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setSubmitting(true);
    try {
      if (!user || !user._id) {
        setError('Debes iniciar sesión para dejar una reseña.');
        setSubmitting(false);
        return;
      }
      const newReview = {
        title: title.trim(),
        comment: comment.trim(),
        rating,
        date: new Date().toISOString(),
        userId: user._id,
        tourId,
      };
      await tourService.createReview(newReview);
      setTitle('');
      setComment('');
      setRating(0);
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

  return (
    <View style={{flex: 1}}>
      {/* Formulario o mensajes de validación arriba */}
      {!user || !user._id ? (
        <View style={styles.centered}>
          <Text>Debes iniciar sesión para dejar una reseña.</Text>
        </View>
      ) : canReview ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Añadir reseña</Text>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Comentario"
            value={comment}
            onChangeText={setComment}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={3}
            placeholderTextColor="#aaa"
          />
          <Text style={styles.ratingLabel}>Puntuación</Text>
          <View style={styles.starInputRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={32}
                  color={star <= rating ? '#FFC107' : '#BDC3C7'}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleAddReview}
            disabled={submitting}>
            <Text style={styles.submitButtonText}>
              {submitting ? 'Enviando...' : 'Enviar reseña'}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {/* Lista de reseñas o mensaje */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF5A5F" />
        </View>
      ) : reviews.length === 0 ? (
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
              <StarRating rating={item.rating} size={16} />
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
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#2C3E50',
  },
  comment: {
    marginTop: 6,
    marginBottom: 6,
    color: '#34495E',
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: '#95A5A6',
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
    fontSize: 18,
    marginBottom: 12,
    color: '#2C3E50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  ratingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  starInputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starIcon: {
    marginRight: 4,
  },
  error: {
    color: '#E74C3C',
    marginBottom: 8,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
