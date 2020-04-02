import React, {
  Component,
  useEffect,
  useState,
  useContext,
  useRef
} from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import {
  ListItem,
  Avatar,
  Image,
  Button,
  Divider
} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { MyAdsContext } from "../../contexts/MyAdsContext";
import moment from "moment";
import "moment/min/locales";
import { AdsActiveContext } from "../../contexts/AdsActiveContext";
import { AdsArchiveContext } from "../../contexts/AdsArchiveContext";
import { AuthContext } from "../../contexts/AuthContext";
import { AdsWaitingContext } from "../../contexts/AdsWaitingContext";
moment.locale("ru");

function MainList({
  item,
  archiveAds,
  setArchiveAds,
  archivePagination,
  setArchivePagination
}) {
  const [loading, setLoading] = useState(false);

  const {
    waitingAds,
    setWaitingAds,
    pagination: waitingPagination,
    setPagination: setWaitingPagination
  } = useContext(AdsWaitingContext);
  const { userData } = useContext(AuthContext);

  function changeState(perItem) {
    setLoading(true);

    const endpoint = `https://tt.delivera.uz/api/news/change-status?Id=${perItem.id}&status=1`;
    console.log(endpoint);
    axios({
      method: "post",
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`
      }
    })
      .then(response => {
        console.log(response);
        let archive = [...archiveAds];
        setLoading(false);
        archive = archive.filter(each => each.id != perItem.id);
        setWaitingAds([...waitingAds, perItem]);
        console.log(archivePagination);
        setArchivePagination({
          ...archivePagination,
          TotalCount: archivePagination.TotalCount - 1
        });
        setWaitingPagination({
          ...waitingPagination,
          TotalCount: waitingPagination.TotalCount + 1
        });

        setArchiveAds(archive);
      })
      .catch(response => {});
  }

  function momentize(date) {
    let today = new Date();
    let timeDiff = moment(today).diff(moment(date), "hours");
    if (timeDiff < 24) {
      return moment(date)
        .fromNow()
        .lang("ru");
    }
    return moment().format("L");
  }

  return (
    <ListItem
      title={
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.5 }}>
              <Image
                PlaceholderContent={<ActivityIndicator />}
                style={{ width: "90%", height: 150 }}
                source={{
                  uri: `https://tt.delivera.uz/Resources/Images/${item.images[0].path}`
                }}
              />
              {/* <Avatar size="xlarge" title={item.title} source={{ uri: `https://tt.delivera.uz/Resources/Images/${item.images[0].path}` }} /> */}
            </View>
            <View style={{ flex: 0.5 }}>
              <Text>{item.title}</Text>
              <Text>{momentize(item.updatedDate)}</Text>
              <Text>
                {item.price.amount} {item.price.currencyLabel}
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 15
            }}
          >
            <View style={{ flex: 0.8, justifyContent: "center" }}>
              <Text>
                <Ionicons name="ios-eye" size={18} color="green" /> Простмотры
                125
              </Text>
            </View>
            {/* <View style={{ flex: 0.2, alignItems: 'flex-end' }}><WishlistHelper navigation={navigation} setListData={setListData} listData={listData} item={item} favourite={item.favourite} /></View> */}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Button
              titleStyle={{ fontFamily: "regular", fontSize: 15 }}
              buttonStyle={{ backgroundColor: "#388E3C" }}
              title="Поднять"
            />
            <Button
              titleStyle={{ fontFamily: "regular", fontSize: 15 }}
              title="Статистика"
            />
            <Button
              loading={loading}
              onPress={() => changeState(item)}
              titleStyle={{ fontFamily: "regular", fontSize: 15 }}
              buttonStyle={{ backgroundColor: "#D32F2F" }}
              title="Активировать"
            />
            {/* <View style={{ flex: 0.8 }}><Text><Ionicons name="ios-clock" size={18} color="green" />  {momentize(item.updatedDate)}</Text></View> */}
            {/* <View style={{ flex: 0.2, alignItems: 'flex-end' }}><WishlistHelper navigation={navigation} setListData={setListData} listData={listData} item={item} favourite={item.favourite} /></View> */}
          </View>
        </View>
      }
      // leftIcon={<Ionicons name={item.mobileIcon} size={32} />}
      // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        // navigation.navigate('MainSubScreen', {
        //     data: category[index].children,
        //     title: item.label,
        // });
      }}
      bottomDivider
      button
    />
  );
}

function ArchiveAds({ navigation }) {
  const {
    archiveAds,
    setArchiveAds,
    pagination: archivePagination,
    setPagination: setArchivePagination
  } = useContext(AdsArchiveContext);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item, index }) => {
    return (
      <MainList
        key={index}
        item={item}
        index={index}
        archiveAds={archiveAds}
        setArchiveAds={setArchiveAds}
        archivePagination={archivePagination}
        setArchivePagination={setArchivePagination}
      />
    );
  };
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={archiveAds}
      renderItem={renderItem}
    />
  );
}

export default ArchiveAds;
