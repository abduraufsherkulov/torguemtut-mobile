import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Text } from 'react-native'
import ProductCarousel from './ProductCarousel'
import ProductDetails from './ProductDetails';
import axios from 'axios'
import ProductInfoSeller from './ProductInfoSeller';


function Product({ navigation, route }) {
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState([{}, {}, {}, {}]);

    useEffect(() => {
        const data = JSON.stringify({
            id: route.params.id
        })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-all`;
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                // Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setListData(response.data);
                setLoading(false)
            })
            .catch(error => {
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatcher({ type: 'SIGN_IN' })
                // }
                console.log(error.response, "error in categories");
            });
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {typeof listData[0].id !== 'undefined' ? (
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: 200 }}>
                            <ProductCarousel listImages={listData[0].images} />
                        </View>
                        <ProductDetails listData={listData[0]} />
                        <ProductInfoSeller contactDetail={listData[0].contactDetail} />
                    </ScrollView>
                ) : <Text>Loading</Text>}
            </View>
        </SafeAreaView>
    )
}



export default Product
