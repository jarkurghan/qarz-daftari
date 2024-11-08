import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text, TouchableOpacity } from "react-native";
import { getJournalValidation } from "../../store/journalValidation";
import { getActiveJournal } from "../../store/activeJournal";
import { TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getDebt } from "../../store/gettersForAPI";

const defaultSchema = Yup.object().shape({
    name: Yup.string().required("Matn kiriting!"),
});
const defaultValue = {
    name: undefined,
    amount: undefined,
    date: undefined,
    debt_type: undefined,
};
const yesterday = new Date();
yesterday.setDate(new Date().getDate() - 1);

export default function CreateDebtPage({ navigation }) {
    const dispatch = useDispatch();
    const active = useSelector(getActiveJournal);
    const journalValidation = useSelector(getJournalValidation);
    const [validation, setValidation] = useState(defaultSchema);
    const [initialValue, setInitialValue] = useState(defaultValue);
    const [formaShakli, setFormaShakli] = useState(null);
    const [showDateModal, setShowDateModal] = useState(false);

    useEffect(() => {
        const currentJournalVal = journalValidation[active.name];
        const schema = { name: Yup.string().required("Nom kiriting!") };
        const value = { name: "", amount: "", date: "", debt_type: "" };
        const formaShakli = new Set(["name", "date", "debt_type"]);

        if (currentJournalVal.folderable) {
            schema.folder = Yup.string().optional();
            value.folder = "/";
            formaShakli.add("folder");
        }

        if (currentJournalVal.debt_type_required) schema.debt_type = Yup.string().required("Qaytarish vaqtini kitiring!");
        else schema.debt_type = Yup.string().optional();
        if (currentJournalVal.debt_type_default) value.debt_type = currentJournalVal.debt_type_default;

        if (currentJournalVal.amount_type === "float") {
            formaShakli.add("amount-float");
            if (currentJournalVal.amount_required) {
                schema.amount = Yup.number().typeError("Bu son bo'lishi kerak").moreThan(0, "Qarz miqdori noto'g'ri").required("Qarz miqdorini kitiring!");
            } else {
                schema.amount = Yup.string().typeError("Bu son bo'lishi kerak").optional();
            }
        } else if (currentJournalVal.amount_type === "string") {
            formaShakli.add("amount-string");
            if (currentJournalVal.amount_required) {
                schema.amount = Yup.number().required("Qarzni kitiring!");
            } else {
                schema.amount = Yup.string().optional();
            }
        }

        if (currentJournalVal.date_required) schema.date = Yup.string().required("Qaytarish vaqtini kitiring!");
        else schema.date = Yup.string().optional();

        if (currentJournalVal.addressable) {
            formaShakli.add("address");
            value.address = "";
            if (currentJournalVal.address_required) schema.address = Yup.string().required("Address kitiring!");
            else schema.address = Yup.string().optional();
        }
        if (currentJournalVal.phonable) {
            formaShakli.add("phone");
            value.phone = "";
            if (currentJournalVal.phone_required) schema.phone = Yup.string().required("Telefon raqam kitiring!");
            else schema.phone = Yup.string().optional();
        }

        const validationSchema = Yup.object().shape(schema);
        setValidation(validationSchema);
        setInitialValue(value);
        setFormaShakli(formaShakli);
    }, [active]);

    const dateChangeHandler = (event, setValues, values) => {
        if (new Date(event.nativeEvent.timestamp) > new Date()) values.date = new Date(event.nativeEvent.timestamp);
        setShowDateModal(false);
        setValues(values);
    };

    const [submitting, setSubmitting] = useState(false);
    const onSubmit = async (values, { resetForm, setTouched }) => {
        setSubmitting(true);
        try {
            const data = { ...values, journal_id: active.id };
            const token = await AsyncStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            await axios.post("http://192.168.1.2:1009/qd/v1/api/journal/debt", data, { headers });
            dispatch(getDebt());
            resetForm();
            setTouched(false);
            navigation.navigate(active.name);
        } catch (error) {
            const message = (error.response && error.response.data.error) || error.message || "Something went wrong!";
            Alert.alert(message);
            console.log(error);
        }
        setSubmitting(false);
    };

    return (
        <View style={styles.container}>
            {formaShakli && (
                <Formik initialValues={initialValue} validationSchema={validation} onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, setValues, handleSubmit, values, errors, touched }) => (
                        <View>
                            <Text style={styles.title}>Qarz qo'shish</Text>

                            {formaShakli.has("name") && (
                                <React.Fragment>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Ism Familya, Falon do'kon yoki boshqa nom kiriting"
                                        placeholderTextColor="#888"
                                        onChangeText={handleChange("name")}
                                        onBlur={handleBlur("name")}
                                        value={values.name}
                                    />
                                    <Text style={[styles.error, { opacity: errors.name && touched.name ? 1 : 0 }]}>{errors.name}</Text>
                                </React.Fragment>
                            )}

                            {formaShakli.has("amount-float") && (
                                <React.Fragment>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Qarz miqdori"
                                        placeholderTextColor="#888"
                                        keyboardType="numeric"
                                        onChangeText={handleChange("amount")}
                                        onBlur={handleBlur("amount")}
                                        value={values.amount.toString()}
                                    />
                                    <Text style={[styles.error, { opacity: errors.amount && touched.amount ? 1 : 0 }]}>{errors.amount}</Text>
                                </React.Fragment>
                            )}

                            {formaShakli.has("amount-string") && (
                                <React.Fragment>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Qarz miqdori"
                                        placeholderTextColor="#888"
                                        onChangeText={handleChange("amount")}
                                        onBlur={handleBlur("amount")}
                                        value={values.amount}
                                    />
                                    <Text style={[styles.error, { opacity: errors.amount && touched.amount ? 1 : 0 }]}>{errors.amount}</Text>
                                </React.Fragment>
                            )}

                            {/* to-do: date types */}
                            {formaShakli.has("date") && (
                                <React.Fragment>
                                    {showDateModal && (
                                        <DateTimePicker
                                            value={values.date || yesterday}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                            onChange={(e) => dateChangeHandler(e, setValues, values)}
                                            minimumDate={new Date()}
                                        />
                                    )}
                                    <TouchableOpacity style={styles.formControl} onPress={() => setShowDateModal(true)}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Qaytarish vaqti"
                                            value={values.date ? values.date.toLocaleDateString() : ""}
                                            editable={false}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.error, { opacity: errors.date && touched.date ? 1 : 0 }]}>{errors.date}</Text>
                                </React.Fragment>
                            )}

                            {formaShakli.has("phone") && (
                                <React.Fragment>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="+998901234567"
                                        placeholderTextColor="#B0B0B0"
                                        onChangeText={handleChange("phone")}
                                        onBlur={handleBlur("phone")}
                                        value={values.phone}
                                        keyboardType="phone-pad"
                                    />
                                    <Text style={[styles.error, { opacity: errors.phone && touched.phone ? 1 : 0 }]}>{errors.phone}</Text>
                                </React.Fragment>
                            )}

                            {formaShakli.has("address") && (
                                <React.Fragment>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Sh.Rashidov 10-uy, Dehqon bozor 10-do'kon yoki shunga o'xshash manzil"
                                        placeholderTextColor="#888"
                                        onChangeText={handleChange("address")}
                                        onBlur={handleBlur("address")}
                                        value={values.address}
                                    />
                                    <Text style={[styles.error, { opacity: errors.address && touched.address ? 1 : 0 }]}>{errors.address}</Text>
                                </React.Fragment>
                            )}

                            {formaShakli.has("debt_type") && (
                                <React.Fragment>
                                    <RadioButton.Group onValueChange={handleChange("debt_type")} value={values.debt_type}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <RadioButton value="mendan qarz" />
                                            <TouchableWithoutFeedback onPress={() => handleChange("debt_type")("mendan qarz")}>
                                                <Text>Mendan qarz</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <RadioButton value="maning qarzim" />
                                            <TouchableWithoutFeedback onPress={() => handleChange("debt_type")("maning qarzim")}>
                                                <Text>Mening qarzim</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </RadioButton.Group>
                                    <Text style={[styles.error, { opacity: errors.debt_type && touched.debt_type ? 1 : 0 }]}>{errors.debt_type}</Text>
                                </React.Fragment>
                            )}
                            <Button title="Qo'shish" onPress={handleSubmit} disabled={submitting} />
                        </View>
                    )}
                </Formik>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontWeight: "500",
        fontSize: 24,
        textTransform: "uppercase",
        color: "#333",
        textAlign: "center",
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 20,
        // borderColor: "#007AFF",
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        elevation: 2,
        color: "#333",
    },
    error: {
        color: "red",
        marginBottom: 10,
        paddingLeft: 20,
        height: 19,
        textTransform: "lowercase",
    },
});
