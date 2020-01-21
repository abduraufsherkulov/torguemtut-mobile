import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';


function MainList({ navigation, route }) {
    const [listData, setListData] = useState([{ images: [{ path: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }] }]);

    let id = route.params.id;

    console.log(id)

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => (
        <ListItem
            key={index}
            title={item.title}
            roundAvatar
            leftAvatar={{ title: item.title, source: { uri: typeof (item.images[0]) !== 'undefined' ? `https://ttuz.azurewebsites.net/${item.images[0].path}` : "" } }}
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
            chevron
        />
    )

    useEffect(() => {
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
                console.log(response.data)
                setListData(response.data);
            })
            .catch(error => {
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error.response, "error in categories");
            });
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
