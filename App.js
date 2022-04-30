import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Start }from './components/Start';
import { Chat } from './components/Chat';


export default function ChatApp() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer style={styles.app_container}>
      {/* initialRouteName should be one of Stack.Screens */}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Start} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  app_container: {
    fontFamily: 'Poppins',
  },
  one: {
    backgroundColor: 'gold',
    width: 50, 
    height: 50,
  },
  two: {
    backgroundColor: 'pink',
    flex: 1,
  },
  three: {
    backgroundColor: 'green',
    width: 100, 
    height: 200,
  },
  textInput: {
    width: 250,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
  },
  scroll: {
    fontSize: 110,
  },
});
