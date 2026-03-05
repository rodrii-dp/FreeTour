import React from 'react';
import {View, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import {useFavoritesStore} from '../../stores/favoritesStore';
import {Tour} from '../../../domain/entities/tour.ts';
import {
  CompositeNavigationProp,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigator/HomeStackNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<any, 'Explore'>,
  StackNavigationProp<HomeStackParamList>
>;

export const FavoritesScreen = () => {
  const {favoriteTours} = useFavoritesStore();
  const navigation = useNavigation<NavigationProps>();

  const renderFavoriteItem = ({item}: {item: Tour}) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Explore', {
          screen: 'TourDetails',
          params: {tour: item},
        })
      }>
      <Image
        source={
          item.images && item.images[0]?.imageUrl
            ? {uri: item.images[0].imageUrl}
            : require('../../assets/no_image.png')
        }
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.provider}>
          {item.provider.name
            ? item.provider.name
            : 'Información del proveedor no disponible'}
        </Text>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color="#7F8C8D" />
          <Text style={styles.location}>{item.location?.name || ''}</Text>
        </View>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="#BDBDBD" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Mis Favoritos</Text>
        {favoriteTours.length > 0 ? (
          <FlatList
            data={favoriteTours}
            keyExtractor={item => item._id}
            renderItem={renderFavoriteItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="heart-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
            <Text style={styles.emptySubtext}>
              Explora tours y guarda tus preferidos para acceder rápido.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2C3E50',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
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
    marginBottom: 4,
  },
  provider: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#7F8C8D',
    marginLeft: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7F8C8D',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    marginTop: 8,
  },
});
