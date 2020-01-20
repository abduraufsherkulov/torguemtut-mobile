import React, { Component, useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

function MainScreen({ navigation }) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/category/get-with-children";
        axios({
            method: "get",
            url: endpoint
        })
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }, []);

    const list = [
        {
            title: 'Appointments',
            icon: 'av-timer'
        },
        {
            title: 'Trips',
            icon: 'flight-takeoff'
        }
    ]
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => (
        <ListItem
            key={index}
            title={item.label}
            leftIcon={{ name: 'flight-takeoff' }}
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

    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={category}
            renderItem={renderItem}
        />
    );
}

export default MainScreen;