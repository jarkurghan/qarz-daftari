import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { closeAlert, getAlert, openSpinner, openWarning } from "../../store/alert";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View } from "react-native";
import axios from "axios";

export default function SignUpForm() {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);
    const [step, setStep] = useState(1);

    // State values for all form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission at step 3
    const onSubmit = async () => {
        dispatch(openSpinner());
        await axios
            .post(`http://142.93.128.235:7834/api/hdp/mob/signup`, { firstName, lastName, email, phone, login, password })
            .then(async (res) => {
                await AsyncStorage.setItem("qddev-token", res?.data?.data);
                dispatch(closeAlert());
            })
            .catch((err) => {
                const text = "Sign-Up failed!";
                dispatch(openWarning({ text }));
            });
    };

    // Rendering the appropriate step form
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} editable={!alert.spinner} />
                        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} editable={!alert.spinner} />
                    </>
                );
            case 2:
                return (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCorrect={false}
                            autoCapitalize="none"
                            editable={!alert.spinner}
                        />
                        {/* <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} editable={!alert.spinner} /> */}
                    </>
                );
            case 3:
                return (
                    <>
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
                    </>
                );
        }
    };

    // Step indicator circles with numbers
    const renderStepIndicators = () => {
        return (
            <View style={styles.stepIndicator}>
                <View style={[styles.circle, step >= 1 && styles.activeCircle]}>
                    <Text style={step >= 1 ? styles.activeCircleText : styles.circleText}>1</Text>
                </View>
                <View style={styles.line} />
                <View style={[styles.circle, step >= 2 && styles.activeCircle]}>
                    <Text style={step >= 2 ? styles.activeCircleText : styles.circleText}>2</Text>
                </View>
                <View style={styles.line} />
                <View style={[styles.circle, step >= 3 && styles.activeCircle]}>
                    <Text style={step >= 3 ? styles.activeCircleText : styles.circleText}>3</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            {/* Step indicators at the top */}
            {renderStepIndicators()}

            <View style={styles.inputView}>{renderStep()}</View>

            <View style={styles.buttonView}>
                {/* {step > 1 && (
                    <Pressable style={styles.navButton} onPress={() => setStep(step - 1)}>
                        <Text style={styles.buttonText}>BACK</Text>
                    </Pressable>
                )} */}
                {step < 3 ? (
                    <Pressable style={styles.submitButton} onPress={() => setStep(step + 1)}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.submitButton} onPress={onSubmit} disabled={alert.spinner}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
        // alignItems: "center",
        // paddingTop: 140,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        // paddingVertical: 40,
        color: "rgb(25, 118, 210)",
    },
    stepIndicator: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
    },
    activeCircle: {
        backgroundColor: "rgb(25, 118, 210)",
    },
    circleText: {
        color: "#777",
        fontSize: 14,
    },
    activeCircleText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    line: {
        width: 30,
        height: 2,
        backgroundColor: "#e0e0e0",
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
    buttonView: {
        width: "100%",
        paddingHorizontal: 40,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    navButton: {
        backgroundColor: "gray",
        height: 45,
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: "rgb(25, 118, 210)",
        height: 45,
        width: "100%",
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
