import React from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { closeAlert, getAlert } from "../../store/alert";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

const AlertModal = () => {
    const dispatch = useDispatch();
    const alert = useSelector(getAlert);

    const close = () => {
        if (alert.close) dispatch(closeAlert());
    };

    return (
        <Overlay onBackdropPress={close}>
            {alert.spinner && <ActivityIndicator size={120} color={"rgb(25, 118, 210)"} />}
            {alert.text && (
                <View style={styles.overlay}>
                    <Text style={styles.text}>{alert.text}</Text>
                    <View style={styles.buttonView}>
                        {alert.close && (
                            <Pressable style={styles.button} onPress={close}>
                                <Text style={styles.buttonText}>Ok</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            )}
        </Overlay>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    overlay: {
        alignItems: "center",
        gap: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        minWidth: 240,
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
        width: 80,
    },
});
export default AlertModal;
