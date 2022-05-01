import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';



export function Chat(props) {

  // Sets message state to empty array
  const [messages, setMessages ] = useState([]);

  // props from Start screen
  let { username, backgroundColor } = props.route.params;
  // sets title of Chat screen to username
  props.navigation.setOptions({ title: username });

  // Once component mounts, useEffect sets message state to below.
  useEffect(() => {
    setMessages([
      { //Message format requirements for Gifted Chat.
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        // user object and requirements 
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      { // This is a system message. Used commonly to display last time user active or new to join chat
        _id: 2,
        text: `${username} has joined the chat`,
        createdAt: new Date(),
        system: true,
      }
    ])
  },[])

  // when new message is sent, its appended (added) to pervious "message" state and displayed in chat
  const onSend = useCallback((messages = []) => {
    setMessages(perviousMessages => GiftedChat.append(perviousMessages, messages))
  }, [])

  // changes color of senders bubble. Function called in 'renderBubble' of <GiftedCard /> component 
  const renderBubble = (props) => {
    return (
      <Bubble
        // inherits props from ...props. Then given new wrapperStyle to set background color.
        {...props}
        wrapperStyle={{
          // "right" for sender bubble and "left" for receiving bubble
          right: {
            backgroundColor: '#504D58'
          }
        }}
      />
    )
  }


  return (
      <View style={[{ backgroundColor: backgroundColor }, styles.container]} >
        <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        isTyping={true}
        onSend={message => onSend(message)}
        user={{
          _id: 1,
        }}
        />
        {/* Checks if user OS is android and if so, displays KeyboardAvoidingView so keyboard doesnt block message view */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    
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
