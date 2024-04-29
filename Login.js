import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import supertokens from "supertokens-react-native";
import axios from "axios";
supertokens.addAxiosInterceptors(axios);
import { API_DOMAIN } from "./App";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const signIn = async () => {
        setEmailError("");
        setPasswordError("");
        const config = {
            method: 'post',
            url: API_DOMAIN + '/auth/signin',
            headers: {
                'rid': 'emailpassword',
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: {
                formFields: [
                    { id: 'email', value: email },
                    { id: 'password', value: password }
                ]
            }
        };

        axios(config)
            .then(function (response) {
                let data = response.data;
                if (data.status === "FIELD_ERROR") {
                    for (let i = 0; i < data.formFields.length; i++) {
                        let field = data.formFields[i];
                        if (field.id === "email") {
                            setEmailError(field.error);
                        }
                        if (field.id === "password") {
                            setPasswordError(field.error);
                        }
                    }
                } else if (data.status === "WRONG_CREDENTIALS_ERROR") {
                    setPasswordError("Wrong credentials");
                } else if (data.status === "SIGN_IN_NOT_ALLOWED") {
                    Alert.alert("Error", "Oops! Sign in denied! Please try again later or contact support.");
                }
                // successful sign in! 
            })
            .catch(function () {
                Alert.alert("Error", "Oops! Something went wrong!");
            });
    }

    const signUp = async () => {
        setEmailError("");
        setPasswordError("");
        const config = {
            method: 'post',
            url: API_DOMAIN + '/auth/signup',
            headers: {
                'rid': 'emailpassword',
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: {
                formFields: [
                    { id: 'email', value: email },
                    { id: 'password', value: password }
                ]
            }
        };

        axios(config)
            .then(function (response) {
                let data = response.data;
                if (data.status === "FIELD_ERROR") {
                    for (let i = 0; i < data.formFields.length; i++) {
                        let field = data.formFields[i];
                        if (field.id === "email") {
                            setEmailError(field.error);
                        }
                        if (field.id === "password") {
                            setPasswordError(field.error);
                        }
                    }
                } else if (data.status === "SIGN_UP_NOT_ALLOWED") {
                    Alert.alert("Error", "Oops! Sign up denied! Please try again later or contact support.");
                }
                // successful sign up! 
            })
            .catch(function () {
                Alert.alert("Error", "Oops! Something went wrong!");
            });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    value={email}
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            {emailError !== "" ? <Text style={styles.validationError}>{emailError}</Text> : null}
            <View style={styles.inputView}>
                <TextInput
                    value={password}
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            {passwordError !== "" ? <Text style={styles.validationError}>{passwordError}</Text> : null}
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={signIn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={signUp}>
                <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    validationError: {
        color: "red",
        marginTop: "-10px"
    },
    inputView: {
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "black",
        borderWidth: "1px",
        width: "70%",
        height: 45,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
    forgot_button: {
        marginTop: 20,
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "blue",
    },
    loginText: {
        color: "white"
    }
});