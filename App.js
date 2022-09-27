import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function App() {

  const [region,setRegion] = useState({
    latitude:60.200692,
    longitude:24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
    
  })
  const[keyword, setKeyword] = useState('');

  const getAddress = () => {
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=6xTUGn75DFY9mRXJ6osTNeWGFyRJYLPW&location=${keyword}')
      .then(response => response.json())
      .then(data => setRegion({latitude: data.results[0].locations[0].latLng.lat, longitude: data.results[0].locations[0].latLng.lng }))
      .catch(error => {
      Alert.alert('Error', error)
    })
  }

  
  
  
  return (
    <View style={styles.container}>
    <MapView  style={{ flex: 4 }} 
     region={region}>
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
