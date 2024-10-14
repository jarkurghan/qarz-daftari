import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const PriceRange = ({ min, max, valueProp, onPriceChange }) => {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    const [value, setValue] = useState([minValue, maxValue]);

    useEffect(() => {
        setValue(valueProp);
    }, [valueProp]);

    const handleSliderValuesChange = (values) => {
        setValue(values);
        onPriceChange(values);
    };

    return (
        <View style={styles.container}>
            <MultiSlider
                style={{ padding: 0 }}
                values={value}
                sliderLength={280}
                min={minValue}
                max={maxValue}
                onValuesChange={handleSliderValuesChange}
                step={1}
                allowOverlap={false}
                snapped={true}
                minimumTrackTintColor="#0095FF"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#007bff"
                selectedStyle={styles.selectedTrack}
                markerStyle={styles.marker}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidthwidth: '100%',
        marginHorizontal: "auto"
    },
    title: {
        marginBottom: 10,
    },
    rangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rangeText: {
        marginTop: 10,
    },
    selectedTrack: {
        backgroundColor: "#339EFF"
    },
    marker: {
        height: 23,
        width: 23,
        backgroundColor: '#007bff',
    },
});

export default PriceRange;
