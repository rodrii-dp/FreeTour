import React from 'react';
import {View, StyleSheet} from 'react-native';

interface PaginationDotsProps {
  totalDots: number;
  activeIndex: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const PaginationDots = ({
  totalDots,
  activeIndex,
  activeColor = '#FF5A5F',
  inactiveColor = '#E5E7EB',
}: PaginationDotsProps) => {
  if (totalDots <= 1) {
    return null;
  }

  return (
    <View style={styles.paginationDots}>
      {Array.from({length: totalDots}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === activeIndex ? activeColor : inactiveColor,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
