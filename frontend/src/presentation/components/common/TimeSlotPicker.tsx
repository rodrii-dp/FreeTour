import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import type {Availability} from '../../../domain/entities/tour';

interface TimeSlotPickerProps {
  availableTimes: Availability[];
  selectedDate: string;
  selectedTime: string;
  onTimeSelected: (time: string) => void;
}

export const TimeSlotPicker = ({
  availableTimes,
  selectedDate,
  selectedTime,
  onTimeSelected,
}: TimeSlotPickerProps) => {
  // Filter times for selected date
  const timesForDate = availableTimes.filter(
    slot => slot.date === selectedDate,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horarios disponibles</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTime}
          onValueChange={itemValue => onTimeSelected(itemValue)}
          style={styles.picker}>
          {timesForDate.map((slot, index) => (
            <Picker.Item
              key={slot.hours[index]}
              label={slot.hours[index]}
              value={slot.hours[index]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
});
