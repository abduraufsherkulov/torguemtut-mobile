import React, { Component, useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Image, Button, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { MyAdsContext } from '../../contexts/MyAdsContext';
import moment from 'moment';
import 'moment/min/locales'
moment.locale('ru')


function WaitingAds({ navigation }) {
    const { myAds } = useContext(MyAdsContext)
    let active = myAds.filter(item => item.status == 1);
    const keyExtractor = (item, index) => index.toString()
    function momentize(date) {
        let today = new Date();
        let timeDiff = moment(today).diff(moment(date), 'hours');
        if (timeDiff < 24) {
            return moment(date).fromNow();
        }
        return moment().format('L');
    }
    navigation.setOptions({
        headerTitle: 'Редактировать',
        headerLeft: () => (
            <Button type="clear" onPress={() => navigation.navigate('Profile')} title={'Назад'} />
        ),
        // headerTitle: userInfo ? `${userInfo.name} ${userInfo.surname}` : 'Мой профиль'
    })
    const renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
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
                            <Button titleStyle={{ fontFamily: 'regular', fontSize: 15 }} buttonStyle={{ backgroundColor: '#D32F2F' }} title="Деактивировать" />
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
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={active}
            renderItem={renderItem}
        />
    );
}

export default WaitingAds;