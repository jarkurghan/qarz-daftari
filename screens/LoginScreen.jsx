import React from "react";
import LoginComponents from "../components/Login/Login";
import { ScrollView } from "react-native";

function LoginScreen({ navigation }) {
    return <ScrollView contentContainerStyle={{ flex: 1 }}>
        <LoginComponents navigation={navigation} />
    </ScrollView>;
}

export default LoginScreen;
