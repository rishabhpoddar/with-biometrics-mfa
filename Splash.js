import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SuperTokens from "supertokens-react-native";
import * as LocalAuthentication from 'expo-local-authentication'

export const SplashScreen = ({ navigation }) => {
    const checkSessionExists = async () => {
        const sessionExists = await SuperTokens.doesSessionExist();
        if (sessionExists) {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            if (compatible) {
                const biometricAuth = await LocalAuthentication.authenticateAsync();
                if (biometricAuth.success) {
                    navigation.replace("Home");
                    return;
                }
            }
            await SuperTokens.signOut();
            navigation.replace("Login");
        } else {
            navigation.replace("Login");
        }
    };

    useEffect(() => {
        checkSessionExists();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>SuperTokens Example</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
});