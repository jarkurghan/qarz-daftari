import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalendarScreen from "../screens/CalendarScreen";
import LogoutScreen from "../screens/LogoutScreen";
import SearchScreen from "../screens/SearchScreen";
import IconCalendar from "../icons/IconCalendar";
import IconAvatar from "../icons/IconAvatar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={LogoutScreen}
                options={({ navigation }) => ({
                    headerTitle: "Profile",
                    headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                    headerTintColor: "#ffffff",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                            <IconAvatar fill="#ffff00" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    );
}

function HomeDrawerNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Kalendar"
            screenOptions={{
                tabBarStyle: styles.container,
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                headerTintColor: "#ffffff",
            }}
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
                component={ProfileStackNavigator}
                options={{
                    headerShown: false,
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

export default HomeDrawerNavigator;
