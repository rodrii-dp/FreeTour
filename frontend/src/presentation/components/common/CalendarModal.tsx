import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  SafeAreaView,
} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  availableDates: string[];
}

const today: Date = new Date();
const oneYearLater: Date = new Date();
oneYearLater.setFullYear(today.getFullYear() + 1);

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

const minMonth: string = formatDate(today).slice(0, 7);
const maxMonth: string = formatDate(oneYearLater).slice(0, 7);

export const CalendarModal = ({
  visible,
  onClose,
  onDateSelect,
  availableDates,
}: CalendarModalProps) => {
  const [currentMonth, setCurrentMonth] = useState<string>(minMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates: Record<string, {marked: boolean; dotColor: string}> =
    availableDates.reduce((acc, date) => {
      acc[date] = {marked: true, dotColor: 'blue'};
      return acc;
    }, {} as Record<string, {marked: boolean; dotColor: string}>);

  const handleMonthChange = (month: DateData): void => {
    setCurrentMonth(month.dateString.slice(0, 7));
  };

  const handleDayPress = (day: DateData): void => {
    const isAvailableDate = availableDates.includes(day.dateString);

    if (isAvailableDate) {
      setSelectedDate(day.dateString);
      onDateSelect(day.dateString);
      onClose();
    }
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
              <Text style={styles.title}>Seleccionar fecha</Text>
              <View style={styles.closeButton} />
            </View>

            <Calendar
              markingType="dot"
              markedDates={markedDates}
              minDate={formatDate(today)}
              maxDate={formatDate(oneYearLater)}
              onMonthChange={handleMonthChange}
              onDayPress={handleDayPress}
              disableArrowLeft={currentMonth === minMonth}
              disableArrowRight={currentMonth === maxMonth}
              theme={{
                arrowColor: '#FF5A5F',
                todayTextColor: '#FF5A5F',
              }}
            />
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
});
