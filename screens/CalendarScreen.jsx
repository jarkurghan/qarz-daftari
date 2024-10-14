import React from "react";
import CalendarPageComponents from "../components/Calendar/Calendar";
import { ScrollView } from "react-native";

function CalendarScreen() {
    return (
        <ScrollView>
            <CalendarPageComponents />
        </ScrollView>
    );
}

export default CalendarScreen;
