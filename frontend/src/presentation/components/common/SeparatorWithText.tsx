import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  text: string;
}

export const SeparatorWithText = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#d3d3d3',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#808080',
  },
});
