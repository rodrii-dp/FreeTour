import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface TimeSlotPickerProps {
  availableTimes: string[]; // Array de horas disponibles
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
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horarios disponibles</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTime}
          onValueChange={itemValue => onTimeSelected(itemValue)}
          style={styles.picker}>
          {availableTimes.map((hour, index) => (
            <Picker.Item key={hour + index} label={hour} value={hour} />
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
