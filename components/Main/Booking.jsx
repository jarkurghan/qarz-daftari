import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { openWarning } from "../../store/alert";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/token";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomePageBookingComponents() {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const [events, setEvents] = useState({});
    const getEvents = async () => {
        const today = new Date().toISOString().slice(0, 10);
        await axios
            .get(`http://142.93.128.235:7834/api/hdp/mob/calendar/event/stat/${today}`, { headers: { Authorization: token } })
            .then(async (res) => {
                setEvents(res.data.data);
            })
            .catch((err) => {
                const text = "Something went wrong!";
                dispatch(openWarning({ text }));
            });
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.boxTitle}>Check in</Text>
                </View>
                <View style={styles.boxContent}>
                    <View style={{ ...styles.boxIcon, backgroundColor: "#07bc0c" }}>
                        <Icon name="sign-in" size={24} color="white" />
                    </View>
                    <Text style={styles.boxCount}>{events.checkin || 0}</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View>
                    <Text style={styles.boxTitle}>Check in...</Text>
                </View>
                <View style={styles.boxContent}>
                    <View style={{ ...styles.boxIcon, backgroundColor: "#07bc0c" }}>
                        <Icon name="hourglass-half" size={20} color="white" />
                    </View>
                    <Text style={styles.boxCount}>{events.waitcheckin || 0}</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View>
                    <Text style={styles.boxTitle}>Check out</Text>
                </View>
                <View style={styles.boxContent}>
                    <View style={{ ...styles.boxIcon, backgroundColor: "#E7700D" }}>
                        <Icon name="sign-out" size={24} color="white" />
                    </View>
                    <Text style={styles.boxCount}>{events.checkout || 0}</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View>
                    <Text style={styles.boxTitle}>Check out...</Text>
                </View>
                <View style={styles.boxContent}>
                    <View style={{ ...styles.boxIcon, backgroundColor: "#E7700D" }}>
                        <Icon name="hourglass-half" size={20} color="white" />
                    </View>
                    <Text style={styles.boxCount}>{events.waitcheckout || 0}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        gap: 10,
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    box: {
        width: "40%",
        height: 100,
        backgroundColor: "white",
        borderRadius: 5,
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "space-around",
        shadowColor: "rgba(0, 0, 0, 0.14)",
        shadowRadius: 3,
    },
    boxContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
    },
    boxTitle: {
        textTransform: "uppercase",
        color: "#555",
        fontWeight: "500",
        fontSize: 16,
    },
    boxIcon: {
        // backgroundColor: "#3b5998",
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    boxCount: {
        fontSize: 24,
        color: "#3b5998",
        fontWeight: "500",
    },
});
