import React from "react";
import JournalPageComponents from "../components/Journal/Journal";
import { ScrollView } from "react-native";
import AddDebtComponent from "../components/Journal/AddDebt";

function JournalScreen({ navigation }) {
    return (
        <ScrollView>
            <JournalPageComponents />
            <AddDebtComponent navigation={navigation} />
        </ScrollView>
    );
}

export default JournalScreen;
