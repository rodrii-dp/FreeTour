import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import YellowUnderline from '../../assets/yellow-underline.svg';
import {ExperienceCard} from './ExperienceCard';
import {ServiceButton} from './ServiceButton';
import {IconButton, Searchbar} from 'react-native-paper';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require('../../assets/varenna.png')}
            style={styles.heroImage}
            imageStyle={styles.backgroundImage}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBarWrapper}>
                <Searchbar
                  placeholder="Encuentra tours"
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={styles.searchBar}
                  inputStyle={styles.searchInput}
                  iconColor="#666"
                  placeholderTextColor="#666"
                />
              </View>
              <IconButton
                icon="bell-outline"
                iconColor="#666"
                size={32}
                onPress={() => {}}
                style={styles.notificationButton}
              />
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                Vive experiencias{'\n'}únicas en lugares{'\n'}mágicos
              </Text>
              <YellowUnderline />
              <Text style={styles.heroSubtitle}>
                Conoce la belleza de Verenna
              </Text>
              <Text style={styles.heroMoreInfo}>Más información &rarr;</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencias culturales</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ExperienceCard
              title="Paseo en barca"
              location="Lago di Braies"
              imageUrl={require('../../assets/lago_di_braies.png')}
            />
            <ExperienceCard
              title="Tarde gastronómica"
              location="Varenna"
              imageUrl={require('../../assets/varenna.png')}
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <Text style={styles.seeAll}>Ver todos</Text>
          </View>
          <View style={styles.servicesContainer}>
            <ServiceButton icon="home" label="Hotel" onPress={() => {}} />
            <ServiceButton icon="airplane" label="Flight" onPress={() => {}} />
            <ServiceButton icon="bus" label="Bus" onPress={() => {}} />
            <ServiceButton icon="ferry" label="Boat" onPress={() => {}} />
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Experiencias culturales</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ExperienceCard
              title="Paseo en barca"
              location="Lago di Braies"
              imageUrl={require('../../assets/lago_di_braies.png')}
            />
            <ExperienceCard
              title="Tarde gastronómica"
              location="Varenna"
              imageUrl={require('../../assets/varenna.png')}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    gap: 10,
  },
  searchBarWrapper: {
    flex: 1,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F8F8F8',
    borderRadius: 50,
  },
  searchInput: {
    fontSize: 16,
  },
  notificationButton: {
    margin: 0,
    backgroundColor: '#f8f8f8',
  },
  heroContainer: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  heroImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  heroContent: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: -5,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  heroMoreInfo: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  seeAll: {
    color: '#FF5A5F',
    fontSize: 14,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastSection: {
    marginBottom: 80,
  },
});
