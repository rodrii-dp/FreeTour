import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type StarRatingProps = {
  rating: number;
  size?: number;
  color?: string;
  inactiveColor?: string;
};

export const StarRating = ({
  rating,
  size = 16,
  color = '#FFC107',
  inactiveColor = '#BDC3C7',
}: StarRatingProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={size}
          color={i <= rating ? color : inactiveColor}
        />,
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
