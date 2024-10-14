import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomScreen from '../screens/RoomsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LogoutScreen from '../screens/LogoutScreen';
import { View, Text, StyleSheet } from 'react-native';
import IconHome from '../icons/IconHome';
import IconCalendar from '../icons/IconCalendar';
import IconDoor from '../icons/IconBedroom';
import IconAvatar from '../icons/IconAvatar';
import HomeStackNavigator from './HomeStackNavigator';
import ReportScreen from './ReportTabNavigator';

const Tab = createBottomTabNavigator();

function HomeDrawerNavigator() {
    return (
        <Tab.Navigator initialRouteName="Bosh sahifa" screenOptions={{
            tabBarStyle: styles.container,
            tabBarShowLabel: false,
            headerStyle: { backgroundColor: "rgb(51, 158, 255)" },
            headerTintColor: "#ffffff"
        }}>
            <Tab.Screen name="Bosh sahifa" component={HomeStackNavigator} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <IconHome fill={focused ? "#339eff" : "#a9a9a9"} />
                        <Text style={{ color: focused ? "#339eff" : "#000" }}>Asosiy</Text>
                    </View>
                )
            }} />

             <Tab.Screen name="Xonalar" component={RoomScreen} options={{
                 tabBarIcon: ({ focused }) => (
                     <View style={{ alignItems: "center", justifyContent: "center" }}>
                         <IconDoor fill={focused ? "#339eff" : "#a9a9a9"} />
                         <Text style={{ color: focused ? "#339eff" : "#000" }}>Xonalar</Text>
                     </View>
                 )
             }} />

            <Tab.Screen name="Kalendar" component={CalendarScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <IconCalendar fill={focused ? "#339eff" : "#a9a9a9"} />
                        <Text style={{ color: focused ? "#339eff" : "#000" }}>Kalendar</Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Report" component={ReportScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <IconCalendar fill={focused ? "#339eff" : "#a9a9a9"} />
                        <Text style={{ color: focused ? "#339eff" : "#000" }}>Reports</Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Profile" component={LogoutScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <IconAvatar fill={focused ? "#339eff" : "#a9a9a9"} />
                        <Text style={{ color: focused ? "#339eff" : "#000" }}>Profile</Text>
                    </View>
                )
            }} />
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
        boxShadow: "1px 3px 20px -1px rgba(0,0,0,0.6)"
    }
});

export default HomeDrawerNavigator;
