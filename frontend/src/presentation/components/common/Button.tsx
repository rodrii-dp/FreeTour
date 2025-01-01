import React, {ReactNode} from 'react';
import {
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';

interface Props {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode; // Permitir cualquier componente React como ícono
  iconPosition?: 'left' | 'right'; // Posición del ícono
}

export const Button = ({
  text,
  onPress,
  style = globalStyles.button,
  textStyle = globalStyles.buttonText,
  icon,
  iconPosition = 'left',
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {opacity: pressed ? 0.8 : 1},
        style,
        {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
      ]}>
      {iconPosition === 'left' && icon ? (
        <View style={{marginRight: 8}}>{icon}</View>
      ) : null}
      {text ? <Text style={textStyle}>{text}</Text> : null}
      {iconPosition === 'right' && icon ? (
        <View style={{marginLeft: 8}}>{icon}</View>
      ) : null}
    </Pressable>
  );
};
