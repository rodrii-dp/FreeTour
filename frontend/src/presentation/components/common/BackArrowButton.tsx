import React from 'react';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import {GenericIcon} from '../../icons/Icon.tsx';

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BackArrowButton = ({onPress, style}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: '#ebeef3',
            borderRadius: 8,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        <GenericIcon name="chevron-back-outline" />
      </View>
    </Pressable>
  );
};
