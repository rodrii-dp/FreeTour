import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';

interface Participant {
  type: string;
  ageRange: string;
  count: number;
}

interface ParticipantsModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (participants: Participant[]) => void;
  initialParticipants?: Participant[];
}

export const ParticipantsModal = ({
  visible,
  onClose,
  onApply,
  initialParticipants,
}: ParticipantsModalProps) => {
  const [participants, setParticipants] = useState<Participant[]>(
    initialParticipants || [
      {type: 'Adulto', ageRange: 'Edad +18', count: 1},
      {type: 'Niño', ageRange: 'Edad 4-13', count: 0},
      {type: 'Bebé', ageRange: 'Hasta los 3 años', count: 0},
    ],
  );

  const updateCount = (index: number, increment: boolean) => {
    const newParticipants = [...participants];
    if (increment) {
      newParticipants[index].count += 1;
    } else if (newParticipants[index].count > 0) {
      newParticipants[index].count -= 1;
    }
    setParticipants(newParticipants);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
              <Text style={styles.title}>Participantes</Text>
              <View style={styles.closeButton} />
            </View>

            <View style={styles.participantsContainer}>
              {participants.map((participant, index) => (
                <View key={participant.type} style={styles.participantRow}>
                  <View>
                    <Text style={styles.participantType}>
                      {participant.type}
                    </Text>
                    <Text style={styles.ageRange}>
                      ({participant.ageRange})
                    </Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <Pressable
                      onPress={() => updateCount(index, false)}
                      style={[
                        styles.counterButton,
                        participant.count === 0 && styles.counterButtonDisabled,
                      ]}>
                      <Text
                        style={[
                          styles.counterButtonText,
                          participant.count === 0 &&
                            styles.counterButtonTextDisabled,
                        ]}>
                        -
                      </Text>
                    </Pressable>
                    <Text style={styles.count}>{participant.count}</Text>
                    <Pressable
                      onPress={() => updateCount(index, true)}
                      style={styles.counterButton}>
                      <Text style={styles.counterButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.footer}>
              <Pressable
                style={styles.applyButton}
                onPress={() => onApply(participants)}>
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  participantsContainer: {
    padding: 16,
  },
  participantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  participantType: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  ageRange: {
    fontSize: 14,
    color: '#666',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  counterButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  counterButtonTextDisabled: {
    color: '#999',
  },
  count: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  applyButton: {
    backgroundColor: '#FF5A5F',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
