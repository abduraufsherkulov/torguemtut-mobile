import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function ProductDetails({ listData }) {
    return listData.title ? (
        <View>
            <View>
                <Text>{listData.price.amount} {listData.price.currencyLabel}</Text>
                <Text>{listData.title}</Text>
            </View>
            <View style={{ flex: 1, marginTop: 30 }}>
                <View style={styles.infoCategoryContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            {typeof listData.newsAttribute !== 'undefined' ? listData.newsAttribute.map((item, index) => (
                                <Text style={styles.infoTypeLabel}>{item.attributeInfo.title}</Text>
                            )) : null}

                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            {
                                typeof listData.newsAttribute !== 'undefined' ? listData.newsAttribute.map((item, index) => (
                                    <Text style={styles.infoAnswerLabel}>{item.value}</Text>
                                )) : null
                            }
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ flex: 1, marginTop: 30 }}>
                <Text style={styles.infoCategoryTitle}>Описание</Text>
                <View style={styles.infoCategoryContainer}>
                    <Text>{listData.description}</Text>
                </View>
            </View>
        </View>
    ) : <Text>Loading</Text>
}

const styles = StyleSheet.create({
    infoTypeLabel: {
        fontSize: 15,
        textAlign: 'right',
        color: 'grey',
        fontFamily: 'regular',
        paddingBottom: 10,
    },
    infoAnswerLabel: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'regular',
        paddingBottom: 10,
    },
    infoCategoryTitle: {
        flex: 1,
        fontSize: 15,
        color: 'rgba(216, 121, 112, 1)',
        fontFamily: 'regular',
        marginLeft: 10
    },
    infoCategoryContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 10,
    }
})

export default ProductDetails
