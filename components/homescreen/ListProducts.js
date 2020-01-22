import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales'
moment.locale('ru')


function MainList({ navigation, route }) {
    const [listData, setListData] = useState([{ images: [{ path: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }] }]);

    let id = route.params.id;

    console.log(id)
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
                    <View>
                        <Avatar size="xlarge" title={item.title} source={{ uri: `https://ttuz.azurewebsites.net/${item.images[0].path}` }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 0.5 }}><Text><Ionicons name="ios-clock" size={16} color="green" />{momentize(item.updatedDate)}</Text></View>
                        <View style={{ flex: 0.5 }}><Text><Ionicons name="ios-heart-empty" size={16} color="black" /></Text></View>
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
                navigation.navigate('MainSubScreen', {
                    itemId: index,
                    otherParam: 'anything you want here',
                });
            }}
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
                // Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
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
            keyExtractor={keyExtractor}
            data={listData}
            renderItem={renderItem}
        />
    )
}
export default MainList
