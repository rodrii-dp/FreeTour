import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {MenuSection} from '../../components/common/MenuSection';

export interface Item {
  name: string;
  icon: string;
  component: string;
}

export const SettingsScreen = () => {
  return (
    <View>
      <ScrollView>
        <MenuSection />
      </ScrollView>
    </View>
  );
};
