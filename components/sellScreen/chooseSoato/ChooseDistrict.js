import React, { Component, useEffect, useState, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function ChooseDistrict({ route, navigation }) {
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.label}
                // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
                button
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Sell', {
                        regionId: route.params.regionId,
                        districtId: item.parentId,
                        region: item.label,
                        district: route.params.title,
                    });
                }}
            />
        )
    }
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={route.params.data}
            renderItem={renderItem}
        />
    )
}

export default ChooseDistrict
