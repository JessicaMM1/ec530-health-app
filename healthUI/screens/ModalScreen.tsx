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
  const [dob, setDob] = React.useState("");

  // Radio button
  const [isDoctor, setDoctor] = useState(false);
  const [isPatient, setPatient] = useState(false);
  const [role, setRole] = useState("");

  // Login info text boxes
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
  const createUser = (bodyString: string) => {
    fetch("https://health-app-2022.ue.r.appspot.com/users", {
      // body: "f_name=poland&l_name=spring&role=patient&DOB=02/02/2000&assigned_doctor=dr.strange&username=polo&password=6789",
      // body: "f_name=warren&l_name=towers&role=doctor&username=warrt&password=123",
      body: bodyString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then((response) => {
      var statusCode = response.status
      console.log(response.status)
      if (statusCode == 200) {
        Alert.alert("Registration completed. Please log in")
        navigation.navigate('Auth');
      }
    });
  }

  const register = () => {

    var bodyBuilder = []

    if (role == 'doctor') {
      bodyBuilder.push(
        "f_name=",
        String(firstName),
        "&l_name=",
        String(lastName),
        "&role=",
        String(role),
        "&username=",
        String(username),
        "&password=",
        String(password),
      );
    }
    else if (role == 'patient') {
      bodyBuilder.push(
        "f_name=",
        String(firstName),
        "&l_name=",
        String(lastName),
        "&role=",
        String(role),
        "&DOB=",
        String(dob),
        "&assigned_doctor=Dr. Rhett Terrier",
        // String(assigned_doctor),
        "&username=",
        String(username),
        "&password=",
        String(password)
      );
    }

    var bodyString = bodyBuilder.join("")
    console.log("bodyString: " + bodyString);

    fetch('https://health-app-2022.ue.r.appspot.com/users').then((response) => {

      return response.json()

    }).then((data) => {

      var uprofile
      var darr = Object.values(data);
      for (const elem of darr) {

        console.log(elem)

        if (elem["username"] == username) {
          Alert.alert("Username Already Exists")
          return
        }
      }
      createUser(bodyString)
    })
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

        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="DOB: mm/dd/yyyy"
          keyboardType='default'
          maxLength={10}
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

      <Text style={styles.text}>Enter new login information:</Text>
      <SafeAreaView style={styles.safeAreaPos}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.button} onPress={register}>
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
    marginTop: 20
  },
  separator: {
    marginVertical: 5,
  },
  safeAreaPos: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20
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
    marginTop: 15,
    borderRadius: 15
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal'
  }
});
