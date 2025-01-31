import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';

interface ExperienceCardProps {
  title: string;
  location: string;
  imageUrl: ImageSourcePropType;
  width?: number;
}

export const ExperienceCard = ({
  title,
  location,
  imageUrl,
  width = Dimensions.get('window').width * 0.7,
}: ExperienceCardProps) => {
  return (
    <View style={[styles.card, {width}]}>
      <ImageBackground
        source={imageUrl}
        style={styles.imageBackground}
        imageStyle={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </ImageBackground>
    </View>
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
