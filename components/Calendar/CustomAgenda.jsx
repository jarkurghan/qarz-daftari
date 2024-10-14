import React from "react";
import { View, StyleSheet, Text } from "react-native";

const StaffInfo = ({ book }) => {
    if (book.dateType === "booked_date" && !book.booked_by)
        return (
            <View>
                <Text>bron qilindi</Text>
            </View>
        );
    if (book.dateType === "checked_date" && !book.checked_by)
        return (
            <View>
                <Text>ro'yxatga olindi</Text>
            </View>
        );
    if (book.dateType === "checkout_date" && !book.checkout_by)
        return (
            <View>
                <Text>ro'yxatdan chiqarildi</Text>
            </View>
        );

    const type =
        book.dateType === "booked_date"
            ? "bron qilindi"
            : book.dateType === "checked_date"
            ? "ro'yxatga olindi"
            : book.dateType === "checkout_date"
            ? "ro'yxatdan chiqarildi"
            : "";
    return (
        <View style={styles.staff}>
            <Text style={styles.staffText}>
                {book.staff_first_name} {book.staff_last_name} tomonidan {type}
            </Text>
        </View>
    );
};

const AgendaComponent = ({ events }) => {
    function bordercolor(bookingType) {
        if (bookingType === 1) return "green";
        if (bookingType === 2) return "purple";
        if (bookingType === 3) return "blue";
        if (bookingType === 4) return "#ff0";
        if (bookingType === 5) return "orange";
        return "";
    }

    return (
        <View>
            {events.length === 0 && (
                <View style={styles.content}>
                    <Text>No events!</Text>
                </View>
            )}
            {events.map((booking) => (
                <View key={booking.date} style={{ ...styles.content, borderLeftColor: bordercolor(booking.type) }}>
                    <View style={styles.title}>
                        <Text style={styles.date}>{booking.date.slice(11, 16)}</Text>
                        <View style={styles.room}>
                            <Text style={styles.roomNumber}>{booking.number}-xona</Text>
                            {/* <Text>{event.category_name}</Text> */}
                        </View>
                    </View>
                    <StaffInfo book={booking} />
                    <View style={styles.guests}>
                        {booking.guests.length > 0 && <Text>Mehmonlar: </Text>}
                        {booking.guests.map((guest) => (
                            <Text key={guest.id}>
                                {guest.first_name} {guest.last_name}
                                {booking.guests[booking.guests.length - 1].id === guest.id ? "" : ", "}
                            </Text>
                        ))}
                    </View>
                    {booking.start_date && (
                        <View style={styles.dates}>
                            <Text style={styles.datesText}>Boshlanish sanasi: {booking.start_date.slice(0, 10)}</Text>
                        </View>
                    )}
                    {booking.start_date && booking.end_date && (
                        <View style={styles.dates}>
                            <Text style={styles.datesText}>Tugash sanasi: {booking.end_date.slice(0, 10)}</Text>
                        </View>
                    )}
                    {booking.comments && (
                        <View style={styles.dates}>
                            <Text style={styles.datesText}>{booking.comments}</Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 10,
        color: "black",
        marginHorizontal: 10,
        marginVertical: 5,
        borderLeftWidth: 10,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    room: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5,
    },
    roomNumber: {
        color: "#777",
    },
    date: {
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "500",
    },
    guests: {
        flexDirection: "row",
    },
    staff: {},
    staffText: {
        color: "rgb(15, 50, 125)",
        fontWeight: "500",
    },
    dates: {},
    datesText: {
        // fontSize: 13,
        color: "rgba(15, 50, 75, 0.6)",
        fontWeight: "500",
        // textTransform: "uppercase",
    },
});

export default AgendaComponent;
