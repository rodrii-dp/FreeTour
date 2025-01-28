import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HelperText} from 'react-native-paper';
import {globalStyles} from '../../../config/theme/theme.ts';
import {GenericIcon} from '../../icons/GenericIcon.tsx';

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
      <GenericIcon
        name="close-circle-outline"
        color="#E74C3C"
        style={styles.icon}
      />
    ) : type === 'warning' ? (
      <GenericIcon
        name="alert-circle-outline"
        color="#E67E22"
        style={styles.icon}
      />
    ) : (
      <GenericIcon
        name="information-circle-outline"
        color="#3498DB"
        style={styles.icon}
      />
    );

  return (
    <View style={[styles.container, style]}>
      {icon}
      <HelperText
        type="error"
        visible={!!error}
        style={[styles.text, styles.boldText]}>
        {error}
      </HelperText>
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
  },
  text: {
    flexShrink: 1,
  },
  boldText: {
    fontWeight: '600',
  },
});
