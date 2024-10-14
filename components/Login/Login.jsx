import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { closeAlert, getAlert, openSpinner, openWarning } from "../../store/alert";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View } from "react-native";
import { setToken } from "../../store/token";
import axios from "axios";

export default function LoginForm() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);
    const [click, setClick] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async () => {
        dispatch(openSpinner());
        await axios
            .post(`http://142.93.128.235:7834/api/hdp/mob/login`, { login, password })
            .then(async (res) => {
                await AsyncStorage.setItem("token", res?.data?.data);
                dispatch(setToken(res?.data?.data));
                dispatch(closeAlert());
            })
            .catch((err) => {
                const text = "Login filled!";
                dispatch(openWarning({ text }));
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    value={login}
                    onChangeText={setLogin}
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable={!alert.spinner}
                    // selectTextOnFocus={!submitting.spinner}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PASSWORD"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable={!alert.spinner}
                    // selectTextOnFocus={!submitting.spinner}
                />
            </View>

            <View style={styles.rememberView}>
                {/* <View style={styles.switch}>
                    <Switch value={click} onValueChange={setClick} trackColor={{ true: "green", false: "gray" }} disabled={submitting.spinner} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View> */}
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={onSubmit} disabled={alert.spinner}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 140,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: "rgb(25, 118, 210)",
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5,
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "rgb(25, 118, 210)",
        borderWidth: 1,
        borderRadius: 7,
    },
    rememberView: {
        width: "100%",
        paddingHorizontal: 40,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 28,
        // marginTop: 20,
    },
    switch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    rememberText: {
        fontSize: 13,
    },
    button: {
        backgroundColor: "rgb(25, 118, 210)",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 40,
    },
});