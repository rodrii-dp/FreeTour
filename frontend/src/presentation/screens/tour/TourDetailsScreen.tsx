import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const TourDetailsScreen = ({route}) => {
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
