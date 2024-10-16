import React, { useEffect } from "react";
import { getToken, setToken } from "../store/token";
import { closeAlert, getAlert } from "../store/alert";
import { useDispatch, useSelector } from "react-redux";
import LoginNavigator from "../navigators/StackSignIn";
import MainNavigator from "../navigators/DrawerMain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "./Overlay/Alert";
import { View } from "react-native";

export default function App() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);
    const token = useSelector(getToken);

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            dispatch(setToken(value));
            dispatch(closeAlert());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <React.Fragment>
            {alert.visible && <Alert />}
            {token ? <MainNavigator /> : alert.visible ? <View></View> : <LoginNavigator />}
        </React.Fragment>
    );
}
