import * as React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import LogoutScreen from "../screens/LogoutScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={LogoutScreen}
                options={({ navigation }) => ({
                    headerTitle: "Profil",
                    headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                    headerTintColor: "#ffffff",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ marginRight: 15 }}>
                            <IconAntDesign name="setting" size={20} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Settings"
                component={SearchScreen}
                options={{
                    headerTitle: "Sozlamalar",
                    headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                    headerTintColor: "#ffffff",
                }}
            />
        </Stack.Navigator>
    );
}

export default ProfileStackNavigator;
