import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {MenuSection} from '../../components/common/MenuSection';

export const SettingsScreen = () => {
  return (
    <View>
      <ScrollView>
        <MenuSection />
      </ScrollView>
    </View>
  );
};
