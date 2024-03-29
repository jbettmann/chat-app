import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import React, { useState, useEffect, useCallback } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import MapView from "react-native-maps";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { db, deleteStorage } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import CustomActions from "./CustomActions.js";

export function Chat(props) {
  // Sets message state to empty array
  const [messages, setMessages] = useState([]);
  // Sets image state
  const [image, setImage] = useState(null);
  // Sets location state
  const [location, setLocation] = useState(null);
  // Sets user id for authentication
  const [uid, setUid] = useState(0);
  // User object for Gifted Chat
  const [user, setUser] = useState({
    _id: "",
    name: "",
    avatar: "",
  });
  // Set connection state to default
  const [connection, setConnection] = useState(false);

  // props from Start screen
  let { username, backgroundColor } = props.route.params;

  // Creates reference to messages collection on firestore
  const messageRef = collection(db, "messages");

  // Once component mounts, useEffect sets message state to below.
  useEffect(() => {
    // sets title of Chat screen to username (Needs to be in useEffect otherwise throws error).
    props.navigation.setOptions({ title: username });

    // checks if user is on or offline
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        setConnection(true);
        console.log("online");

        const auth = getAuth();

        const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            await signInAnonymously(auth);
          }
          // set user and logged in text state once authenticated
          setUid(user.uid);
          setMessages([]);
          setUser({
            _id: user.uid,
            name: username,
            avatar: "https://placeimg.com/140/140/any",
          });
          //  ques messages database and then calls Snapshot when message updates
          const userMessageQuery = query(
            messageRef,
            orderBy("createdAt", "desc")
          );
          unsubscribe = onSnapshot(userMessageQuery, onCollectionUpdate);
        });

        return () => {
          authUnsubscribe();
        };
      } else {
        setConnection(false);
        console.log("offline");
        // calls getMessages which stores messages in native storage, AsyncStorage
        getMessages();
      }
    });
  }, [uid]);

  // gets messages stored in native storage, AsyncStorage
  const getMessages = async () => {
    let message = "";
    try {
      message = (await AsyncStorage.getItem("messages")) || [];
      setMessages(JSON.parse(message));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Saves current message state to AsyncStorage
  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
      setMessages([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Adds news doc to collection
  const addMessage = (message) => {
    addDoc(messageRef, {
      uid: uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
    // if (message.text === "delete storage") {
    //   deleteStorage();
    // }
    // Deletes messages in localStoarge
    // if (message.text === "delete ") {
    //   deleteMessages();
    // }
  };

  // Takes SnapShot of messages collection, then adds new message to message state
  const onCollectionUpdate = (querySnapshot) => {
    const message = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      message.push({
        _id: data._id,
        text: data.text || "",
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    setMessages(message);
  };

  // when new message is sent, its appended (added) to pervious "message" state and displayed in chat by calling addMessage
  const onSend = useCallback((messages = []) => {
    setMessages((perviousMessages) =>
      GiftedChat.append(perviousMessages, messages)
    );
    addMessage(messages[0]);
    saveMessages();
  }, []);

  // function that renders custom action send image, take photo and send geo location from CustomActions component
  const renderCustomActions = (props) => {
    return (
      <ActionSheetProvider>
        <CustomActions {...props} />
      </ActionSheetProvider>
    );
  };

  // Check if message is a geo location. If so, sends in message
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // changes color of senders bubble. Function called in 'renderBubble' of <GiftedCard /> component
  const renderBubble = (props) => {
    return (
      <Bubble
        // inherits props from ...props. Then given new wrapperStyle to set background color.
        {...props}
        wrapperStyle={{
          // "right" for sender bubble and "left" for receiving bubble
          right: {
            backgroundColor: "#504D58",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (connection == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  return (
    <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
      <GiftedChat
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        messages={messages}
        isTyping={true}
        onSend={(message) => onSend(message)}
        user={{
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        }}
      />
      {/* Checks if user OS is android and if so, displays KeyboardAvoidingView so keyboard doesnt block message view */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
