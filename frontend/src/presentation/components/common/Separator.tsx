import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Separator = ({style}: Props) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={[
          {
            alignSelf: 'center',
            width: '80%',
            height: 1,
            backgroundColor: 'black',
            opacity: 0.1,
            marginVertical: 8,
          },
          style,
        ]}
      />
    </View>
  );
};
