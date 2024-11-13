import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getActiveJournal } from "../../store/activeJournal";
import { useSelector } from "react-redux";
import { getters } from "../../store/gettersForAPI";

export default function JournalComponent() {
    const [debt, setDebt] = useState([]);
    const active = useSelector(getActiveJournal);
    const getter = useSelector(getters);

    const getDebt = async () => {
        try {
            const value = await AsyncStorage.getItem("qddev-token");
            const res = await axios.get(`http://192.168.1.2:1009/qd/v1/api/journal/debt`, { headers: { Authorization: `Bearer ${value}` } });
            setDebt(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDebt();
    }, [getter.debt]);

    return (
        <View style={styles.container}>
            {debt.map((el) => (
                <View key={el.id} style={styles.debt}>
                    <View>
                        <Text>{el.name}</Text>
                        <Text>{el.amount}</Text>
                    </View>
                    <View>
                        <Text>{"2024-10-01"}</Text>
                        <Text>{el.amount}</Text>
                    </View>
                    {/* <Text>{el.date.slice(0, 10)}</Text> */}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        backgroundColor: "#CED5E0",
    },
    debt: {
        backgroundColor: "#f5f5f5",
        borderBottomColor: "#ddd",
        borderBottomWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
});
