import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function ModalScreen() {

  //const UselessTextInput = () => {
  const [textAcc, onChangeAcc] = React.useState(null);
  const [textPw, onChangePw] = React.useState(null);

  const login = ()=>{
    fetch('https://example.com/data').then((response) => response.json()).then((json) => {
      return data.names;
    }).catch((error) => {
      console.error(error);
    });
    }

  const register = ()=>{
      setReload(true)
      var len = Object.keys(items).length
      if(len>0){
        loadList()
      }
    }

  return (
    <View style={styles.container}>
      <View style={styles.titlePosition}>
        <Text style={styles.title}>Log in</Text>
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      
    <SafeAreaView style={styles.safeAreaPos}>
      <TextInput 
        style={styles.input} 
        onChangeText={onChangeAcc} 
        value={textAcc} 
        placeholder="username"
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangePw}
        value={textPw}
        placeholder="password"
        keyboardType="default"
      />
    </SafeAreaView>

    <TouchableOpacity style={styles.loginbutton} onPress={login}>

      <Text style={styles.loginText}>LOGIN</Text>

    </TouchableOpacity>

    <TouchableOpacity style={styles.regbutton} onPress={register}>

      <Text style={styles.regText}>REGISTER</Text>

    </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titlePosition: {
    alignItems: 'center',
    marginTop: 40,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  safeAreaPos: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginbutton: {
    alignItems: 'center',
    width: '40%',
    backgroundColor: 'lightskyblue',
    padding: 10,
    marginTop: 10,
    borderRadius: 15
  },

  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  regbutton: {
    alignItems: 'center',
    width: '40%',
    backgroundColor: 'lightskyblue',
    padding: 10,
    marginTop: 5,
    borderRadius: 15
  },
  regText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
