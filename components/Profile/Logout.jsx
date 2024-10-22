import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/token";

export default function LogoutComponents({ navigation }) {
    const dispatch = useDispatch();

    const logout = async () => {
        console.log(1);

        await AsyncStorage.clear();
        dispatch(setToken(null));
        // () => navigation.navigate("Login")
        console.log(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Akkountdan chiqmoqchimisiz?</Text>
            <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Chiqish</Text>
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
    text: {
        fontSize: 18,
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
