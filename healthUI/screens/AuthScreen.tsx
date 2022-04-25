import React from 'react';
import { View, Text, Button, Platform, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native';
// import { RootStackParamList } from '../RootStackParams';

type authScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;

function AuthScreen() {
    const navigation = useNavigation<authScreenProp>();

    //const UselessTextInput = () => {
    const [textAcc, onChangeAcc] = React.useState("");
    const [textPw, onChangePw] = React.useState("");

    const login = () => {
        fetch('https://example.com/data').then((response) => response.json()).then((json) => {
            return data.names;
        }).catch((error) => {
            console.error(error);
        });
    }

    const test_login = () => {
        Alert.alert(textAcc + "\n" + textPw)
    }

    return (
        <View style={styles.container}>
            <View style={styles.titlePosition}>
                <Text style={styles.title}>Log in</Text>


                <SafeAreaView style={styles.safeAreaPos}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeAcc}
                        value={textAcc}
                        placeholder="Username"
                        keyboardType="default"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePw}
                        value={textPw}
                        placeholder="Password"
                        keyboardType="default"
                    />
                </SafeAreaView>

                <TouchableOpacity style={styles.loginbutton} onPress={test_login}>

                    <Text style={styles.loginText}>LOGIN</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.regbutton} onPress={() => navigation.navigate('Modal')}>

                    <Text style={styles.regText}>REGISTER</Text>

                </TouchableOpacity>

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
        fontSize: 20,
        fontWeight: 'bold',
    },
    titlePosition: {
        alignItems: 'center',
        marginTop: 80,
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
        borderRadius: 10,
        width: 150
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
export default AuthScreen;