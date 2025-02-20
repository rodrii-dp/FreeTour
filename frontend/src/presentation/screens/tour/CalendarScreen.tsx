import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';

const availableDates: string[] = ['2025-03-10', '2025-04-15', '2025-06-06'];

const markedDates: Record<string, {marked: boolean; dotColor: string}> =
  availableDates.reduce((acc, date) => {
    acc[date] = {marked: true, dotColor: 'blue'};
    return acc;
  }, {} as Record<string, {marked: boolean; dotColor: string}>);

const today: Date = new Date();
const oneYearLater: Date = new Date();
oneYearLater.setFullYear(today.getFullYear() + 1);

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

const minMonth: string = formatDate(today).slice(0, 7);
const maxMonth: string = formatDate(oneYearLater).slice(0, 7);

export const CalendarScreen = () => {
  const [currentMonth, setCurrentMonth] = useState<string>(minMonth);

  const handleMonthChange = (month: DateData): void => {
    setCurrentMonth(month.dateString.slice(0, 7));
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType="dot"
        markedDates={markedDates}
        minDate={formatDate(today)}
        maxDate={formatDate(oneYearLater)}
        onMonthChange={handleMonthChange}
        disableArrowLeft={currentMonth === minMonth}
        disableArrowRight={currentMonth === maxMonth}
        theme={{
          arrowColor: '#FF5A5F',
          todayTextColor: '#FF5A5F',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});
