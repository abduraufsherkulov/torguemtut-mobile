import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales'
import { AuthContext } from '../../contexts/AuthContext';
moment.locale('ru')


function SellerProducts({ navigation, route }) {
    const [listData, setListData] = useState([{
        ownerDetails: { name: "Torguem", surname: 'tut' },
        images: [{ path: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }],
        price: { amount: 10000, currencyLabel: 'UZS' }
    }]);
    const { userData } = useContext(AuthContext);
    let ownerId = route.params.ownerId;

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
                            <Avatar size="xlarge" title={item.title} source={{ uri: `https://ttuz.azurewebsites.net/${item.images[0].path}` }} />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text>{item.price.amount} {item.price.currencyLabel}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 0.8 }}><Text><Ionicons name="ios-clock" size={18} color="green" />  {momentize(item.updatedDate)}</Text></View>
                        <View style={{ flex: 0.2, alignItems: 'flex-end' }}><Ionicons onPress={wishIt} name="ios-heart-empty" size={28} color="black" /></View>
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
                navigation.navigate('SellerNewProducts', {
                    item: item,
                    id: item.id,
                    title: item.label
                });
            }}
        />
    )

    useEffect(() => {
        const abortController = new AbortController();
        const data = JSON.stringify({
            ownerId: ownerId
        })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-all`;
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                // Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                // console.log(response.data[0])
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
    }, []);
    return (
        <FlatList
            ListHeaderComponent={
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                    <Text>{listData[0].ownerDetails.name} {listData[0].ownerDetails.surname}</Text>
                </View>}
            keyExtractor={keyExtractor}
            data={listData}
            renderItem={renderItem}
        />
    )
}
export default SellerProducts
