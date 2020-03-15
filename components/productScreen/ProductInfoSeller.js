import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Rating, ListItem } from 'react-native-elements'

function ProductInfoSeller({ contactDetail, ownerId, navigation }) {
    return (
        <ListItem
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Seller', {
                    ownerId: ownerId,
                    title: ownerId
                });
            }}
            title={contactDetail.phone}
            subtitle={
                <View style={styles.subtitleView}>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={3}
                    // style={{ styles.rating }}
                    />
                    <Text style={styles.ratingText}>5 months ago</Text>
                </View>
            } leftAvatar={{
                source: { uri: 'https://img.icons8.com/cotton/2x/person-male.png' },
                showEditButton: true,
            }}
        />
    )
}
const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    ratingImage: {
        height: 19.21,
        width: 100,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
    }
})

export default ProductInfoSeller
