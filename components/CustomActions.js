import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import { useActionSheet } from "@expo/react-native-action-sheet";
import { storage } from './firebase';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';



const CustomActions = (props) => {
  
  // lets user pick image from library to send in chat
  const pickImage = async () => {
    // asks permission for app to access Media Library 
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      }).catch(error => console.log(error));
      
      if (!result.cancelled) {
        const imageUrl = await uploadImage(result.uri);
        props.onSend({ image: imageUrl });
      }
    }
  }
  // lets user take a photo and send it in chat
  const takePhoto = async () => {
    // asks permission for app to access Media Library and Camera 
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if(status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      }).catch(error => console.log(error));
      
      if (!result.cancelled) {
        const imageUrl = await uploadImage(result.uri);
        props.onSend({ image: imageUrl });
      }
    }
  }
  // lets user send geo location in chat
  const getLocation = async () => {
    // // asks permission for app to access Location 
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status === 'granted') {
      let result = await Location.getCurrentPositionAsync({})
      .catch(error => console.log(error));
      if (result) {
        props.onSend({ location:{
          longitude: result.coords.longitude,
          latitude: result.coords.latitude
        }});
      }
    }
  }

  // uploads image to firestore database 
  const uploadImage = async (uri) => {

    // how the image will be view in db
    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    // references the storage db and which image to upload
    const storageRef = ref(storage, `images/${imageName}`)

    // converts image from array to bytes
    const img = await fetch(uri);
    const bytes = await img.blob()

    // uploads image to storageRef
    const imageUpload = await uploadBytes(storageRef, bytes)

    // retrieves image URL from server
    return await getDownloadURL(storageRef, `images/${imageName}`);
    
  };

  // connects ActionSheetProvider
  const { showActionSheetWithOptions } = useActionSheet();  

  const onActionPress = () => {
    // options to choice from when action sheet displayed to user
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    // sets cancel button 
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    async (buttonIndex) =>{
      switch (buttonIndex) {
        case 0:
          console.log('user wants to pick an image');
          return pickImage();
        case 1:
          console.log('user wants to take a photo');
          return takePhoto();
        case 2: 
          console.log('user wants to get their location');
          return getLocation();
        default:
      }
    });
  };

  return (

    <TouchableOpacity
      accessible={true}
      accessibilityLabel='More sending options'
      accessibilityHint='Lets you choose to send photo from library, take a photo or send geo location'
      accessibilityRole='button'
      style={[styles.container]}
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, props.wrapperStyle]}>
        <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomActions

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})
