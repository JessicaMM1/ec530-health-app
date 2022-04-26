// User profile page

import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {

  const { username, password, role, firstname, lastname, DOB, assigneddoctor } = route.params

  var displayDoctor: string = ""
  var displaydob: string = ""
  if (role == "patient") {
    displayDoctor = "Assigned Doctor: " + assigneddoctor
    displaydob = "Date of Birth: " + DOB

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {firstname}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.textView}>
        <Text style={styles.text}>Username: {username}</Text>
        <Text style={styles.text}>First Name: {firstname}</Text>
        <Text style={styles.text}>Last Name: {lastname}</Text>
        <Text style={styles.text}>Role: {role}</Text>
        <Text style={styles.text}>{displaydob}</Text>
        <Text style={styles.text}>{displayDoctor}</Text>

      </View>


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
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 40
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  }
});
