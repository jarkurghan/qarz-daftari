import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function CreateDebtPage() {
    return (
        <View style={styles.container}>
            <Text>Create page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
    },
});
