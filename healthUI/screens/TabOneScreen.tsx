// User profile page

import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View>
        <Text style={styles.text}>Name Placeholder</Text>
        <Text style={styles.text}>Role placeholder</Text>
        <Text style={styles.text}>DOB placeholder</Text>
        {/* <Text>{f_name}</Text>
        <Text>{l_name}</Text>
        <Text>{role}</Text>
        <Text>{dob}</Text> */}
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
    fontSize: 20,
    marginVertical: 5
  }
});
