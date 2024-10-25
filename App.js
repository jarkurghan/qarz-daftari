import axios from "axios";
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AppComponent from "./components";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import RNRestart from "react-native-restart";
import { Alert } from "react-native";

axios.interceptors.request.use((config) => {
    if (!config.headers["client-id"]) {
        config.headers["client-id"] = "36f7274bb5f75fcd4b37037ab1b4e36024292cfc4b68babc596e57bc803f6a4c";
    }
    if (!config.headers["client-secret"]) {
        config.headers["client-secret"] = "7MV-Qr}W5,YR<5&&4^nA/U8'?Blh<b`l&?C,BTo({(-9vI-}_dezJczH9&N?4fc;";
    }
    return config;
});

export default function App() {
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!state.isConnected) Alert.alert("No Internet!", "Please reconnect!", [{ text: "Reload App", onPress: () => RNRestart.restart() }]);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <NavigationContainer>
            <Provider store={store}>
                <AppComponent />
                <StatusBar style="auto" />
            </Provider>
        </NavigationContainer>
    );
}
