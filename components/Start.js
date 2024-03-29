import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
        Text, 
        View, 
        Image,
        TextInput, 
        ImageBackground, 
        TouchableOpacity, 
        Pressable, 
        TouchableWithoutFeedback, 
        Keyboard,  } from 'react-native';
import React, { useState, useEffect } from 'react';
import BackgroundImage from '../assets/Background_Image.png';
import icon from '../assets/icon2.png';

export function Start(props) {

  const colors = {
    black: '#090C08',
    darkPurple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE'
  };

  // sets username to state
  let [username, setUsername ] = useState('');
  let [backgroundColor, setBackgroundColor ] = useState('#757083');


  return (
    // TouchableWithoutFeedback surrounds whole to dismiss keyboard when touch outside keyboard.
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <ImageBackground style={styles.background_image} source={BackgroundImage} resizeMode="cover"> 

          <Text style={styles.title}>ChatApp</Text>
          
          <View style={styles.login_container}>
            <View style={styles.textBox}>
              <Image source={icon} style={styles.icon} />
              {/* Input to create username to pass to Chat screen */}
              <TextInput 
                style={styles.input}
                onChangeText={(username) => setUsername(username)} 
                value={username} placeholder= 'Create Username' 
              />
            
            </View>
            
            <View>
              <Text>Choose Background Color:</Text>
              {/* Sets background color for chat screen */}
              <View style={styles.choose_background}>
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Background color black'
                  accessibilityHint='Lets you choose a color for the chat background'
                  accessibilityRole='button'
                  style={[styles.background_color1, styles.box]} 
                  onPress={() => setBackgroundColor(colors.black)} 
                />
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Background color dark purple'
                  accessibilityHint='Lets you choose a color for the chat background'
                  accessibilityRole='button'
                  style={[styles.background_color2, styles.box]} 
                  onPress={() => setBackgroundColor(colors.darkPurple)} 
                />
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Background color blue'
                  accessibilityHint='Lets you choose a color for the chat background'
                  accessibilityRole='button'
                  style={[styles.background_color3, styles.box]} 
                  onPress={() => setBackgroundColor(colors.blue)} 
                />
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Background color green'
                  accessibilityHint='Lets you choose a color for the chat background'
                  accessibilityRole='button'
                  style={[styles.background_color4, styles.box]} 
                  onPress={() => setBackgroundColor(colors.green)} 
                />
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
  textBox: {
    width: '88%',
    height: 60,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#403d39',
    opacity: 0.8
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
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
