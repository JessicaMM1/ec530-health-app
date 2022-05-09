import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TextInput,
    TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

// Navigation
type authScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;

function AuthScreen() {

    globalThis.username = "";
    const navigation = useNavigation<authScreenProp>();

    const [textAcc, onChangeAcc] = React.useState("");
    const [textPw, onChangePw] = React.useState("");

    // const login = () => {
    //     fetch('https://example.com/data').then((response) => response.json()).then((json) => {

    //         return data.names;
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }

    const login = () => {
        //fetch('https://example.com/data').then((response) => response.json()).then((json) => {
        fetch('https://health-app-2022.ue.r.appspot.com/check-user').then((response) => {

            // Returns Promise
            return response.json()

        }).then((data) => {
            var uprofile
            var darr = Object.values(data);
            for (const elem of darr) {
                console.log("NEW ELEM")
                console.log(elem)

                if (elem["username"] == textAcc && elem["password"] == textPw) {
                    console.log("Found user")
                    console.log(elem)
                    uprofile = elem
                    return uprofile
                }
            }
            // var collection = data[0]
            // console.log(collection["basicInfo"]["first_name"])
        }).then((userprofile) => {
            if (userprofile == null) {
                Alert.alert("Incorrect username or password")
            } else {
                //console.log(userprofile["basicInfo"]["first_name"])
                //console.log(typeof userprofile["basicInfo"]["first_name"])
                globalThis.username = userprofile["username"]

                navigation.navigate('Root', {
                    screen: 'TabOne',
                    params: {
                        username: userprofile["username"],
                        password: userprofile["password"],
                        role: userprofile["role"],
                        firstname: userprofile["basicInfo"]["first_name"],
                        lastname: userprofile["basicInfo"]["last_name"],
                        DOB: userprofile["attributes"]["DOB"],
                        assigneddoctor: userprofile["attributes"]["assigned_doctor"],
                    },
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize='none'
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePw}
                            value={textPw}
                            placeholder="Password"
                            keyboardType="default"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            autoCorrect={false}
                        />
                    </SafeAreaView>

                    <TouchableOpacity style={styles.loginbutton} onPress={login}>

                        <Text style={styles.loginText}>LOGIN</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.regbutton} onPress={() => navigation.navigate('Modal')}>

                        <Text style={styles.regText}>REGISTER</Text>

                    </TouchableOpacity>

                </View>
            </View>
        </TouchableWithoutFeedback>
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
        alignSelf: 'center',
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
        alignSelf: 'center',
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