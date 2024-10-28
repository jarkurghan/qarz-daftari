import React, { useEffect, useState } from "react";
import { setToken } from "../store/token";
import { closeAlert, getAlert, openSpinner, openWarning } from "../store/alert";
import { useDispatch, useSelector } from "react-redux";
import { setJournal } from "../store/journal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigator from "../navigators/DrawerMain";
import Alert from "./Overlay/Alert";
import axios from "axios";
import { setActiveJournal } from "../store/activeJournal";
import { hideNav } from "../store/bottomnav";
import { setIsAuthenticatedUser } from "../store/isAuthenticatedUser";
import getValidators from "../services/getValidations";

export default function App() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);
    const [loading, setLoading] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            if (value) {
                const res = await axios.get("http://192.168.1.2:1009/qd/v1/api/auth/access", { headers: { Authorization: `Bearer ${value}` } });
                await AsyncStorage.setItem("token", res.data.token);
                dispatch(setToken(res.data.token));
                dispatch(setIsAuthenticatedUser(res.data.authenticatedUser));
                dispatch(setActiveJournal(res.data.journals[0]));
                if (res.data.journals.length < 2) dispatch(hideNav());
                dispatch(setJournal(res.data.journals));
                await getValidators(res.data.journals, res.data.token, dispatch);
            } else {
                const res = await axios.post("http://192.168.1.2:1009/qd/v1/api/auth/create-account", {});
                await AsyncStorage.setItem("token", res.data.token);
                dispatch(setToken(res.data.token));
                dispatch(setActiveJournal(res.data.journals[0]));
                if (res.data.journals.length < 2) dispatch(hideNav());
                dispatch(setJournal(res.data.journals));
                await getValidators(res.data.journals, res.data.token, dispatch);
            }
            setLoading(false);
            dispatch(closeAlert());
        } catch (error) {
            if (error.status === 499) {
                const text = "6 oy mobaynida app faol bo'lmagani uchun ba'zi ma'lumotlar tozalanadi!";
                dispatch(openWarning({ text }));
                setIsTokenExpired(true);
            } else {
                // to-do: bu yerda xato holati yoziladi
                //        hozir (masalan) API ishlamasa spinner to'xtamay qolyapti
                console.log(error);
            }
        }
    };

    // #fef8ba #ffdd01
    // #e5f8dc #6cc436
    // #cccccc #000000
    // #ffe6e9 #e64448
    useEffect(() => {
        checkToken();
    }, []);

    const logout = async () => {
        setIsTokenExpired(false);
        dispatch(openSpinner());
        await AsyncStorage.clear();
        await checkToken();
    };

    useEffect(() => {
        if (alert.visible === false && isTokenExpired) logout();
    }, [alert]);

    return (
        <React.Fragment>
            {alert.visible && <Alert />}
            {!loading && <MainNavigator />}
        </React.Fragment>
    );
}
