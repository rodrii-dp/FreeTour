import {
  StyleSheet,
  Pressable,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface Props {
  title: string;
  value?: string;
  onPress: () => void;
  red?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SettingRow = ({title, value, onPress, red, style}: Props) => (
  <Pressable style={[style && style, styles.row]} onPress={onPress}>
    <View style={styles.rowContent}>
      <Text style={red ? styles.redTitle : styles.title}>{title}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
    {!red && <Icon name="chevron-forward-outline" size={20} color="#999" />}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  redTitle: {
    fontSize: 16,
    color: 'red',
  },
  value: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
});
