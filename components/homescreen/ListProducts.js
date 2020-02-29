import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Button, Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { WishlistContext } from '../../contexts/WishlistContext';
import WishlistHelper from '../../assets/helpers/WishlistHelper';
import { ToastContext } from '../../contexts/ToastContext';
import SkeletonContent from "react-native-skeleton-content";
import moment from 'moment';
import 'moment/min/locales'
import { skeletItemHelper } from '../../assets/helpers/SkeletHelper';
moment.locale('ru')


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


function MainList({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([{
        images: [{ path: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }],
        price: { amount: 10000, currencyLabel: 'UZS' }
    }, {
        images: [{ path: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }],
        price: { amount: 10000, currencyLabel: 'UZS' }
    }, {
        images: [{ path: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }],
        price: { amount: 10000, currencyLabel: 'UZS' }
    }]);

    const { userData } = useContext(AuthContext);
    const { addWish, removeWish } = useContext(WishlistContext);
    const { dispatch } = useContext(ToastContext);
    let id = route.params.id;

    function momentize(date) {
        let today = new Date();
        let timeDiff = moment(today).diff(moment(date), 'hours');
        if (timeDiff < 24) {
            return moment(date).fromNow();
        }
        return moment().format('L');
    }

    const keyExtractor = (item, index) => index.toString()

    function wishIt() {
        if (userData.token) {
            if (props.favourite) {
                removeWish(props.item, props.listData, props.setListData);
            } else {
                addWish(props.item, props.listData, props.setListData);
            }
        } else {
            navigation.navigate('SignIn')
        }
    }

    const renderItem = ({ item, index }) => (

        <ListItem
            key={index}
            title={
                <View style={{ flex: 1 }}>
                    <View><Text>{item.title}</Text></View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Image
                                PlaceholderContent={<ActivityIndicator />} style={{ width: '90%', height: 150 }} source={{ uri: `https://ttuz.azurewebsites.net/Resources/Images/${item.images[0].path}` }} />

                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text>{item.price.amount} {item.price.currencyLabel}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 0.8 }}><Text><Ionicons name="ios-clock" size={18} color="green" />  {momentize(item.updatedDate)}</Text></View>
                        <View style={{ flex: 0.2, alignItems: 'flex-end' }}><WishlistHelper navigation={navigation} setListData={setListData} listData={listData} item={item} favourite={item.favourite} /></View>
                    </View>
                </View>
            }
            // leftAvatar={{ containerStyle: { flex: 0.5, height: 100 }, rounded: false, title: item.title, source: { uri: `https://ttuz.azurewebsites.net/${item.images[0].path}` } }}
            // subtitle={<Text><Ionicons name="ios-clock" size={16} color="green" />   {momentize(item.updatedDate)}</Text>}
            // avatar={{ uri: `https://ttuz.azurewebsites.net/${item.images[0].path}` }}
            // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
            bottomDivider
            button
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Product', {
                    item: item,
                    id: item.id,
                    title: item.label
                });
            }}
        />
    )


    const renderItem2 = ({ item, index }, loading) => (
        <ListItem
            key={index}
            title={
                <View>
                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            width: SCREEN_WIDTH - 32,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                        isLoading={loading}
                        layout={
                            [
                                { key: "someId2", width: SCREEN_WIDTH - 32, height: 20, marginBottom: 6, },
                            ]}
                    />

                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            width: SCREEN_WIDTH - 32,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        isLoading={loading}
                        layout={
                            [{ key: "someId", width: SCREEN_WIDTH / 2 * 0.9 - 16, height: 150, marginBottom: 6 },
                            { key: "someId3", width: SCREEN_WIDTH / 2 * 0.9 - 16, height: 20, marginBottom: 6 },
                            ]}
                    />
                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            width: SCREEN_WIDTH,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                        isLoading={loading}
                        layout={
                            [
                                { key: "someOtherId", width: SCREEN_WIDTH / 2, height: 20, marginBottom: 6 },
                            ]}
                    />
                </View>
            }
            bottomDivider
        />
    )
    useEffect(() => {
        const abortController = new AbortController();
        const data = JSON.stringify({
            categoryId: id
        })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-all`;
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                dispatch({ type: 'finished' })
                setLoading(false);
                setListData(response.data);
            })
            .catch(error => {
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error.response, "error in categories");
            });

        return () => {
            abortController.abort();
        };
    }, [userData.token]);

    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={listData}
            renderItem={loading ? skeletItemHelper : renderItem}
        />
    )
}
export default MainList
