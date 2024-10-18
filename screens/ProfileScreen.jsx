import React, { useEffect } from "react";
import LogoutComponents from "../components/Profile/Logout";
import LoginComponents from "../components/Profile/Login";
import { useDispatch, useSelector } from "react-redux";
import { getToken, setToken } from "../store/token";

function ProfileScreen({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector(getToken);

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            dispatch(setToken(value));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return token === null ? <LoginComponents navigation={navigation} /> : <LogoutComponents navigation={navigation} />;
}

export default ProfileScreen;
