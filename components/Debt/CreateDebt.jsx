import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { getActiveJournal } from "../../store/activeJournal";
import { useSelector } from "react-redux";
import { getJournalValidation } from "../../store/journalValidation";
import * as Yup from "yup";

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

    return (
        <View style={styles.container}>
            <Text>Create page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
    },
});
