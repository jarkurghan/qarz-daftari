import React from "react";
import JournalPageComponents from "../components/Journal/Journal";
import { ScrollView } from "react-native";
import AddDebtComponent from "../components/Journal/AddDebt";

function JournalScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <JournalPageComponents />
        </ScrollView>
    );
}

export default JournalScreen;
