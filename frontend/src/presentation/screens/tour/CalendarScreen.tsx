import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {
  type NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import type {HomeStackParamList} from '../../navigation/HomeStackNavigator.tsx';

interface Props {
  route: RouteProp<HomeStackParamList, 'Calendar'>;
}

const today: Date = new Date();
const oneYearLater: Date = new Date();
oneYearLater.setFullYear(today.getFullYear() + 1);

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

const minMonth: string = formatDate(today).slice(0, 7);
const maxMonth: string = formatDate(oneYearLater).slice(0, 7);

export const CalendarScreen = ({route}: Props) => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const {tour} = route.params;

  const [currentMonth, setCurrentMonth] = useState<string>(minMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates: Record<string, {marked: boolean; dotColor: string}> =
    tour.availableDates.reduce((acc, date) => {
      acc[date] = {marked: true, dotColor: 'blue'};
      return acc;
    }, {} as Record<string, {marked: boolean; dotColor: string}>);

  const handleMonthChange = (month: DateData): void => {
    setCurrentMonth(month.dateString.slice(0, 7));
  };

  const handleDayPress = (day: DateData): void => {
    const isAvailableDate = tour.availableDates.includes(day.dateString);

    if (isAvailableDate) {
      setSelectedDate(day.dateString);
      navigation.navigate('Checkout', {
        tour,
        selectedDate: day.dateString,
      });
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});
