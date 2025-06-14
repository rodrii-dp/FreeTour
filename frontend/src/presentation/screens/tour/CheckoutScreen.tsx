import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type {Tour} from '../../../domain/entities/tour';
import {ParticipantsModal} from '../../components/common/ParticipantsModal.tsx';
import {TimeSlotPicker} from '../../components/common/TimeSlotPicker.tsx';
import {useUser} from '../../context/UserContext.tsx';
import {bookingService} from '../../../infrastructure/api/bookingService.ts';

interface Props {
  route: {
    params: {
      tour: Tour;
      selectedDate: string;
    };
  };
}

export const CheckoutScreen = ({route}: Props) => {
  const {tour, selectedDate} = route.params;
  // const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const [participantsModalVisible, setParticipantsModalVisible] =
    useState(false);
  const [participants, setParticipants] = useState([
    {type: 'Adulto', ageRange: 'Edad 14-99', count: 1},
    {type: 'Niño', ageRange: 'Edad 4-13', count: 0},
    {type: 'Bebé', ageRange: 'Hasta los 3 años', count: 0},
  ]);

  // Declarar primero allPossibleHours
  const allPossibleHours = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  // Calcular las horas no disponibles para el día seleccionado
  const nonAvailable =
    tour.nonAvailableDates.find(date => date.date === selectedDate)?.hours ||
    [];
  // Calcular las horas realmente disponibles
  const availableTimes = allPossibleHours.filter(
    hour => !nonAvailable.includes(hour),
  );

  // selectedTime debe ser la primera hora disponible real para ese día
  const [selectedTime, setSelectedTime] = useState(availableTimes[0] || '');

  // Si el usuario cambia de fecha (selectedDate) o las horas disponibles cambian, actualizar la hora seleccionada automáticamente
  React.useEffect(() => {
    // Si la hora seleccionada ya no está disponible, selecciona la primera disponible
    if (!availableTimes.includes(selectedTime)) {
      setSelectedTime(availableTimes[0] || '');
    }
  }, [selectedDate, availableTimes, selectedTime]);

  const {user} = useUser();

  const formattedDate = new Date(selectedDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

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

  const discountedPrice = calculateDiscountedPrice();
  const hasDiscount = discountedPrice !== null;
  const pricePerPerson = hasDiscount ? discountedPrice : tour.price.value;

  const calculateTotalPrice = () => {
    return participants.reduce((total, participant) => {
      return total + participant.count * pricePerPerson;
    }, 0);
  };

  const handleCheckout = async () => {
    if (!user) {
      Alert.alert('Debes iniciar sesión para reservar');
      return;
    }
    // Si no hay hora seleccionada, usar la primera disponible
    const hourToSend = selectedTime || availableTimes[0] || '';
    console.log('Checkout - userId:', user._id);
    console.log('Checkout - tourId:', tour._id);
    console.log('Checkout - date:', selectedDate);
    console.log('Checkout - hour:', hourToSend);
    console.log(
      'Checkout - people:',
      participants.reduce((sum, p) => sum + p.count, 0),
    );
    try {
      await bookingService.createBooking({
        userId: user._id,
        tourId: tour._id,
        date: selectedDate,
        hour: hourToSend,
        people: participants.reduce((sum, p) => sum + p.count, 0),
      });
      Alert.alert('Reserva realizada con éxito');
      // navigation.navigate('Checkout');
    } catch (e: any) {
      const errorMessage =
        e?.response?.data?.message || e?.message || 'Intenta de nuevo';
      console.log('Error al reservar:', e, e?.response?.data);
      Alert.alert('Error al reservar', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de la actividad</Text>
          <View style={styles.detailRow}>
            <Icon name="calendar" size={24} color="#1a1a1a" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Fecha</Text>
              <Text style={styles.detailValue}>{formattedDate}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#1a1a1a" />
          </View>
          <View style={styles.detailRow}>
            <Icon name="account-group" size={24} color="#1a1a1a" />
            <Pressable
              style={styles.detailContent}
              onPress={() => setParticipantsModalVisible(true)}>
              <Text style={styles.detailLabel}>Participantes</Text>
              <Text style={styles.detailValue}>
                {participants
                  .filter(p => p.count > 0)
                  .map(p => `${p.type} x ${p.count}`)
                  .join(', ')}
              </Text>
            </Pressable>
            <Icon name="chevron-right" size={24} color="#1a1a1a" />
          </View>

          <ParticipantsModal
            visible={participantsModalVisible}
            onClose={() => setParticipantsModalVisible(false)}
            onApply={newParticipants => {
              setParticipants(newParticipants);
              setParticipantsModalVisible(false);
            }}
            initialParticipants={participants}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones disponibles</Text>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>{tour.title}</Text>
            <Text style={styles.optionDescription}>{tour.meetingPoint}</Text>

            <View style={styles.optionDetail}>
              <Icon name="account" size={20} color="#666" />
              <Text style={styles.optionDetailText}>
                Guía: {tour.language.join(', ')}
              </Text>
            </View>

            <View style={styles.optionDetail}>
              <Icon name="clock-outline" size={20} color="#666" />
              <Text style={styles.optionDetailText}>{tour.duration}</Text>
            </View>

            <View style={styles.optionDetail}>
              <Icon name="map-marker" size={20} color="#0066ff" />
              <Text style={[styles.optionDetailText, styles.blueText]}>
                Punto de encuentro: {tour.meetingPoint}
              </Text>
            </View>

            <View style={styles.timeSection}>
              <Text style={styles.timeSectionTitle}>
                Selecciona una hora de inicio
              </Text>
              <Text style={styles.dateText}>
                {new Date(selectedDate).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <TimeSlotPicker
                availableTimes={availableTimes}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelected={setSelectedTime}
              />
            </View>

            <View style={styles.priceBreakdown}>
              {participants
                .filter(participant => participant.count > 0)
                .map((participant, index) => (
                  <View key={`${participant}-${index}`} style={styles.priceRow}>
                    <Text style={styles.priceText}>
                      {participant.count} {participant.type} x{' '}
                      {hasDiscount ? (
                        <>
                          <Text style={styles.originalPriceInline}>
                            {tour.price.value}
                          </Text>
                          <Text style={styles.discountedPriceInline}>
                            {' '}
                            {pricePerPerson}
                          </Text>
                        </>
                      ) : (
                        `${tour.price.value}`
                      )}{' '}
                      EUR
                    </Text>
                    <Text
                      style={[
                        styles.priceValue,
                        hasDiscount && styles.discountedPriceValue,
                      ]}>
                      {participant.count * pricePerPerson} EUR
                    </Text>
                  </View>
                ))}

              {hasDiscount && tour.price.discount?.description && (
                <View style={styles.discountInfo}>
                  <Icon name="tag" size={16} color="#FF5A5F" />
                  <Text style={styles.discountText}>
                    {tour.price.discount.description}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.cancellation}>
              <Icon name="calendar-check" size={20} color="#1a1a1a" />
              <Text style={styles.cancellationText}>Cancelación gratuita</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceLabel}>Precio total</Text>
          <View>
            {hasDiscount && (
              <Text style={styles.originalTotalPrice}>
                {participants.reduce(
                  (total, p) => total + p.count * tour.price.value,
                  0,
                )}{' '}
                EUR
              </Text>
            )}
            <Text
              style={[
                styles.totalPriceValue,
                hasDiscount ? {color: '#FF5A5F'} : null,
              ]}>
              {calculateTotalPrice() === 0
                ? 'Gratis'
                : `${calculateTotalPrice()} EUR`}
            </Text>
          </View>
        </View>
        <Pressable style={styles.bookButton} onPress={handleCheckout}>
          <Text style={styles.bookButtonText}>Reservar ahora</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  optionCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  optionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  blueText: {
    color: '#0066ff',
  },
  timeSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  timeSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  priceBreakdown: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  discountedPriceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5A5F',
  },
  inlinePrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPriceInline: {
    fontSize: 14,
    color: '#7F8C8D',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  discountedPriceInline: {
    fontSize: 14,
    color: '#FF5A5F',
    fontWeight: '500',
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  discountText: {
    marginLeft: 4,
    color: '#FF5A5F',
    fontSize: 14,
  },
  cancellation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  cancellationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1a1a1a',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalPriceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  originalTotalPrice: {
    fontSize: 14,
    color: '#7F8C8D',
    textDecorationLine: 'line-through',
    textAlign: 'right',
  },
  bookButton: {
    backgroundColor: '#ff5a5f',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
