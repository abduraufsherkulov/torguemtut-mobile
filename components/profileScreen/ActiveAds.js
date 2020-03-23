import React, { Component, useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Image, Button, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { MyAdsContext } from '../../contexts/MyAdsContext';
import moment from 'moment';
import 'moment/min/locales'
import { AdsActiveContext } from '../../contexts/AdsActiveContext';
import { AdsArchiveContext } from '../../contexts/AdsArchiveContext';
import { AuthContext } from '../../contexts/AuthContext';
moment.locale('ru')

function MainList({ item, activeAds, setActiveAds }) {

    const [loading, setLoading] = useState(false);

    const { archiveAds, setArchiveAds } = useContext(AdsArchiveContext)
    const { userData } = useContext(AuthContext);

    function changeState(perItem) {
        setLoading(true);

        const endpoint = `https://tt.delivera.uz/api/news/change-status?Id=${perItem.id}&status=3`;

        axios({
            method: "post",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            console.log(response);
            let active = [...activeAds];
            setLoading(false);
            active = active.filter(each => each.id != perItem.id);
            setArchiveAds([...archiveAds, perItem]);
            setActiveAds(active);
        }).catch(response => {

        })
    }

    function momentize(date) {
        let today = new Date();
        let timeDiff = moment(today).diff(moment(date), 'hours');
        if (timeDiff < 24) {
            return moment(date).fromNow().lang("ru");
        }
        return moment().format('L');
    }

    return (
        <ListItem
            title={
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Image
                                PlaceholderContent={<ActivityIndicator />} style={{ width: '90%', height: 150 }} source={{ uri: `https://tt.delivera.uz/Resources/Images/${item.images[0].path}` }} />
                            {/* <Avatar size="xlarge" title={item.title} source={{ uri: `https://tt.delivera.uz/Resources/Images/${item.images[0].path}` }} /> */}
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text>{item.title}</Text>
                            <Text>{momentize(item.updatedDate)}</Text>
                            <Text>{item.price.amount} {item.price.currencyLabel}</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <View style={{ flex: 0.8, justifyContent: 'center' }}><Text><Ionicons name="ios-eye" size={18} color="green" /> Простмотры 125</Text></View>
                        {/* <View style={{ flex: 0.2, alignItems: 'flex-end' }}><WishlistHelper navigation={navigation} setListData={setListData} listData={listData} item={item} favourite={item.favourite} /></View> */}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button titleStyle={{ fontFamily: 'regular', fontSize: 15 }} buttonStyle={{ backgroundColor: '#388E3C' }} title="Поднять" />
                        <Button titleStyle={{ fontFamily: 'regular', fontSize: 15 }} title="Статистика" />
                        <Button loading={loading} onPress={() => changeState(item)} titleStyle={{ fontFamily: 'regular', fontSize: 15 }} buttonStyle={{ backgroundColor: '#D32F2F' }} title="Архивировать" />
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
    )
}


function ActiveAds({ navigation }) {
    const { activeAds, setActiveAds } = useContext(AdsActiveContext)

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => {
        return (
            <MainList key={index} item={item} index={index} activeAds={activeAds} setActiveAds={setActiveAds} />
        )
    }
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={activeAds}
            renderItem={renderItem}
        />
    );
}

export default ActiveAds;