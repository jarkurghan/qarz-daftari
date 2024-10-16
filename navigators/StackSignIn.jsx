import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

const MainStack = createNativeStackNavigator();

function LoginStackNavigator() {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="login" component={LoginScreen} />
        </MainStack.Navigator>
    );
}

export default LoginStackNavigator;
