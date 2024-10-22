import React from "react";
import LogoutComponents from "../components/Profile/Logout";
import LoginComponents from "../components/Profile/Login";
import { getIsAuthenticatedUser } from "../store/isAuthenticatedUser";
import { useSelector } from "react-redux";

function ProfileScreen({ navigation }) {
    const isAuthenticatedUser = useSelector(getIsAuthenticatedUser);

    return isAuthenticatedUser ? <LogoutComponents navigation={navigation} /> : <LoginComponents navigation={navigation} />;
}

export default ProfileScreen;
