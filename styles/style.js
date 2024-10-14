import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    box: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#339eff',
        padding: 6,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#339eff',
        border: "1px solid #339eff",
        color: "#fff",
        padding: 6,
        borderRadius: 5,
        fontFamily: "sans-serif",
        fontSize: 16
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default globalStyles;
