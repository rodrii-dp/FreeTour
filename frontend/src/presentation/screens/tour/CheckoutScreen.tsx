import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import type {Tour} from '../../../domain/entities/tour';
import {ParticipantsModal} from '../../components/common/ParticipantsModal.tsx';

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
  const navigation = useNavigation();

  const [participantsModalVisible, setParticipantsModalVisible] =
    useState(false);
  const [participants, setParticipants] = useState([
    {type: 'Adulto', ageRange: 'Edad 14-99', count: 1},
    {type: 'Niño', ageRange: 'Edad 4-13', count: 0},
    {type: 'Bebé', ageRange: 'Hasta los 3 años', count: 0},
  ]);

  const formattedDate = new Date(selectedDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const calculateTotalPrice = () => {
    return participants.reduce((total, participant) => {
      return total + participant.count * tour.price.value;
    }, 0);
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
              <Pressable style={styles.timeButton}>
                <Text style={styles.timeButtonText}>11:30</Text>
                <Icon name="chevron-down" size={24} color="#1a1a1a" />
              </Pressable>
            </View>

            <View style={styles.priceBreakdown}>
              {participants
                .filter(participant => participant.count > 0)
                .map((participant, index) => (
                  <View key={`${participant}-${index}`} style={styles.priceRow}>
                    <Text style={styles.priceText}>
                      {participant.count} {participant.type} x{' '}
                      {tour.price.value} EUR
                    </Text>
                    <Text style={styles.priceValue}>
                      {participant.count * tour.price.value} EUR
                    </Text>
                  </View>
                ))}
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
          <Text style={styles.totalPriceValue}>
            {calculateTotalPrice()} EUR
          </Text>
        </View>
        <Pressable style={styles.bookButton}>
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
  },
  priceText: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
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
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalPriceValue: {
    fontSize: 20,
    fontWeight: 'bold',
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
