import { StyleSheet, Text, View } from "react-native";
import IconMoney from "../../icons/IconMoney";

const getBorderColor = (status) => {
    let borderColor;
    switch (status) {
        case "available":
            borderColor = "#e0e0e0";
            break;
        case "busy":
            borderColor = "#07bc0c";
            break;
        case "dirty":
            borderColor = "#757575";
            break;
        case "cleaning in progress":
            borderColor = "#f1c40f";
            break;
        case "in maintains":
            borderColor = "#0dcaf0";
            break;
        case "Booked":
            borderColor = '#A020F0';
            break;
        default:
            borderColor = "#ffffff";
    }

    return {
        backgroundColor: borderColor
    };
}

export default function RoomCard({ room }) {
    return (
        <View style={{ ...styles.container, ...getBorderColor(room.status_name) }}>
            {room && <>
                <Text style={styles.number}>{room.number}</Text>
                {!room?.notice && <View style={styles.notice} />}
                <View style={styles.row}>
                    <Text style={styles.row_name}>Category:</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.row_value}>{room.category_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.row_name}>Status:</Text>
                    <Text style={styles.row_value}>{room.status_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.row_name}>Number of people:</Text>
                    <Text style={styles.row_value}>{room.number_of_people}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.row_name}>Price:</Text>
                    <Text style={styles.row_value}>{room.price}</Text>
                </View>
            </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 160,
        height: 200,
        width: "49%",
        boxShadow: "rgba(0, 0, 0, 0.14) 0px 0px 3px",
        padding: 15,
        borderRadius: 5,
        overflow: "hidden"
    },
    notice: {
        position: "absolute",
        height: 14,
        width: 60,
        backgroundColor: "red",
        transform: [{ rotate: '50deg' }],
        right: -16,
        top: 10
    },
    number: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        paddingBottom: 8,
        color: "#FF8225"
    },
    row: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection: "row",
        gap: 7,
        paddingBottom: 8
    },
    row_name: {
        fontWeight: "700",
        fontSize: 12,
        width: "52%"
    },
    row_value: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 13,
        maxHeight: "20px",
        overflow: "hidden",
        width: "42%"
    }
});