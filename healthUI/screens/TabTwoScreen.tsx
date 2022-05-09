// Chat screen

import { StyleSheet, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default function TabTwoScreen() {
  const [messages, setMessages] = useState([]);

  const createMessage = (text: String) => {

    var bodyBuilder = []
    bodyBuilder.push(
      "sender=",
      String(globalThis.username),
      "&recipient=Dr.Rhett",
      "&text=",
      String(text)
    );

    var bodyString = bodyBuilder.join("")
    console.log("bodyString: " + bodyString);

    fetch("https://health-app-2022.ue.r.appspot.com/new-msg?" + bodyString, {
      method: "POST"
    }).then((response) => {
      var statusCode = response.status
      console.log(response.status)
      // if (statusCode == 200) {
      //   Alert.alert("new msg")

      // }
    });
  }

  const getMessage = () => {
    console.log("GetMessage")
    fetch('https://health-app-2022.ue.r.appspot.com/chatGet?username=' + String(globalThis.username)).then((response) => {
      console.log("after fetch")
      console.log(response)
      var res = response.json()
      console.log(res)
      return res
    }).then((data) => {
      //var txtMsg = []
      console.log(data)
      var darr = Object.values(data);
      console.log(darr)
      for (const elem of darr) {
        console.log(elem)
        setMessages([{
          _id: elem['_id'],
          createdAt: elem['date'],
          text: elem['text'],
          user: elem['sender'],
        }
        ])
      }
      return darr;
    })
  }
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        datetime: new Date(),
        text: 'Hello, I am Dr. Rhett',
        user: {
          _id: 2,
          name: 'Dr.Rhett',
          avatar: 'https://images.app.goo.gl/eSwfvJFSbXHW8VA59',
        },
      },
    ])
  },
    [])

  useLayoutEffect(() => {
    fetch('https://health-app-2022.ue.r.appspot.com/chatGet?username=' + String(globalThis.username)).then((response) => {
      return response.json()
    }).then((data) => {
      //var txtMsg = []
      var darr = Object.values(data);

      for (const elem of darr) {
        console.log(elem)
        setMessages([{
          _id: elem['_id'],
          createdAt: elem['date'],
          text: elem['text'],
          user: elem['sender'],
        }
        ])
      }
      return darr;
    })

  }, [])

  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    createMessage(messages[0].text)
    getMessage()

  }, [])

  return (
    // <View style={styles.container}>
    // <Text style={styles.title}>Chat {globalThis.username}</Text>

    // <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
    < GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
    // user={{
    //   _id: 1,
    // }
    // }
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
