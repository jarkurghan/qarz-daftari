import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { View, Button, Text } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const App = ({ navigation }) => {
    const animation = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.timing(animation, { toValue: 1, duration: 1000, useNativeDriver: true }).start(() => {
            animation.setValue(1);
        });
    };

    const translateY = animation.interpolate({ inputRange: [0, 1], outputRange: [-40, 0] });

    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                <View style={styles.box}>
                    <Text style={styles.boxText}>clock in qilmoqchimisiz?</Text>
                    <Button title="Time clock" onPress={() => navigation.navigate("Inner")} />
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: width - 20,
        height: 40,
        paddingHorizontal: 4,
        borderRadius: 5,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    boxText: {
        textTransform: "uppercase",
        fontWeight: "500",
        color: "rgb(51, 158, 255)",
    },
});

export default App;
