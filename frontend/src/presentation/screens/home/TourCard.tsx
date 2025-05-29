import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Tour} from '../../../domain/entities/tour';

const DEFAULT_IMAGE = require('../../assets/no_image.png');

interface Props {
  tour: Tour;
  width?: number;
  onPress?: (experience: Tour) => void;
}

export const TourCard = ({
  tour,
  width = Dimensions.get('window').width * 0.7,
  onPress,
}: Props) => {
  const getImageSource = (): ImageSourcePropType => {
    if (tour.images.length > 0) {
      return {uri: tour.images[0].imageUrl};
    }
    return DEFAULT_IMAGE;
  };

  return (
    <TouchableOpacity
      style={[styles.card, {width}]}
      onPress={() => onPress && onPress(tour)}
      activeOpacity={0.8}>
      <ImageBackground
        source={getImageSource()}
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
