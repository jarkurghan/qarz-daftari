import React from "react";
import SignUpComponents from "../components/Login/SignUpV2";
import { ScrollView } from "react-native";

function SignUpScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <SignUpComponents navigation={navigation} />
        </ScrollView>
    );
}

export default SignUpScreen;
