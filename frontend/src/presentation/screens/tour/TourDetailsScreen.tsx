import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator.tsx';

type TourDetailsRouteProp = RouteProp<HomeStackParamList, 'TourDetails'>;

export const TourDetailsScreen = () => {
  const route = useRoute<TourDetailsRouteProp>();
  const {tourId} = route.params;

  return (
    <View style={styles.container}>
      <Text>Detalles del tour con ID: {tourId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
