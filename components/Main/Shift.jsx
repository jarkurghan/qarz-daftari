import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon1 from "react-native-vector-icons/FontAwesome";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import { getLastGetting, getTimeClock, setLastGetting, setTimeClock } from "../../store/timeClock";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/token";
import { closeAlert, openSpinner, openWarning } from "../../store/alert";
import axios from "axios";
const { height, width } = Dimensions.get("window");

const TimeClock = () => {
    const timeClock = useSelector(getTimeClock);
    const lastgetting = useSelector(getLastGetting);
    const [shiftTime, setShiftTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        let diff = 0;
        if (lastgetting) diff = parseInt((new Date().getTime() - new Date(lastgetting).getTime()) / 1000);
        if (timeClock.status === "on_break") {
            setShiftTime(timeClock.work);
            setBreakTime((timeClock.break += diff));
            setStatus(timeClock.status);
        } else if (timeClock.status === "at_work") {
            setShiftTime((timeClock.work += diff));
            setBreakTime(timeClock.break);
            setStatus(timeClock.status);
        } else setStatus(timeClock.status);
    }, [timeClock]);

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        let subscription;

        const startLocationTracking = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Joylashuvni olishga ruxsat berilmagan");
                return;
            }

            subscription = await Location.watchPositionAsync(
                {
                    // Aniqlik darajasi: Low, Medium, High
                    accuracy: Location.Accuracy.High,
                    // Har 1000 ms (1 soniyada) yangilanish olish
                    timeInterval: 1000,
                    // Har 1 metrda yangilanish olish
                    distanceInterval: 1,
                },
                (newLocation) => {
                    setLocation({ latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude });
                }
            );
        };

        startLocationTracking();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const getShifts = async () => {
        await axios
            .get(`http://142.93.128.235:7834/api/hdp/mob/shift/status`, { headers: { Authorization: token } })
            .then((res) => {
                dispatch(setLastGetting());
                dispatch(setTimeClock(res?.data?.data));
            })
            .catch((err) => {
                console.log(err);
                const text = "Something went wrong!";
                dispatch(openWarning({ text }));
            });
    };

    const onChange = async (type) => {
        dispatch(openSpinner());
        await axios
            .post(`http://142.93.128.235:7834/api/hdp/mob/shift/event/${type}`, location, { headers: { Authorization: token } })
            .then(async (res) => {
                await getShifts();
                dispatch(closeAlert());
            })
            .catch((err) => {
                console.log(err);
                const text = "Something went wrong!";
                dispatch(openWarning({ text }));
                getShifts();
            });
    };

    useEffect(() => {
        let interval;
        if (status === "at_work") {
            interval = setInterval(() => {
                setShiftTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (status === "on_break") {
            interval = setInterval(() => {
                setBreakTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        let str = `${mins}m ${secs}s`;
        if (hrs !== 0) str = `${hrs}h ` + str;
        return str;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
            <View style={styles.buttons}>
                {status === "not_at_work" && (
                    <TouchableOpacity style={[styles.button, styles.buttonStart]} onPress={() => onChange(1)}>
                        <IconEntypo name="controller-play" size={20} color={"green"} />
                        <Text style={[styles.buttonText, { color: "green" }]}>Clock in</Text>
                    </TouchableOpacity>
                )}
                {status === "at_work" && (
                    <TouchableOpacity style={[styles.button, { borderColor: "rgba(0, 0, 0, 0.5)", backgroundColor: "gray" }]} onPress={() => onChange(3)}>
                        <IconMaterial name="work" size={20} color={"white"} />
                        <Text style={[styles.buttonText, { color: "white" }]}>Break</Text>
                    </TouchableOpacity>
                )}
                {status === "on_break" && (
                    <TouchableOpacity style={[styles.button, { borderColor: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)" }]} onPress={() => onChange(4)}>
                        <Icon1 name="coffee" size={20} color={"blue"} />
                        <Text style={[styles.buttonText, { color: "blue" }]}>end break</Text>
                    </TouchableOpacity>
                )}
                {status === "at_work" && (
                    <TouchableOpacity style={[styles.button, { borderColor: "red", backgroundColor: "rgba(255, 0, 0, 0.2)" }]} onPress={() => onChange(2)}>
                        <IconEntypo name="controller-stop" size={20} color={"red"} />
                        <Text style={[styles.buttonText, { color: "red" }]}>Clock out</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.times}>
                <View style={styles.timers}>
                    <Text style={styles.status}>Holat:</Text>
                    <Text style={styles.timer}>{status}</Text>
                </View>
                <View style={styles.timers}>
                    <Text style={styles.status}>Bugungi ish soati:</Text>
                    <Text style={styles.timer}>{formatTime(shiftTime)}</Text>
                </View>
                <View style={styles.timers}>
                    <Text style={styles.status}>Bugungi tanaffus:</Text>
                    <Text style={styles.timer}>{formatTime(breakTime)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height - 64,
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingBottom: 56 + 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    time: {
        fontSize: 48,
        marginVertical: 20,
    },
    status: {
        fontSize: 16,
        color: "gray",
    },
    buttons: {
        flexDirection: "row",
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 10,
        padding: 20,
        height: 100,
        width: 100,
        borderWidth: 2,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStart: {
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
    },
    buttonText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "500",
    },
    times: {
        marginVertical: 40,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    timers: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        paddingVertical: 4,
    },
    timer: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default TimeClock;
