import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const MainStack = createNativeStackNavigator();

function LoginStackNavigator() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="login" options={{ headerShown: false }} component={LoginScreen} />
            <MainStack.Screen name="signup" options={{ title: "Ro'yxatdan o'tish" }} component={SignUpScreen} />
        </MainStack.Navigator>
    );
}

export default LoginStackNavigator;
