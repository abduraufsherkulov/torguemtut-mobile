import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function ChooseSubSubScreen({ route, navigation }) {

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item, index }) => {
        return item.children != null ? (
            <ListItem
                key={index}
                title={item.label}
                leftIcon={{ name: 'flight-takeoff' }}
                // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
                button
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('ListProducts', {
                        id: item.value,
                        title: item.label
                    });
                }}
                chevron
            />
        ) : (
                <ListItem
                    key={index}
                    title={item.label}
                    leftIcon={{ name: 'flight-takeoff' }}
                    // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                    bottomDivider
                    button
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('ListProducts', {
                            id: item.value,
                            title: item.label
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

export default ChooseSubSubScreen
