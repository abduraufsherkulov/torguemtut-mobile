import React, { Component, useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { MyAdsContext } from '../../contexts/MyAdsContext';

function ActiveAds({ navigation }) {
    const { myAds } = useContext(MyAdsContext)
    let active = myAds.filter(item => item.status == 2);
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.title}
                // leftIcon={<Ionicons name={item.mobileIcon} size={32} />}
                // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    // navigation.navigate('MainSubScreen', {
                    //     data: category[index].children,
                    //     title: item.label,
                    // });
                }}
                chevron
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

export default ActiveAds;