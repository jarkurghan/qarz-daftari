import React from "react";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function AddDebtComponent({ navigation }) {
    const gotoAddDebtPage = () => {
        navigation.navigate("AddDebt");
    };
    return (
        <Pressable style={styles.container} onPress={gotoAddDebtPage}>
            <Text style={styles.plus}>+</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "rgb(51, 158, 255)",
        color: "#ffffff",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        borderWidth: 0,
        padding: 0,
    },
    plus: {
        fontSize: 32,
        color: "white",
        // backgroundColor:"red",
        justifyContent: "center",
        alignItems: "center",
    },
});
