import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button, TextInput, SafeAreaView } from 'react-native';
// import { Picker } from '@react-native-picker/picker'

import { Text, View } from '../components/Themed';

// Navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
// import { RadioButton } from '../components/RadioButton';
// import { RadioButton } from 'react-native-paper';

export default function ModalScreen() {

  type authScreenProp = StackNavigationProp<RootStackParamList, 'Modal'>;

  const [firstName, onChangefn] = React.useState(null);
  const [lastName, onChangeln] = React.useState(null);
  // const [checked, setChecked] = React.useState('first');
  const navigation = useNavigation<authScreenProp>();

  return (
    <View style={styles.container}>
      <View style={styles.titlePos}>
        <Text style={styles.title}>Modal</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


      <SafeAreaView style={styles.safeAreaPos}>
        <TextInput
          style={styles.input}
          onChangefn={onChangefn}
          value={firstName}
          placeholder="First name"
          keyboardType='default'
        />

        <TextInput
          style={styles.input}
          onChangeln={onChangeln}
          value={lastName}
          placeholder="Last name"
          keyboardType='default'
        />
      </SafeAreaView>

      {/* <View> */}
      {/* <RadioButton
          value="first"
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

      {/* </View> */}
      < Button title="Complete Registration" onPress={() => navigation.navigate('Root')} />

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
