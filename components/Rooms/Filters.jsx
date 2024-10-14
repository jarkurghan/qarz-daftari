import { StyleSheet, Text, View } from "react-native";
import PriceRange from "../Custom/PriceRange";
import { getToken } from "../../store/token";
import { useEffect, useState } from "react";
import Button from "../Custom/Button";
import DropDown from "./DropDown";
import axios from "axios";

import { updatePrevFilter } from '../../store/prevFilter';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../store/filter';

const Filters = ({ setModalVisible, range }) => {
    const dispatch = useDispatch();
    const prevFilters = useSelector((state) => state.prevFilter);

    const [statuses, setStatuses] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = useSelector(getToken);

    const getStatuses = async () => {
        try {
            const statusResponse = await axios.get(`http://142.93.128.235:7834/api/hdp/mob/room/status`, { headers: { Authorization: token } });
            setStatuses(statusResponse.data.data.map((item) => { return { id: item.id, name: item.status } }));
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const categoryResponse = await axios.get(`http://142.93.128.235:7834/api/hdp/mob/room/category`, { headers: { Authorization: token } });
            setCategories(categoryResponse.data.data.map((item) => { return { id: item.id, name: item.name } }));
        } catch (error) {
            console.log(error);
        }
    };

    function handleReset() {
        dispatch(updatePrevFilter(
            {
                number: '',
                category: [],
                status: [],
                priceRange: [],
                min: prevFilters.min || 0,
                max: prevFilters.max || Infinity,
            }
        ))
    }

    useEffect(() => {
        getStatuses();
        getCategories();
    }, []);

    return (
        <View style={styles.filters}>
            <View style={styles.filter}>
                <DropDown label="Filter by category" value={prevFilters.category} items={categories}
                    handleChange={(val) => {
                        dispatch(updatePrevFilter(
                            { category: val }
                        ))
                    }
                    }
                />
            </View>
            <View style={styles.filter}>
                <DropDown label="Filter by status" value={prevFilters.status} items={statuses}
                    handleChange={(val) => {
                        dispatch(updatePrevFilter(
                            { status: val }
                        ))
                    }
                    } />
            </View>
            <View style={styles.filter}>
                <DropDown label="Price range" showValue={true} items={[]} value={`${prevFilters.priceRange[0] || range[0]} - ${prevFilters.priceRange[1] || range[1]}`} handleChange={() => { }}>
                    <PriceRange min={range[0]} max={range[1]} valueProp={[prevFilters.priceRange[0] || range[0], prevFilters.priceRange[1] || range[1]]}
                        onPriceChange={(newValue) => {
                            dispatch(updatePrevFilter(
                                {
                                    priceRange: newValue,
                                }
                            ))
                        }}
                    />
                </DropDown>
            </View>
            <View style={styles.footer}>
                <Button handleClick={handleReset}>
                    <Text style={{ color: "#fff", fontWeight: 600 }}>Reset</Text>
                </Button>
                <Button handleClick={() => {
                    dispatch(updateFilter(
                        prevFilters
                    ));
                    setModalVisible(false);
                }}>
                    <Text style={{ color: "#fff", fontWeight: 600 }} >Filter</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filters: {
        padding: 14,
        justifyContent: "flex-end",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
        top: 0,
        minWidth: "100%",
        overflow: "hidden",
        zIndex: 1000
    },
    filter: {
        height: "100",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingTop: 8,
    },
    footer: {
        width: "100%",
        marginTop: 45,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 6
    }
});

export default Filters;