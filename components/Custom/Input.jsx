// IconTextInput.js
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../styles/style';

const Input = ({ placeholder, onChange, keyboardType, regex }) => {

    const [value, setValue] = useState("");
    const [onFocus, setOnFocus] = useState(false);
    const input = useRef();

    const handleChangeText = (text) => {
        if (regex && regex.test(text)) {
            setValue(text);
            onChange(text);
        }
    };

    const clear = () => {
        setValue("");
        setOnFocus(true);
        onChange("");
    }

    return (
        <View onBlur={() => setOnFocus(false)} style={{ ...styles.inputContainer, borderBottomWidth: onFocus ? 3 : 1 }}>
            <Icon name="search" size={20} color="#a9a9a9" style={styles.icon} />
            <TextInput
                ref={input}
                style={styles.input}
                placeholder={placeholder || "Search"}
                value={value}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
                onFocus={() => setOnFocus(true)}
            />
            {value && <Pressable onPress={clear} style={styles.closeWrapper}>
                <Icon name="close" size={12} color="#fff" />
            </Pressable>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        ...globalStyles.box,
        padding: 0,
        height: "100%",
        paddingHorizontal: 6,
        gap: 5,
    },
    input: {
        flex: 1,
        outlineWidth: 0,
        elevation: 0,
        height: "100%"
    },
    closeWrapper: {
        backgroundColor: "#a9a9a9",
        padding: 3,
        borderRadius: 50,
        fontWeight: "900"
    }
});

export default Input;
