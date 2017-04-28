import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const RESTAURANTS = [
  {
    key: 'Cafe Sydney',
    title: 'Cafe Sydney',
    description: 'Customs House, 31 Alfred St, Sydney NSW 2000',
    latLong: {
      latitude: -33.861924,
      longitude: 151.210891,
    },
  },
  {
    key: 'Four Frogs Creperie',
    title: 'Four Frogs Creperie',
    description: '1 Macquarie Pl, Sydney NSW 2000',
    latLong: {
      latitude: -33.861755,
      longitude: 151.209941,
    },
  },
  {
    key: 'Tapavino',
    title: 'Tapavino',
    description: '6 Bulletin Pl, Sydney NSW 2000',
    latLong: {
      latitude: -33.862512,
      longitude: 151.209490,
    },
  },
];

const marker = require('./assets/images/marker.png');
const selectedMarker = require('./assets/images/marker-selected.png');

export default class MapMarkers extends Component {
  state = {
    region: {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 0.0043, // hardcode zoom levels just for example
      longitudeDelta: 0.0034,
    },
    selectedMarkerIndex: 0,
  };

  constructor(props) {
    super(props);
    this.onPressMarker = this.onPressMarker.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({
        region: {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      }),
      error => alert(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  onPressMarker(e, index) {
    console.log(`marker pressed! ${e}, markerIndex: ${index}`);
    this.setState({selectedMarkerIndex: index});
  }

  // note that you need to style the map, otherwise you'll get
  // a blank screen
  render() {
    return (
      <View style={styles.root}>
        <MapView style={styles.map}
                 showsUserLocation={true}
                 followsUserLocation={true}
                 initialRegion={this.state.region}
        >
          {
            RESTAURANTS.map((r, i) => {
              return <MapView.Marker
                coordinate={r.latLong}
                title={r.title}
                description={r.description}
                key={`marker-${i}`}
                onPress={e => this.onPressMarker(e, i)}
                image={this.state.selectedMarkerIndex === i ? selectedMarker : marker}
              />
            })
          }
        </MapView>
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

AppRegistry.registerComponent('mapMarkers', () => MapMarkers);
