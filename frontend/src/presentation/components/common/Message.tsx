import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {GenericIcon} from '../../icons/Icon.tsx';

interface Props {
  error: string | null;
  type?: 'error' | 'warning' | 'info';
  style?: object;
}

export const Message = ({error, type = 'error', style = {}}: Props) => {
  if (!error) {
    return null;
  }

  const icon =
    type === 'error' ? (
      <GenericIcon name="close-circle-outline" color="#E74C3C" style={style} />
    ) : type === 'warning' ? (
      <GenericIcon name="alert-circle-outline" color="#E74C3C" style={style} />
    ) : (
      <GenericIcon
        name="information-circle-outline"
        color="#E74C3C"
        style={style}
      />
    );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={globalStyles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
    color: '#ff4d4d',
  },
});
