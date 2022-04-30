import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';



export function Chat(props) {

  const [text, setText ] = useState('');

  const alertMyText = (input = {}) => {
    Alert.alert(input.text);
  }

  let { username, backgroundColor } = props.route.params;
  props.navigation.setOptions({ title: username });

  return (
      <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
        <TextInput style={styles.textInput} onChangeText={(text) => setText(text)} value={text} placeholder='Type here ...'/>
        <Text>Your wrote: {text}</Text>
        <Button onPress={() => {alertMyText({text: text })}} title='Press Me' />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
