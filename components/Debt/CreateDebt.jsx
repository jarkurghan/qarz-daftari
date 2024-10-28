import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { getActiveJournal } from "../../store/activeJournal";
import { useSelector } from "react-redux";
import { getJournalValidation } from "../../store/journalValidation";
import * as Yup from "yup";
import { Formik } from "formik";
import { TextInput } from "react-native";
import { Button } from "react-native";

const defaultSchema = Yup.object().shape({
    name: Yup.string().required("Matn kiriting!"),
});
const defaultValue = {
    name: undefined,
    amount: undefined,
    date: undefined,
    debt_type: undefined,
};

export default function CreateDebtPage() {
    const active = useSelector(getActiveJournal);
    const journalValidation = useSelector(getJournalValidation);
    const [validation, setValidation] = useState(defaultSchema);
    const [initialValue, setInitialValue] = useState(defaultValue);
    const [formaShakli, setFormaShakli] = useState(null);

    useEffect(() => {
        const currentJournalVal = journalValidation[active.name];
        const schema = { name: Yup.string().required("Matn kiriting!") };
        const value = { name: "", amount: 0, date: "", debt_type: "" };
        const formaShakli = new Set(["name", "date", "amount", "debt_type"]);

        if (currentJournalVal.folderable) {
            schema.folder = Yup.string().optional();
            value.folder = "/";
            formaShakli.add("folder");
        }

        if (currentJournalVal.debt_type_required) schema.debt_type = Yup.string().required("Qaytarish vaqtini kitiring!");
        else schema.debt_type = Yup.string().optional();
        if (currentJournalVal.debt_type_default) value.debt_type = currentJournalVal.debt_type_default;

        if (currentJournalVal.amount_type === "float") {
            if (currentJournalVal.amount_required) {
                schema.amount = Yup.number()
                    .typeError("Bu son bo'lishi kerak")
                    .moreThan(0, "Qarz miqdori ijobiy son bo'lishi kerak")
                    .required("Qarz miqdorini kitiring!");
            } else {
                schema.amount = Yup.string().typeError("Bu son bo'lishi kerak").moreThan(0, "Qarz miqdori ijobiy son bo'lishi kerak").optional();
            }
        } else if (currentJournalVal.amount_type === "string") {
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

    const onSubmit = (values) => {
        Alert.alert("Forma muvaffaqiyatli yuborildi!", JSON.stringify(values));
        // Bu yerda ma'lumotlarni qayta ishlash mumkin (API ga yuborish va h.k.)
    };

    return (
        <View style={styles.container}>
            {formaShakli && (
                <Formik initialValues={initialValue} validationSchema={validation} onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <Text>Create Debt</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                value={values.name}
                            />
                            {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}

                            <TextInput
                                style={styles.input}
                                placeholder="Amount"
                                keyboardType="numeric"
                                onChangeText={handleChange("amount")}
                                onBlur={handleBlur("amount")}
                                value={values.amount.toString()}
                            />
                            {errors.amount && touched.amount && <Text style={styles.error}>{errors.amount}</Text>}

                            <TextInput
                                style={styles.input}
                                placeholder="Date"
                                onChangeText={handleChange("date")}
                                onBlur={handleBlur("date")}
                                value={values.date}
                            />
                            {errors.date && touched.date && <Text style={styles.error}>{errors.date}</Text>}

                            <TextInput
                                style={styles.input}
                                placeholder="Debt Type"
                                onChangeText={handleChange("debt_type")}
                                onBlur={handleBlur("debt_type")}
                                value={values.debt_type}
                            />
                            {errors.debt_type && touched.debt_type && <Text style={styles.error}>{errors.debt_type}</Text>}

                            <Button title="Submit" onPress={handleSubmit} />
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});
