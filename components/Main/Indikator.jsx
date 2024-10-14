import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const ProgressCircle = ({ percent }) => {
    const radius = 50; // Doira radiusi
    const strokeWidth = 10; // Doira chegara qalinligi
    const circumference = 2 * Math.PI * radius; // Doiraning to'liq uzunligi
    const progress = (percent / 100) * circumference; // Progress uzunligini hisoblash

    return (
        <View style={styles.container}>
            <Svg width={120} height={120}>
                {/* Fon doirasi */}
                <Circle stroke="#e0e0e0" fill="none" cx="60" cy="60" r={radius} strokeWidth={strokeWidth} />
                {/* Progress doirasi */}
                <Circle
                    stroke="#3498db"
                    fill="none"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress} // Bu progressni o'zgartiradi
                    strokeLinecap="round"
                />
            </Svg>
            {/* Progress matni */}
            <Text style={styles.percentText}>{percent}%</Text>
        </View>
    );
};

const Indikator = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 1 : 0)); // Progress 100%ga yetganda, yana 0%dan boshlanadi
        }, 100); // Har 100msda progress oshadi
        return () => clearInterval(interval); // Tozalash
    }, []);

    return (
        <View style={styles.appContainer}>
            <ProgressCircle percent={progress} />
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    percentText: {
        position: "absolute",
        fontSize: 24,
        fontWeight: "bold",
        color: "#3498db",
    },
});

export default Indikator;
