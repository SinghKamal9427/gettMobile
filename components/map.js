import React, { useEffect, useRef, useState } from "react";
import MapView ,{ Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import mapstyle from './map.json';
import { FontAwesome6 } from '@expo/vector-icons';/* 
import * as Location from "expo-location";
import * as Linking from "expo-linking"; */
const { width, height } = Dimensions.get("window");
import { useFocusEffect } from '@react-navigation/native';

export default function Map({ navigation }) {

const [cordinates , setCordinates] = useState({
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.002,
  longitudeDelta: 0.0021,
})


const [location, setLocation] = useState(({
  latitude: 37.78825,
  longitude: -122.4324,
}));


const [error, setError] = useState(false);


/* const handleLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError(false);
        Alert.alert("Alert", "Please Allow permission to Location Services", [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Allow", onPress: handleLocationPermissionDenied },
        ]);
        return false;
      }

      let locations = await Location.getCurrentPositionAsync({});
      setLocation(locations);
      setCordinates((prev)=>({...prev , latitude : locations.coords.latitude , longitude : locations.coords.longitude }))
      setError(true);
      return true;
}


const handleLocationPermissionDenied = async () => {
    Linking.openSettings()
}

  useEffect(() => {
    handleLocationPermission();
  }, []);



  useFocusEffect(
    React.useCallback(() => {
      handleLocationPermission()
    }, [error])
  );
 */

/* 
  const animateMarker = () => {


    const { latitude, longitude } = mapRef.current.__lastRegion;

   

     const newCoordinate = {
      latitude: latitude,
      longitude: longitude,
    };

    const duration = 1000; // Animation duration in milliseconds

    markerRef.current.animateMarkerToCoordinate(newCoordinate, duration); 
  }; */
  

const handleRegionChange = (newRegion) => {
  setLocation(newRegion)
  };

const handleRegionChanged = (newRegion) => {
      setCordinates(newRegion);
  };


  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      zoomControlEnabled={false}
      zoomEnabled={false}
      customMapStyle={mapstyle}
      region={cordinates}
      onRegionChange={handleRegionChange}
      onRegionChangeComplete={handleRegionChanged}
      showsUserLocation={true}
      followsUserLocation={true}
      provider={PROVIDER_GOOGLE}
    >
        <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      anchor={{ x: 0.5, y: 0.5 }}
      title="marker"
    >
        <FontAwesome6 name="location-dot" size={30} color="black"/>
    </Marker>
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
