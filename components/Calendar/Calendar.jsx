import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function CalendarComponents() {
    return (
        <View style={styles.container}>
            <Text>Calendar page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
    },
});
