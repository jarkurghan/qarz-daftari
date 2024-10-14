import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DailyReportScreen from "../screens/DailyReportScreen";
import MonthlyReportScreen from "../screens/MonthlyReportScreen";

const Tab = createMaterialTopTabNavigator();

export default function ReportScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="DailyReport" component={DailyReportScreen} options={{ tabBarLabel: "Kunlik" }} />
            <Tab.Screen name="MonthlyReport" component={MonthlyReportScreen} options={{ tabBarLabel: "Oylik" }} />
        </Tab.Navigator>
    );
}
