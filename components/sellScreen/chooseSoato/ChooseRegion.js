import React, { Component, useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CategoryContext } from '../../../contexts/CategoryContext';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SoatoContext } from '../../../contexts/SoataContext';

function ChooseRegion({ navigation }) {


    const { category } = useContext(CategoryContext)
    const { soato } = useContext(SoatoContext)
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
                    navigation.navigate('ChooseDistrict', {
                        regionId: item.parentId,
                        data: soato[index].children,
                        title: item.label
                    });
                }}
                chevron
            />
        )
    }
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={soato}
            renderItem={renderItem}
        />
    );
}

export default ChooseRegion;