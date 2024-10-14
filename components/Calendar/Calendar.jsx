import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openSpinner, openWarning } from "../../store/alert";
import { getToken } from "../../store/token";
import AgendaComponent from "./CustomAgenda";

LocaleConfig.locales["uz"] = {
    monthNames: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    monthNamesShort: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"],
    dayNames: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
    dayNamesShort: ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"],
    today: "Bugun",
};
LocaleConfig.defaultLocale = "uz";

export default function CalendarComponents() {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const [selected, setSelected] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [events, setEvents] = useState([]);
    const [dots, setDots] = useState({});
    const booking = { key: "booking", color: "#3498db", selectedDotColor: "#3498db" };
    const checkin = { key: "checkin", color: "#07bc0c", selectedDotColor: "#07bc0c" };
    const checkout = { key: "checkout", color: "#E7700D", selectedDotColor: "#E7700D" };

    const getEvents = async () => {
        dispatch(openSpinner());
        await axios
            .get(`http://142.93.128.235:7834/api/hdp/mob/calendar/event/room/${selected}`, { headers: { Authorization: token } })
            .then(async (res) => {
                setEvents(res.data.data);
                dispatch(closeAlert());
            })
            .catch((err) => {
                const text = "Something went wrong!";
                dispatch(openWarning({ text }));
            });
    };

    const getDots = async () => {
        await axios
            .get(`http://142.93.128.235:7834/api/hdp/mob/calendar/event/month/${year}/${month}`, { headers: { Authorization: token } })
            .then(async (res) => {
                const temp = {};
                for (let i = 0; i < res.data.data.length; i++) {
                    let key = res.data.data[i].day;
                    let val = { dots: [] };
                    if (res.data.data[i].booking > 0) val.dots.push(booking);
                    if (res.data.data[i].check_in > 0) val.dots.push(checkin);
                    if (res.data.data[i].check_out > 0) val.dots.push(checkout);
                    temp[key] = val;
                }

                setDots({ ...dots, ...temp });
            })
            .catch((err) => {
                console.log(err);
                const text = "Something went wrong!";
            });
    };

    useEffect(() => {
        if (selected) getEvents();
    }, [selected]);

    const monthChangeHandler = (e) => {
        setYear(e.year);
        setMonth(e.month - 1);
    };

    useEffect(() => {
        getDots();
    }, [month, year]);

    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                firstDay={1}
                onDayPress={(day) => setSelected(day.dateString)}
                onMonthChange={monthChangeHandler}
                markingType={"multi-dot"}
                markedDates={{ ...dots, [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "orange" } }}
            />
            {selected && <AgendaComponent events={events} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
    },
    calendar: {
        borderRadius: 5,
        margin: 10,
    },
});
