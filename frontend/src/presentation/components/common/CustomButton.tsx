import React, {ReactNode} from 'react';
import {Pressable, StyleProp, ViewStyle, TextStyle, View} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {Text} from 'react-native-paper';

interface Props {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children?: any;
}

export const CustomButton = ({
  text,
  onPress,
  style,
  textStyle = globalStyles.buttonText,
  icon,
  iconPosition = 'left',
  children,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {opacity: pressed ? 0.8 : 1},
        globalStyles.button,
        style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // marginHorizontal: 30,
        },
      ]}>
      {iconPosition === 'left' && icon ? (
        <View style={{marginRight: 8}}>{icon}</View>
      ) : null}
      {text ? (
        <Text variant="bodyLarge" style={textStyle}>
          {text}
        </Text>
      ) : null}
      {iconPosition === 'right' && icon ? (
        <View style={{marginLeft: 8}}>{icon}</View>
      ) : null}
      {children}
    </Pressable>
  );
};
