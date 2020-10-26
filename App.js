import React from 'react'
import { StyleSheet } from 'react-native'
import Register from './components/Register'
import Connect from './components/Connect'
import SnapImage from './components/SnapImage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer style={style.container}>
        <Stack.Navigator initialRouteName="Inscription">
          <Stack.Screen name="Register" component={Register} options={{ headerStyle: { backgroundColor: '#36485f' }, headerTintColor: 'white' }} />
          <Stack.Screen name="Connect" component={Connect} options={{ headerLeft: () => { }, headerStyle: { backgroundColor: '#36485f' }, headerTintColor: 'white' }} />
          <Stack.Screen name="SnapImage" component={SnapImage} options={{ headerLeft: () => { }, headerStyle: { backgroundColor: '#36485f' }, headerTintColor: 'white' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  }
})






/*import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Image from "./components/SnapImage";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>Sample React Native Add Image</Text>
<SnapImage/>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
});

/*
import React, { useState, useEffect } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
*/