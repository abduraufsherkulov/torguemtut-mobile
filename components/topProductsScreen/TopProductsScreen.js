import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Button, Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales'
import { AuthContext } from '../../contexts/AuthContext';
import { WishlistContext } from '../../contexts/WishlistContext';
import WishlistHelper from '../../assets/helpers/WishlistHelper';
import { ToastContext } from '../../contexts/ToastContext';
import { skeletItemHelper } from '../../assets/helpers/SkeletHelper';
moment.locale('ru')


function TopProductsScreen({ navigation, route }) {
    const [loading, setLoading] = useState(true)
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

    function momentize(date) {
        let today = new Date();
        let timeDiff = moment(today).diff(moment(date), 'hours');
        if (timeDiff < 24) {
            return moment(date).fromNow();
        }
        return moment().format('L');
    }

    const keyExtractor = (item, index) => index.toString()

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

    useEffect(() => {
        const abortController = new AbortController();
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-tariff";
        const data = JSON.stringify({
            Type: 1,
            pageSize: 30,
            // pageNumber: currentPage
        })
        axios({
            method: "post",
            data: data,
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response)
                setLoading(false)
                setListData(response.data)
            })
            .catch(error => {
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error, "error in categories");
            });
        return () => {
            abortController.abort();
        };
    }, [userData.token])
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={listData}
            renderItem={loading ? skeletItemHelper : renderItem}
        />
    )
}
export default TopProductsScreen
