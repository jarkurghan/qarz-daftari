import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileStackNavigator from "./StackProfile";
import IconCalendar from "../icons/IconCalendar";
import IconAvatar from "../icons/IconAvatar";
import { getVisibleNav } from "../store/bottomnav";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function HomeDrawerNavigator() {
    const isShowBottomNav = useSelector(getVisibleNav);

    return (
        <Tab.Navigator
            initialRouteName="Kalendar"
            screenOptions={{
                tabBarStyle: isShowBottomNav ? styles.container : { display: "none" },
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
