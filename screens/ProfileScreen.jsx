import React from "react";
import LogoutComponents from "../components/Profile/Logout";
import LoginComponents from "../components/Profile/Login";
import { useSelector } from "react-redux";
import { getToken } from "../store/token";

function ProfileScreen({ navigation }) {
    const token = useSelector(getToken);

    return token === null ? <LoginComponents navigation={navigation} /> : <LogoutComponents navigation={navigation} />;
}

export default ProfileScreen;
