import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginComponents({ navigation }) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    button: {
        backgroundColor: "rgb(25, 118, 210)",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
