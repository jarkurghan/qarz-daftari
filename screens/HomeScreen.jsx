import React from "react";
import HomePageComponents from "../components/Main/Home";
import { ScrollView } from "react-native";

function HomeScreen({ navigation }) {
    return (
        <ScrollView>
            <HomePageComponents navigation={navigation} />
        </ScrollView>
    );
}

export default HomeScreen;
