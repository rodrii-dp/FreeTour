import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ServiceButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  isSelected: boolean;
}

export const ServiceButton = ({
  icon,
  label,
  onPress,
  isSelected,
}: ServiceButtonProps) => {
  return (
    <Pressable
      style={[styles.button, isSelected && {backgroundColor: '#FF5A5F'}]}
      onPress={onPress}>
      <Icon
        name={icon}
        size={24}
        color={isSelected ? '#F8F8F8' : '#FF5A5F'}
        style={styles.icon}
      />
      <Text style={isSelected ? [styles.label, {color: '#F8F8F8'}] : ''}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 10,
    minWidth: 80,
  },
  icon: {
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#333',
  },
});
