import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Tour} from '../../../domain/entities/tour';

interface TourCardProps {
  tour: Tour;
  width?: number;
  onPress?: (experience: Tour) => void;
}

/*
TODO:
 1. Ajustar información a mostrar según lo que contenga el esquema de MongoDB y hacer que se pueda pulsar en el Card
 para navegar al TourDetailsScreen
 2. Recibir el tour como prop, no las propiedades individualmente ✅
*/

export const TourCard = ({
  tour,
  width = Dimensions.get('window').width * 0.7,
  onPress,
}: TourCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, {width}]}
      onPress={() => onPress && onPress(tour)}
      activeOpacity={0.8}>
      <ImageBackground
        source={
          typeof tour.imageUrl === 'number'
            ? tour.imageUrl
            : {uri: tour.imageUrl.uri}
        }
        style={styles.imageBackground}
        imageStyle={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.location}>{tour.location.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 20,
  },
  content: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: 'white',
    fontSize: 14,
  },
});
