import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button, TextInput, SafeAreaView, Alert } from 'react-native';

// import { Picker } from '@react-native-picker/picker'
import { CheckBox } from 'react-native-elements';
import { Text, View } from '../components/Themed';

// Navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
// import { RadioButton } from '../components/RadioButton';

// import { RadioButton } from 'react-native-paper';

export default function ModalScreen() {

  type authScreenProp = StackNavigationProp<RootStackParamList, 'Modal'>;

  const navigation = useNavigation<authScreenProp>();

  // Text boxes
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  // Radio button
  // const [checked, setChecked] = React.useState('first');

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

  const completeRegistration = () => {
    navigation.navigate('Root');
    Alert.alert("Registered!\n" + role + "\n" + firstName + "\n" + lastName)
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

        <Text>{firstName}</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          keyboardType='default'
        />
      </SafeAreaView>

      <View>

        <CheckBox
          title="Doctor"
          checked={isDoctor}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={roleDoctor}
        />

        <CheckBox
          title="Patient"
          checked={isPatient}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={rolePatient}
        />




        {/* <RadioButton
          value='first'
          selected={isSelected}
        />
        <RadioButton /> */}
        {/* 
        <RadioButton
          value="first"
          selected={true}
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        /> */}
        {/* <Picker>
          <Picker.Item label="Doctor" value="Doctor" />
          <Picker.Item label="Patient" value="Patient" />
        </Picker> */}

      </View>
      {/* < Button title="Complete Registration" onPress={() => navigation.navigate('Root')} /> */}

      < Button title="Submit" onPress={completeRegistration} />




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
    marginVertical: 15,
  },

  safeAreaPos: {
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 150
  }
});
