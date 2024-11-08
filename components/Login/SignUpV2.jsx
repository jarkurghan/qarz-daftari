import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { closeAlert, getAlert, openSpinner, openWarning } from "../../store/alert";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View } from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUpForm() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);

    // State values for all form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Handle form submission
    const onSubmit = async () => {
        dispatch(openSpinner());
        await axios
            .post(`http://142.93.128.235:7834/api/hdp/mob/signup`, { firstName, lastName, email, phone, login, password, businessName, birthDate })
            .then(async (res) => {
                await AsyncStorage.setItem("qddev-token", res?.data?.data);
                dispatch(closeAlert());
            })
            .catch((err) => {
                const text = "Sign-Up failed!";
                dispatch(openWarning({ text }));
            });
    };

    // Handle Date Change
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} editable={!alert.spinner} />
                <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} editable={!alert.spinner} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable={!alert.spinner}
                />
                <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} editable={!alert.spinner} />
                <TextInput style={styles.input} placeholder="Business Name" value={businessName} onChangeText={setBusinessName} editable={!alert.spinner} />
                <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                    <Text>{birthDate ? birthDate.toDateString() : "Select Birth Date"}</Text>
                </Pressable>
                {showDatePicker && <DateTimePicker value={birthDate} mode="date" display="default" onChange={onDateChange} />}
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    value={login}
                    onChangeText={setLogin}
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable={!alert.spinner}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable={!alert.spinner}
                />
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.submitButton} onPress={onSubmit} disabled={alert.spinner}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
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
    dateInput: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "rgb(25, 118, 210)",
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: "center",
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 40,
        justifyContent: "center",
    },
    submitButton: {
        backgroundColor: "rgb(25, 118, 210)",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
