import React, { useEffect, useState } from "react";
import { getToken, setToken } from "../store/token";
import { closeAlert, getAlert } from "../store/alert";
import { useDispatch, useSelector } from "react-redux";
import { setJournal } from "../store/journal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginNavigator from "../navigators/StackSignIn";
import MainNavigator from "../navigators/DrawerMainV2";
import Alert from "./Overlay/Alert";
import { View } from "react-native";
import axios from "axios";
import { setActiveJournal } from "../store/activeJournal";
import { hideNav } from "../store/bottomnav";

export default function App() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            if (value) {
                const res = await axios.get("http://localhost:1009/qd/v1/api/auth/access", { headers: { Authorization: `Bearer ${value}` } });
                await AsyncStorage.setItem("token", res.data.token);
                dispatch(setToken(res.data.token));
                dispatch(setActiveJournal(res.data.journals[0]));
                if (res.data.journals.length < 2) dispatch(hideNav());
                dispatch(setJournal(res.data.journals));
            } else {
                const res = await axios.post("http://localhost:1009/qd/v1/api/auth/create-account", {});
                await AsyncStorage.setItem("token", res.data.token);
                dispatch(setToken(res.data.token));
                dispatch(setActiveJournal(res.data.journals[0]));
                if (res.data.journals.length < 2) dispatch(hideNav());
                dispatch(setJournal(res.data.journals));
            }
            setLoading(false);
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
            {!loading && <MainNavigator />}
        </React.Fragment>
    );
}
