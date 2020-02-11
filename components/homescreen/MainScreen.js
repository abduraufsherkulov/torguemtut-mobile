import React, { Component, useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

function MainScreen({ navigation }) {

    const { category } = useContext(CategoryContext)
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => {
        return item.children.length > 0 ? (
            <ListItem
                key={index}
                title={item.label}
                leftIcon={<Ionicons name={item.mobileIcon} size={32} />}
                // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('MainSubScreen', {
                        data: category[index].children,
                        title: item.label,
                    });
                }}
                chevron
                bottomDivider
                button
            />
        ) : (
                <ListItem
                    key={index}
                    title={item.label}
                    leftIcon={<Ionicons name={item.mobileIcon} size={32} />}
                    // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                    bottomDivider
                    button
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('MainSubSubScreen', {
                            data: item.children,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            )
    }
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={category}
            renderItem={renderItem}
        />
    );
}

export default MainScreen;