import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export const GenericIcon = ({
  name,
  size = 24,
  style,
  color = 'black',
}: Props) => <Icon name={name} size={size} color={color} style={style} />;
