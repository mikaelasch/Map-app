import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null)
  const[keyword, setKeyword] = useState('');
  const [region,setRegion] = useState({
    "latitude":60.200692,
    "longitude":24.934302,
    "latitudeDelta": 0.0322,
    "longitudeDelta": 0.0221,
    
  })

  useEffect(() => {
      (async () => 
      {let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
           Alert.alert('No permission to get location')
           return;    }
           let location = await Location.getCurrentPositionAsync({}); 
           setRegion({ "latitude": location.coords.latitude, "longitude": location.coords.longitude });
           })();}, []);
  

  const getAddress = () => {
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=6xTUGn75DFY9mRXJ6osTNeWGFyRJYLPW&location=' + keyword)
      .then(response => response.json())
      .then(data => setRegion({"latitude": data.results[0].locations[0].latLng.lat, "longitude": data.results[0].locations[0].latLng.lng }))
      .catch(error => {
      Alert.alert('Error', error)
    })
  }

  
  
  
  return (
    <View style={styles.container}>
    <MapView  style={{ flex: 4 }} 
     region={{latitude: region.latitude, longitude: region.longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta}}>
        <Marker coordinate={{
          latitude:region.latitude, longitude:region.longitude
          }}
          title={keyword} />
      </MapView>
      <View style={{ flex: 1 }}>
      <TextInput style={{ fontSize: 18, width: 200 }}
       placeholder='insert address'
       value={keyword}
       onChangeText={value => setKeyword(value)}
       ></TextInput>
       <Button title='SHOW' onPress={getAddress} ></Button>
       </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
 
});
