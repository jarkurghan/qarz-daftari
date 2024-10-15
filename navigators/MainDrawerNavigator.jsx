import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; // Stack Navigator
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalendarScreen from "../screens/CalendarScreen";
import LogoutScreen from "../screens/LogoutScreen";
import SearchScreen from "../screens/SearchScreen"; // Search sahifasi
import IconCalendar from "../icons/IconCalendar";
import IconAvatar from "../icons/IconAvatar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Stack Navigator yaratish

function HomeDrawerNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Kalendar"
            screenOptions={({ navigation }) => ({
                tabBarStyle: styles.container,
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                headerTintColor: "#ffffff",
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <IconAvatar fill="#ffffff" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                ),
            })}
        >
            <Tab.Screen
                name="Kalendar"
                component={CalendarScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <IconCalendar fill={focused ? "#339eff" : "#a9a9a9"} />
                            <Text style={{ color: focused ? "#339eff" : "#000" }}>Kalendar</Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={LogoutScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <IconAvatar fill={focused ? "#339eff" : "#a9a9a9"} />
                            <Text style={{ color: focused ? "#339eff" : "#000" }}>Profile</Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// Stack Navigatorni o'rnatish
function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeTabs" component={HomeDrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} />
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

export default AppNavigator;
