import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ShiftScreen from "../screens/ShiftScreen";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                tabBarStyle: styles.container,
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                headerTintColor: "#ffffff",
            }}
        >
            <Stack.Screen name="Bosh sahifa" component={HomeScreen} options={{ title: "Bosh sahifa" }} />
            <Stack.Screen name="Inner" component={ShiftScreen} options={{ title: "Time clock" }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        borderRadius: 10,
        left: 4,
        right: 4,
        bottom: 6,
        boxShadow: "1px 3px 20px -1px rgba(0,0,0,0.6)",
    },
});

export default HomeStackNavigator;
