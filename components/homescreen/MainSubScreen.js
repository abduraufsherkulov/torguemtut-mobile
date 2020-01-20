import React from 'react';
import { Text, View, FlatList } from 'react-native';

function MainSubScreen({ route }) {
    console.log(route.params.itemId)
    return (
        <Text>
            {route.params.itemId}
        </Text>
    )
}

export default MainSubScreen
