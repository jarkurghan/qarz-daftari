import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Booking from "./Booking";
import Rooms from "./Rooms";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/token";
import { setLastGetting, setTimeClock } from "../../store/timeClock";
import axios from "axios";

export default function HomePageComponents({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const getShifts = async () => {
        await axios
            .get(`http://142.93.128.235:7834/api/hdp/mob/shift/status`, { headers: { Authorization: token } })
            .then(async (res) => {
                dispatch(setLastGetting());
                dispatch(setTimeClock(res?.data?.data));
            })
            .catch((err) => {
                console.log(err);
                const text = "Something went wrong!";
                dispatch(openWarning({ text }));
            });
    };
    useEffect(() => {
        getShifts();
    }, []);

    return (
        <View style={styles.container}>
            <Alert navigation={navigation} />
            <Booking />
            <Rooms />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60 + 6,
        flex: 1,
        padding: 6,
        gap: 10,
    },
});
