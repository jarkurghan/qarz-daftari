import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { getActiveJournal } from "../../store/activeJournal";
import { useSelector } from "react-redux";
import { getJournalValidation } from "../../store/journalValidation";
import * as Yup from "yup";

const defaultSchema = Yup.object().shape({
    name: Yup.string().required("Matn kiriting!"),
    // amount: Yup.string(), // Agar kerak bo'lsa, .nullable() yoki .required() qo'shishingiz mumkin
    // date: Yup.date().nullable(), // Agar 'date' qiymati bo'sh bo'lishi mumkin bo'lsa
    // address: Yup.string().nullable(), // Agar 'address' bo'sh bo'lishi mumkin bo'lsa
    // phone: Yup.string().nullable(), // Agar 'phone' bo'sh bo'lishi mumkin bo'lsa
    // folder: Yup.string().default("/").required("Folder is required"),
    // debt_type: Yup.string().nullable(), // Agar 'debt_type' bo'sh bo'lishi mumkin bo'lsa
});

export default function CreateDebtPage() {
    const active = useSelector(getActiveJournal);
    const journalValidation = useSelector(getJournalValidation);
    const [value, setValue] = useState({});
    const [validation, setValidation] = useState(defaultSchema);

    useEffect(() => {
        setValue(journalValidation[active.name]);
    }, [active]);

    useEffect(() => {
        const schema = { name: Yup.string().required("Matn kiriting!") };
        // const form = {};
        // if (response.addressable) {
        //     if (response.address_required) schema.address = Yup.string().required("Address kitiring!");
        //     else schema.address = Yup.string().optional();
        // }
        // if (response.phonable) {
        //     if (response.phone_required) schema.phone = Yup.string().required("Telefon raqam kitiring!");
        //     else schema.phone = Yup.string().optional();
        // }
        // if (response.folderable) {
        //     schema.folder = Yup.string().optional();
        // }
        // const validationSchema = Yup.object().shape(schema);
        // console.log();
        console.log(value);
    }, [value]);

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
