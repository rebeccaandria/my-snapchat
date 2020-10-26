import React, { useState, useEffect } from 'react';
import { Button, Image, View, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';


export default function SnapImage() {
  const [image, setImage] = useState(null);
  //const [hasPermission, setHasPermission] = useState(null);
  //const [type, setType] = useState(Camera.Constants.Type.back);

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

/*import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref) ;
  }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:"50%",
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:"50%",
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}*/
 /*import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native' 
import { ActionSheet, Root} from "native-base" 
import ImagePicker from 'react-native-image-crop-picker'
import * as ImagePicker from 'expo-image-picker';
 const width = Dimensions.get('window').width

 export default class SnapImage extends React.Component {

     constructor(props) {
         super(props)
         this.state = {
             fileList: []
         }
     }

     onSelectImage = (image) => {
         let newDataImg = this.state.fileList
         const source = { uri: image.path }
         let item = {
             id: Date.now(),
             url: source,
             content: image.data
         }

         newDataImg.push(item)
         this.setState(state = { fileList: newDataImg })
     }

     takePhotoFromCamera = () => {
         ImagePicker.openCamera(options = {
             width: 300,
             height: 400,
             cropping: true,
         }).then(onfulfilled = image => {
             this.onSelectImage(image)
             console.log(image)
         })
     }

     choosePhotoFromLibrary = () => {
         ImagePicker.openPicker(options = {
             width: 300,
             height: 400,
             cropping: true
         }).then(onfulfilled = image => {
             this.onSelectImage(image)
             console.log(image)
         })
     }

     onClickAddImage = () => {
         const BUTTONS = ['Prendre une photo', 'Choisir une photo dans l\'album', 'Annuler']
         ActionSheet.show(
             {
                 options: BUTTONS,
                 cancelButtonIndex: 2,
                 title: 'Selectionner une photo'
             },
              buttonIndex => {
                 switch (buttonIndex) {
                     case 0:
                         this.takePhotoFromCamera()
                         break;
                     case 1:
                         this.choosePhotoFromLibrary()
                         break
                     default:
                         break
                 }
             }
         )
     }

     renderItem = ({ item, index }) => {

         return (
             <View>
                 <Image source={item.url} style={styles.itemImage} />
             </View>
         )
     }

     render() {

         let { content, btnPressStyle, txtStyle } = styles;
         let { fileList } = this.state;

         return (
             <Root>
                 <View style={content}>
                     <Text>Vas-y! Envoi ton Snap ;)!</Text>
                     <FlatList
                         data={fileList}
                         renderItem={this.renderItem}
                         keyExtractor={(item, index) => index.toString()}
                         extraData={this.state}
                     />
                     <TouchableOpacity
                         onPress={this.onClickAddImage}
                         style={btnPressStyle}>
                         <Text style={txtStyle}>Ajoute une image</Text>
                     </TouchableOpacity>
                 </View>
             </Root>
         )
     }
 }

 const styles = StyleSheet.create({
     content: {
         flex: 1,
         alignItems: 'center',
         marginTop: 50,
         paddingLeft: 30,
         paddingRight: 30,
         marginBottom: 30
     },
     btnPressStyle: {
         backgroundColor: '#0080ff',
         height: 50,
         width: width - 60,
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 10,
     },
     txtStyle: {
         color: '#fff',
         marginBottom: 30,
         color: '#fff',
         borderBottomColor: '#f8f8f8',
         borderBottomWidth: 1,
     },
     itemImage: {
         backgroundColor: '#2F455C',
         height: 150,
         width: width - 60,
         borderRadius: 8,
         resizeMode: 'contain',

     }
 })*/