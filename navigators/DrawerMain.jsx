import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import JournalScreen from "../screens/JournalScreen";
import ProfileStackNavigator from "./StackProfile";
import { getVisibleNav } from "../store/bottomnav";
import { useDispatch, useSelector } from "react-redux";
import { getJournal } from "../store/journal";
import { useNavigation } from "@react-navigation/native";
import { getActiveJournal, setActiveJournal } from "../store/activeJournal";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
const Tab = createBottomTabNavigator();

function HomeDrawerNavigator() {
    const dispatch = useDispatch();
    const isShowBottomNav = useSelector(getVisibleNav);
    const journals = useSelector(getJournal);
    const active = useSelector(getActiveJournal);
    const initialRoute = active.name;
    const navigation = useNavigation();

    React.useEffect(() => {
        console.log(initialRoute);
    }, [initialRoute]);

    return (
        <Tab.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                tabBarStyle: isShowBottomNav ? styles.container : { display: "none" },
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                headerTintColor: "#ffffff",
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ paddingRight: 10 }}>
                        <IconFontAwesome5 name="user-circle" size={24} color="white" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarButton: () => null,
                    headerShown: false,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="AddDebt"
                component={JournalScreen}
                options={{
                    tabBarButton: () => null,
                    headerShown: false,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="JournalSettings"
                component={ProfileStackNavigator}
                options={{
                    tabBarButton: () => null,
                    headerShown: false,
                    tabBarVisible: false,
                }}
            />
            {journals.map((journal) => (
                <Tab.Screen
                    key={journal.name}
                    name={journal.name}
                    component={JournalScreen}
                    options={() => {
                        dispatch(setActiveJournal(journal));
                        return {
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <IconFontAwesome5 name="clipboard-list" size={24} color="white" />
                                    <Text style={{ color: focused ? "#339eff" : "#000" }}>{journal.name}</Text>
                                </View>
                            ),
                        };
                    }}
                />
            ))}
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
