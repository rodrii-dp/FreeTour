import React, {useState} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';

export const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={{flex: 1}}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
    </View>
  );
};
