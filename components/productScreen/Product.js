import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Text, Button, Dimensions } from 'react-native'
import ProductCarousel from './ProductCarousel'
import ProductDetails from './ProductDetails';
import axios from 'axios'
import ProductInfoSeller from './ProductInfoSeller';
import { skeletDescriptionHelper } from '../../assets/helpers/SkeletHelper';
import SkeletonContent from "react-native-skeleton-content";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


function Product({ navigation, route }) {
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState([{}, {}, {}, {}]);

    useEffect(() => {
        const abortController = new AbortController();
        const data = JSON.stringify({
            id: route.params.id
        })
        const endpoint = `https://tt.delivera.uz/api/news/get-all`;
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
        return () => {
            abortController.abort();
        };
    }, []);
    return (
        <React.Fragment>
            {typeof listData[0].id !== 'undefined' ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ height: 200 }}>
                                <ProductCarousel listImages={listData[0].images} />
                            </View>
                            <ProductDetails listData={listData[0]} />
                            <ProductInfoSeller navigation={navigation} contactDetail={listData[0].contactDetail} ownerId={listData[0].ownerId} />
                            <Button onPress={() => navigation.navigate('ProductLocation', {
                                title: 'Maps',
                                latitude: +listData[0].location.latitude,
                                longitude: +listData[0].location.longtitude
                            })} title="location" />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            ) : skeletDescriptionHelper}
        </React.Fragment>
    )
}



export default Product
