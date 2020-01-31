import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Rating, ListItem } from 'react-native-elements'

function ProductInfoSeller({ contactDetail }) {
    return (
        <ListItem
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
                source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' },
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
