import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useFavoritesStore} from '../../stores/favoritesStore';
import {Tour} from '../../../domain/entities/tour.ts';

export const FavoritesScreen = () => {
  const {favoriteTours} = useFavoritesStore();

  const renderFavoriteItem = ({item}: {item: Tour}) => (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.images[0]?.imageUrl}}
        style={styles.image}
        defaultSource={require('../../assets/no_image.png')}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.provider}>Proveedor: {item.provider.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoriteTours.length > 0 ? (
        <FlatList
          data={favoriteTours}
          keyExtractor={item => item.id}
          renderItem={renderFavoriteItem}
        />
      ) : (
        <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  provider: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 32,
  },
});
