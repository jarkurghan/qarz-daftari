import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { openWarning } from "../../store/alert";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/token";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomePageRoomsComponents() {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const [status, setStatus] = useState({ all: 0, available: 0, busy: 0, dirty: 0, "cleaning in progress": 0, "in maintains": 0, "cleaning complete": 0 });
    const getRoomStatus = async () => {
        await axios
            .get(`http://142.93.128.235:7834/api/hdp/mob/room/status/stats`, { headers: { Authorization: token } })
            .then(async (res) => {
                setStatus(res.data.data);
            })
            .catch((err) => {
                const text = "Something went wrong!";
                dispatch(openWarning({ text }));
            });
    };

    useEffect(() => {
        getRoomStatus();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.boxTitle}>Xonalar</Text>
                </View>
                <View style={styles.boxContent}>
                    <View style={styles.rooms}>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#00000022", borderColor: "#00000026" }}>
                            <Text style={styles.roomStatusName}>Mavjud</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#00000042" }}>{status.available}</Text>
                        </View>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#43a04733", borderColor: "#43a04755" }}>
                            <Text style={styles.roomStatusName}>Band</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#43a047" }}>{status.busy}</Text>
                        </View>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#75757575", borderColor: "#75757585" }}>
                            <Text style={styles.roomStatusName}>Iflos</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#757575" }}>{status.dirty}</Text>
                        </View>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#fdd83544", borderColor: "#fdd83566" }}>
                            <Text style={styles.roomStatusName}>Tozalash davom etmoqda</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#fdd835" }}>{status["cleaning in progress"]}</Text>
                        </View>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#9ccc6544", borderColor: "#9ccc6566" }}>
                            <Text style={styles.roomStatusName}>Tozalash tugallandi</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#9ccc65" }}>{status["cleaning complete"]}</Text>
                        </View>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#1e9cef33", borderColor: "#1e9cef66" }}>
                            <Text style={styles.roomStatusName}>Xizmatga yaroqsiz</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#1e9cef" }}>{status["in maintains"]}</Text>
                        </View>
                        <View style={{ ...styles.roomStatus, backgroundColor: "#e7700d44", borderColor: "#e7700d66" }}>
                            <Text style={styles.roomStatusName}>Barcha xonalar</Text>
                            <Text style={{ ...styles.roomStatusCount, backgroundColor: "#e7700d" }}>{status.all}</Text>
                        </View>
                    </View>
                    <View style={styles.stats}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        gap: 16,
    },
    box: {
        height: "auto",
        backgroundColor: "white",
        borderRadius: 5,
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
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
        paddingLeft: 4,
    },
    rooms: {
        paddingVertical: 6,
        gap: 5,
        width: "100%",
    },
    roomStatus: {
        borderWidth: 1,
        borderRadius: 4,
        // padding: 4,
        paddingVertical: 3,
        paddingHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    roomStatusName: {
        textTransform: "uppercase",
        fontWeight: "500",
        fontSize: 13,
        color: "#555",
    },
    roomStatusCount: {
        color: "white",
        padding: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
});
