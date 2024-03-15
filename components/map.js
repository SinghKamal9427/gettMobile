import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import mapstyle from "./map.json";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
const { width, height } = Dimensions.get("window");
import { useFocusEffect } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";

export default function Map({ navigation }) {
  const [cordinates, setCordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.002,
    longitudeDelta: 0.0021,
  });

  const cabLocations = [
    { id: 1, latitude: 30.712854841224868, longitude: 76.69170163571835, title:"driverF"},
    { id: 2, latitude: 30.711564627709247, longitude: 76.69168051332235 , title:"driverS"},
  ];

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [error, setError] = useState(false);

  const origin = {latitude: 30.712854841224868, longitude: 76.69170163571835,};
  const destination = {latitude: 30.711564627709247, longitude: 76.69168051332235 };

  const handleLocationPermission = async () => {
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
    setCordinates((prev) => ({
      ...prev,
      latitude: locations.coords.latitude,
      longitude: locations.coords.longitude,
    }));
    setError(true);
    return true;
  };

  const handleLocationPermissionDenied = async () => {
    Linking.openSettings();
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleLocationPermission();
    }, [error])
  );

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
    setLocation(newRegion);
  };

  const handleRegionChanged = (newRegion) => {
    /* setCordinates(newRegion); */
  };



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
        
          title="marker"
        >
          <FontAwesome6 name="location-dot" size={30} color="black" />
        </Marker>

         {cabLocations.map((cab) => (
          <Marker
            coordinate={{
              latitude: cab.latitude,
              longitude: cab.longitude,
            }}
            title={cab.title}
            key={cab.id}s
            rotation={0}
          >
            <FontAwesome6 name="car-side" size={24} color="black" />
          </Marker>
        ))} 
        <MapViewDirections origin={origin}
    destination={destination}
    apikey="AIzaSyCIzAKymHkOopghukYuCWV0rFy8HLhGGsk"
    />
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
