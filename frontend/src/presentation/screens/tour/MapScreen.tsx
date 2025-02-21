import React, {useEffect, useRef, useState, useCallback} from 'react';
import {RouteProp, useRoute, useFocusEffect} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigation/HomeStackNavigator.tsx';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, ScrollView, Text, View, Dimensions} from 'react-native';

type MapRouteProp = RouteProp<HomeStackParamList, 'Map'>;

const {width, height} = Dimensions.get('window');

export const MapScreen = () => {
  const route = useRoute<MapRouteProp>();
  const {stops, meetingPoint} = route.params;

  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);
  const [key, setKey] = useState(0);

  const initialRegion = {
    latitude: stops[0].location.lat,
    longitude: stops[0].location.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const fitMapToMarkers = useCallback(() => {
    if (mapRef.current && stops.length > 0) {
      const coordinates = stops.map(stop => ({
        latitude: stop.location.lat,
        longitude: stop.location.lng,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, [stops]);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [stops]);

  useEffect(() => {
    if (mapReady) {
      fitMapToMarkers();
    }
  }, [mapReady, fitMapToMarkers]);

  const handleMapReady = () => {
    setMapReady(true);
    fitMapToMarkers();
  };

  useFocusEffect(
    useCallback(() => {
      if (mapRef.current) {
        fitMapToMarkers();
      }
    }, [fitMapToMarkers]),
  );

  const renderMarkers = () => {
    return stops.map((stop, index) => (
      <Marker
        key={`marker-${key}-${index}-${stop.location.lat}-${stop.location.lng}`}
        coordinate={{
          latitude: stop.location.lat,
          longitude: stop.location.lng,
        }}
        title={stop.stopName}
        description={stop.location.direction}>
        <View style={styles.markerContainer}>
          <View style={styles.marker}>
            <Text style={styles.markerText}>{index + 1}</Text>
          </View>
        </View>
      </Marker>
    ));
  };

  const renderPolyline = () => {
    return (
      <Polyline
        key={`polyline-${key}`}
        coordinates={stops.map(stop => ({
          latitude: stop.location.lat,
          longitude: stop.location.lng,
        }))}
        strokeColor="#FF5A5F"
        strokeWidth={3}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        key={key}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={handleMapReady}>
        {renderMarkers()}
        {renderPolyline()}
      </MapView>

      <ScrollView style={styles.stopsContainer}>
        <Text style={styles.title}>Itinerario del tour</Text>
        <Text style={styles.meetingPoint}>
          Punto de encuentro &rarr; {meetingPoint}
        </Text>

        {stops.map((stop, index) => (
          <View key={`stop-${index}`} style={styles.stopItem}>
            <View style={styles.stopNumber}>
              <Text style={styles.stopNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stopInfo}>
              <Text style={styles.stopName}>{stop.stopName}</Text>
              <Text style={styles.stopAddress}>{stop.location.direction}</Text>
            </View>
            {index < stops.length - 1 && <View style={styles.connector} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.5,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#FF5A5F',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stopsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  stopItem: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  stopNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF5A5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stopNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  meetingPoint: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  stopAddress: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  connector: {
    position: 'absolute',
    left: 15,
    top: 30,
    width: 2,
    height: 40,
    backgroundColor: '#FF5A5F',
  },
});
