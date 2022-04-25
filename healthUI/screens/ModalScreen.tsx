import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button, TextInput, SafeAreaView, Alert, TouchableOpacity } from 'react-native';

import { CheckBox } from 'react-native-elements';
import { Text, View } from '../components/Themed';

// Navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

export default function ModalScreen() {

  type authScreenProp = StackNavigationProp<RootStackParamList, 'Modal'>;

  const navigation = useNavigation<authScreenProp>();

  // Text boxes
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  // Radio button
  const [isDoctor, setDoctor] = useState(false);
  const [isPatient, setPatient] = useState(false);
  const [role, setRole] = useState("");

  const roleDoctor = () => {
    setDoctor(true);
    setPatient(false);
    setRole("doctor")
  }
  const rolePatient = () => {
    setDoctor(false);
    setPatient(true);
    setRole("patient")
  }

  // Util functions
  const completeRegistration = () => {

    // Add error checking 
    navigation.navigate('Root');
    Alert.alert("Registered!\n" + role + "\n" + firstName + "\n" + lastName)

    // call POST /users
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlePos}>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <SafeAreaView style={styles.safeAreaPos}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          keyboardType='default'
        />

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          keyboardType='default'
        />
      </SafeAreaView>

      <Text style={styles.text}>Select your role:</Text>

      <View style={styles.rbcontainer}>
        <CheckBox
          title="Doctor"
          textStyle={styles.text}
          checked={isDoctor}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={roleDoctor}
          containerStyle={styles.rbuttons}
        />

        <CheckBox
          title="Patient"
          textStyle={styles.text}
          checked={isPatient}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={rolePatient}
          containerStyle={styles.rbuttons}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={completeRegistration}>
        <Text style={styles.title}>SUBMIT</Text>
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
  titlePos: {
    alignItems: 'center',
    marginTop: 40
  },
  separator: {
    marginVertical: 10,
  },
  safeAreaPos: {
    alignItems: 'center',
    marginVertical: 15,
    marginBottom: 30
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 150
  },
  rbcontainer: {
    flexDirection: 'row',
    marginVertical: 20
  },
  rbuttons: {
    backgroundColor: 'white',
    borderColor: 'white'
  },
  button: {
    alignItems: 'center',
    width: '40%',
    backgroundColor: 'lightskyblue',
    padding: 10,
    marginVertical: 20,
    borderRadius: 15
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal'
  }
});
