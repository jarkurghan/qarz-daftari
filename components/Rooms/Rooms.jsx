import axios from "axios";
import { StyleSheet, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import { closeAlert, openSpinner, openWarning } from "../../store/alert";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../store/token";
import RoomCard from "./RoomCard";
import CustomModal from "../Custom/CustomModal";
import IconFilter from "../../icons/IconFilter";
import Button from "../Custom/Button";
import NoDataPage from "../Custom/NoDataPage";
import Input from "../Custom/Input";
import { ScrollView } from "react-native-gesture-handler";
import { updateFilter } from '../../store/filter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RoomComponents() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const currentFilters = useSelector((state) => state.filter);

  const [refreshing, setRefreshing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [minMax, setMinMax] = useState([]);

  const getRooms = async () => {
    try {
      dispatch(openSpinner());
      const roomsResponse = await axios.get(`http://142.93.128.235:7834/api/hdp/mob/room`, { headers: { Authorization: token } });
      setRooms(roomsResponse.data.data);
      setData(roomsResponse.data.data);
      setMinMax([
        Math.min(...roomsResponse.data.data.map((room) => room.price)),
        Math.max(...roomsResponse.data.data.map((room) => room.price))
      ]);
      dispatch(closeAlert());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(closeAlert());
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getRooms();
    setTimeout(() => {}, 1500)
    setRefreshing(false);
  };

  const filterData = () => {
    const filteredRooms = rooms.filter((room) => {
      return room.number.includes(String(currentFilters.number))
    })
      .filter((room) => {
        return currentFilters.category.length !== 0 ? currentFilters.category.some((category) => category.id === room.category) : true;
      })
      .filter((room) => {
        return currentFilters.status.length !== 0 ? currentFilters.status.some((status) => status.id === room.status) : true;
      }).filter((room) => {
        return currentFilters.priceRange.length !== 0 ? room.price >= (currentFilters.priceRange[0] || 0) && room.price <= (currentFilters.priceRange[1] || Infinity) : true
      });
    setData(filteredRooms);
  };

  useEffect(() => {
    filterData();
  }, [currentFilters]);

  return (
    <>
    <View style={styles.header}>
        <Input placeholder="Search by id"
          onChange={(val) => {
            dispatch(updateFilter(
              {
                number: val,
              }
            ))
          }} regex={/^[0-9]*$/} />
        <Button handleClick={() => setModalVisible(true)}>
          <IconFilter fill="#fff" style={{ height: 20, width: 20 }} />
        </Button>
      </View>
      <CustomModal modalHeight={3000} visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Filters range={minMax} setModalVisible={setModalVisible} />
      </CustomModal>
      <GestureHandlerRootView style={{  ...styles.container, flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl style={{ marginTop: 35}} refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.cards}
        >
          {data.length > 0 ? (
            data.map((room, index) => <RoomCard key={index} room={room} />)
          ) : (
            <NoDataPage text="No data" />
          )}
        </ScrollView>
      </GestureHandlerRootView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: "100%",
  },
  header: {
    minWidth: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    backgroundColor: "#fff",
  },
  cards: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: "100%",
    gap: 5,
    padding: 10,
    paddingBottom: 64,
  },
});
