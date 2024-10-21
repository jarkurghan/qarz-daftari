import React, { useEffect } from "react";
import { getToken, setToken } from "../store/token";
import { closeAlert, getAlert } from "../store/alert";
import { useDispatch, useSelector } from "react-redux";
import LoginNavigator from "../navigators/StackSignIn";
import MainNavigator from "../navigators/DrawerMain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "./Overlay/Alert";
import { View } from "react-native";
import axios from "axios";

export default function App() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);
    const token = useSelector(getToken);

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            if (value) {
                const res = await axios.get("http://localhost:1009/qd/v1/api/auth/access", { headers: { Authorization: `Bearer ${value}` } });
                await AsyncStorage.setItem("token", res.data.token);
                console.log(res);
            } else {
                const res = await axios.post("http://localhost:1009/qd/v1/api/auth/create-account", {});
                await AsyncStorage.setItem("token", res.data.token);
                console.log(res);
            }
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
            <MainNavigator />
        </React.Fragment>
    );
}
