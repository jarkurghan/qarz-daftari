import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getActiveJournal } from "../../store/activeJournal";
import { useSelector } from "react-redux";

export default function JournalComponent() {
    const [debt, setDebt] = useState([]);
    const active = useSelector(getActiveJournal);

    const getDebt = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            const res = await axios.get(`http://192.168.1.2:1009/qd/v1/api/journal/${active.id}/debt`, { headers: { Authorization: `Bearer ${value}` } });
            setDebt(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDebt();
    }, []);

    return (
        <View style={styles.container}>
            {debt.map((el) => (
                <Text style={styles.debt}>{el.name}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
        backgroundColor: "#CED5E0",
    },
    debt: {
        backgroundColor: "#f5f5f5",
        borderBottomColor: "#ddd",
        borderBottomWidth: 2,
        padding: 10,
    },
});
