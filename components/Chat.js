import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useWorkletCallback } from 'react-native-reanimated';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFQgCjWaTEk0crS4YDykDmovtymRa37II",
  authDomain: "chat-app-2-350db.firebaseapp.com",
  projectId: "chat-app-2-350db",
  storageBucket: "chat-app-2-350db.appspot.com",
  messagingSenderId: "24917673340",
  appId: "1:24917673340:web:c00e4d3a4de7fe70ec50f9",
  measurementId: "G-WKJSBLK77J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export function Chat(props) {

  // Sets message state to empty array
  const [messages, setMessages ] = useState([]);
  // Sets user id for authentication 
  const [uid, setUid] = useState();
  // User object for Gifted Chat
  const [user, setUser] = useState({
    _id: '',
    name: '',
    avatar: '',
  });

  // props from Start screen
  let { username, backgroundColor } = props.route.params;

  // Creates reference to messages collection on firestore
  const messageRef = collection(db, 'messages');

  // Once component mounts, useEffect sets message state to below.
  useEffect(() => {
    
    // sets title of Chat screen to username (Needs to be in useEffect otherwise throws error).
    props.navigation.setOptions({ title: username })
    
    const auth = getAuth();

    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if(!user) {
        await signInAnonymously(auth);
      }
      // set user and logged in text state once authenticated
      setUid(user.uid);
      setMessages([]);
      setUser({
        _id: user.uid,
        name: username,
        avatar: 'https://placeimg.com/140/140/any',
      });
    //  ques messages database and then calls Snapshot when message updates
    const userMessageQuery = query(messageRef, orderBy('createdAt', 'desc'));
    unsubscribe = onSnapshot(userMessageQuery, onCollectionUpdate)
    });
    
    return () => {
      authUnsubscribe();
    }
  }, [uid]);


  // Adds news doc to collection 
  const addMessage = (message) => {
    addDoc(messageRef, {
      uid: uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: user
    })
  }

  // Takes SnapShot of messages collection, then adds new message to message state
  const onCollectionUpdate = (querySnapshot) => {
    const message = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      message.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    setMessages(message)
  };

  // when new message is sent, its appended (added) to pervious "message" state and displayed in chat by calling addMessage
  const onSend = useCallback((messages = []) => {
    setMessages(perviousMessages => GiftedChat.append(perviousMessages, messages))
    addMessage(messages[0]);
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
          _id: user._id,
          name: user.name,
          avatar: user.avatar
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
});
