/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

export default class mapMarkers extends Component {
  state = {
    initialPosition: {
      latitude: -33.861189, // hardcode to Tiong Bahru chicken rice
      longitude: 151.210835,
      accuracy: 100,
    },
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords} = position;
        this.setState({
          initialPosition: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
          }
        })
      },
      (error) => alert(JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  // Ripped from https://github.com/airbnb/react-native-maps/issues/505
  regionFrom(lat, lon, accuracy) {
    const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

    const accuracyZoomedOut = accuracy * 40;
    const latDelta = accuracyZoomedOut * (1 / (Math.cos(lat) * circumference));
    const lonDelta = (accuracyZoomedOut / oneDegreeOfLongitudeInMeters);

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: Math.max(0, latDelta),
      longitudeDelta: Math.max(0, lonDelta)
    };
  }

  render() {
    const {initialPosition: {longitude, latitude, accuracy}} = this.state;
    const initialRegion = this.regionFrom(latitude, longitude, accuracy);

    return (
      <View style={styles.root}>
        <MapView style={styles.map}
                 showsUserLocation={true}
                 initialRegion={initialRegion}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

AppRegistry.registerComponent('mapMarkers', () => mapMarkers);
