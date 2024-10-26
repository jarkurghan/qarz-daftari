import * as React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { hideNav, showNav } from "../store/bottomnav";
import { useDispatch } from "react-redux";

const Stack = createStackNavigator();

function JournalStackNavigator() {
    // to-do: endi qilinadi
    const dispatch = useDispatch();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => {
                    if (journals.length > 1) dispatch(showNav());
                    return {
                        headerTitle: "Profil",
                        headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                        headerTintColor: "#ffffff",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ marginRight: 15 }}>
                                <IconAntDesign name="setting" size={20} color="white" />
                            </TouchableOpacity>
                        ),
                    };
                }}
            />
            <Stack.Screen
                name="Settings"
                component={SearchScreen}
                options={() => {
                    if (journals.length > 1) dispatch(showNav());
                    return {
                        headerTitle: "Sozlamalar",
                        headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                        headerTintColor: "#ffffff",
                    };
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={() => {
                    dispatch(hideNav());
                    return {
                        headerTitle: "Login",
                        headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                        headerTintColor: "#ffffff",
                    };
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={() => {
                    dispatch(hideNav());
                    return {
                        headerTitle: "Ro'yxatdan o'tish",
                        headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                        headerTintColor: "#ffffff",
                    };
                }}
            />
        </Stack.Navigator>
    );
}

export default JournalStackNavigator;
