import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import IconRightMini from "../../icons/IconRightMini";
import { useEffect, useState } from "react";

function DropDownItem({ name, isSelected, onSelect }) {
    return (
        <Pressable onPress={onSelect}>
            <View style={[styles.item_container, isSelected && styles.selectedItem]}>
                <Text style={isSelected ? styles.selectedText : styles.text}>{name}</Text>
            </View>
        </Pressable>
    )
}

export default function DropDown({ label, children, items, value, handleChange, showValue = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(value);

    const handleSelect = (item) => {
        setSelectedItems(prevSelected => {
            if (prevSelected.some((i) => i.id == item.id)) {
                return prevSelected.filter(i => {
                    return i.id !== item.id
                });
            } else {
                return [...prevSelected, item];
            }
        });
    };

    useEffect(() => handleChange(selectedItems), [selectedItems]);
    useEffect(() => setSelectedItems(value), [value]);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsOpen(!isOpen)} >
                <View style={styles.header}>
                    <Text style={styles.label}>{label || "Title"}</Text>
                    <View style={styles.value}>
                        {showValue && <Text style={styles.label}>{value}</Text>}
                        <IconRightMini width={13} height={13} style={{
                            transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
                        }} />
                    </View>
                </View>
            </Pressable>
            {isOpen &&
                ((items && items?.length > 0) ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.items_container} >
                        {items.map((item) => (<DropDownItem key={item.id} name={item.name} isSelected={selectedItems.some((i) => i.id == item.id)} onSelect={() => handleSelect(item)} />))}
                    </ScrollView> :
                    (children && items.length === 0) ?
                        <View>
                            {children}
                        </View>
                        : <View style={styles.noData_container}>
                            <Text>No data 😐</Text>
                        </View>
                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 7
    },
    label: {
        color: "#000",
        fontWeight: "normal"
    },
    value: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    items_container: {
        overflow: "scroll",
        justifyContent: "center",
        paddingHorizontal: 5
    },
    noData_container: {
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 5
    },
    item_container: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#0095FF',
        alignItems: "center",
        width: "max-content",
        marginRight: 6
    },
    selectedItem: {
        backgroundColor: "#0095FF",
        color: "#fff",
    },
    text: {
        color: "#000",
        lineHeight: 16,
    },
    selectedText: {
        color: "#fff",
        lineHeight: 16
    },
});