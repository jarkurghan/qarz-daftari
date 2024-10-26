import React from "react";
import CreateDebtPage from "../components/Debt/CreateDebt";
import { ScrollView } from "react-native";

function CreateDebtScreen() {
    return (
        <ScrollView>
            <CreateDebtPage />
        </ScrollView>
    );
}

export default CreateDebtScreen;
