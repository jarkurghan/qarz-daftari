import React from "react";
import CreateDebtPage from "../components/Debt/CreateDebt";
import { ScrollView } from "react-native";

function CreateDebtScreen({ navigation }) {
    return (
        <ScrollView>
            <CreateDebtPage navigation={navigation} />
        </ScrollView>
    );
}

export default CreateDebtScreen;
