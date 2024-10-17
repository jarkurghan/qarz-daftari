import React from "react";
import SignUpComponents from "../components/Login/SignUp";
import { ScrollView } from "react-native";

function SignUpScreen({ navigation }) {
    return (
        <ScrollView>
            <SignUpComponents navigation={navigation} />
        </ScrollView>
    );
}

export default SignUpScreen;
