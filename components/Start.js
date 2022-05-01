import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
        Text, 
        View, 
        TextInput, 
        ImageBackground, 
        TouchableOpacity, 
        Pressable, 
        TouchableWithoutFeedback, 
        Keyboard,  } from 'react-native';
import React, { useState, useEffect } from 'react';
import BackgroundImage from '../assets/Background_Image.png';
import Icon from '../assets/icon.svg';

export function Start(props) {

  const colors = {
    black: '#090C08',
    darkPurple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE'
  };

  // sets username to state
  const [username, setUsername ] = useState('');
  const [backgroundColor, setBackgroundColor ] = useState('#757083');


  return (
    // TouchableWithoutFeedback surrounds whole to dismiss keyboard when touch outside keyboard.
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <ImageBackground style={styles.background_image} source={BackgroundImage} resizeMode="cover"> 

          <Text style={styles.title}>Chat</Text>
          
          <View style={styles.login_container}>

            {/* Input to create username to pass to Chat screen */}
            <TextInput style={styles.textInput} onChangeText={(username) => setUsername(username)} value={username} placeholder= 'Create Username' /> 
            
            <View>
              <Text>Choose Background Color:</Text>
              {/* Sets background color for chat screen */}
              <View style={styles.choose_background}>
                <TouchableOpacity style={[styles.background_color1, styles.box]} onPress={() => setBackgroundColor(colors.black)} />
                <TouchableOpacity style={[styles.background_color2, styles.box]} onPress={() => setBackgroundColor(colors.darkPurple)} />
                <TouchableOpacity style={[styles.background_color3, styles.box]} onPress={() => setBackgroundColor(colors.blue)} />
                <TouchableOpacity style={[styles.background_color4, styles.box]} onPress={() => setBackgroundColor(colors.green)} />
              </View>
            </View>

            {/* navigates to Chat screen and send username state as prop to use in Chat */}
            <Pressable 
              // accessibility properties 
              accessible={true}
              accessibilityLabel='Tap to start chatting'
              accessibilityHint='Once button is tapped, you will enter the chat screen to begin chatting'
              accessibilityRole='button'
              // sets button background color to color chosen  
              style={[{ backgroundColor: backgroundColor }, styles.button ]}
              onPress={() => props.navigation.navigate('Chat', { username: username, backgroundColor: backgroundColor })} 
              title='Get Chatting' >
              <Text style={styles.button_text}>Start Chatting</Text>
            </Pressable>
            
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    color: '#fff',
    fontWeight: '600',
  },
  login_container: {
    width: '88%',
    height: '44%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    width: '88%',
    height: 60,
    color: 'rgba(117,112,131,0.5)',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
  },
  choose_background: {
    width: '88%',
    flexDirection: 'row',
    marginTop: 12,
  },
  box: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 25,
    
  },
  background_color1: {
    backgroundColor: '#090C08',
  },
  background_color2: {
    backgroundColor: '#474056',
  },
  background_color3: {
    backgroundColor: '#8A95A5',
  },
  background_color4: {
    backgroundColor: '#B9C6AE',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    height: 60,
  },
  button_text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
 
});
