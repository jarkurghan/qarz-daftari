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
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import CreateDebtScreen from "../screens/CreateDebtScreen";
const Tab = createBottomTabNavigator();

function HomeDrawerNavigator() {
    const dispatch = useDispatch();
    const isShowBottomNav = useSelector(getVisibleNav);
    const journals = useSelector(getJournal);
    const active = useSelector(getActiveJournal);
    const initialRoute = "journal-" + active.name;
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                tabBarStyle: isShowBottomNav ? styles.bottomNav : { display: "none" },
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
                headerTintColor: "#ffffff",
                headerRight: () => (
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate("AddDebt")}>
                            <IconAntDesign name="pluscircleo" size={25} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <IconFontAwesome5 name="user-circle" size={25} color="#e5f8dc" />
                        </TouchableOpacity>
                    </View>
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
                component={CreateDebtScreen}
                options={{
                    tabBarButton: () => null,
                    headerShown: true,
                    tabBarVisible: false,
                    headerRight: () => null,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("journal-" + active.name)} style={{ paddingLeft: 10 }}>
                            <IconIonicons name="arrow-back" size={25} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
            />
            {journals.map((journal) => (
                <Tab.Screen
                    key={journal.name}
                    name={"journal-" + journal.name}
                    component={JournalScreen}
                    options={() => {
                        dispatch(setActiveJournal(journal));
                        return {
                            title: journal.name,
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <IconFontAwesome5 name="clipboard-list" size={25} color="white" />
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
    bottomNav: {
        position: "absolute",
        borderRadius: 10,
        left: 4,
        right: 4,
        bottom: 6,
        boxShadow: "1px 3px 20px -1px rgba(0,0,0,0.6)",
    },
    headerIcons: {
        paddingRight: 10,
        gap: 15,
        flexDirection: "row",
    },
});

export default HomeDrawerNavigator;
