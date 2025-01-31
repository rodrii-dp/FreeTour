import React from 'react';
import {StyleSheet, View, Pressable, Dimensions} from 'react-native';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {Text} from 'react-native-paper';

interface Props {
  title: string;
  toggle?: () => void;
  isChecked?: boolean;
}

const {width} = Dimensions.get('window');

export const Checkbox = ({title, toggle, isChecked}: Props) => {
  const iconName = isChecked ? 'checkbox' : 'square-outline';

  return (
    <View style={styles.container}>
      <Pressable onPress={toggle}>
        <GenericIcon name={iconName} color={isChecked ? '#FF5A5F' : 'black'} />
      </Pressable>
      <Text variant="bodyLarge" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: width < 360 ? 16 : 18,
    color: '#4c5667',
    marginLeft: 10,
    flexShrink: 1,
  },
});
