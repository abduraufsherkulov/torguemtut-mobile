import React, { useState, useEffect } from 'react'
import { View, Picker, Modal, Text, TouchableHighlight, Alert, Button, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

function CascaderAttrs({ navigation, route }) {
    const [currency, setCurrency] = useState("2")
    const [modalVisible, setModalVisible] = useState(false);
    const [cascaderLoading, setCascaderLoading] = useState(false);
    const [attr, setAttr] = useState([]);
    let categoryId = route.params ? route.params.id : null;

    useEffect(() => {
        if (categoryId) {
            setCascaderLoading(true);
            const endpoint = `https://ttuz.azurewebsites.net/api/category/get-category-attributes?Id=${route.params.id}`;
            axios({
                method: 'get',
                url: endpoint,
                headers: {
                    "content-type": "application/json"
                }
            }).then(response => {
                console.log(response.data)
                setCascaderLoading(false)
                setAttr(response.data);
            }).catch(error => {
                console.log(error)
            })
        }
    }, [categoryId])

    function AttrSelect({ item }) {
        return (
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={item.title}
                items={item.attributeOptions}
            />
        )
    }

    function AttrInput({ item }) {
        return (
            <Input placeholder={item.title} />
        )
    }


    const Just = () => {
        return (
            attr.map((item, index) => {
                if (item.attributeOptions.length > 0) {
                    return (
                        <AttrSelect item={item} key={item.name} />
                    )
                } else {
                    return (
                        <AttrInput item={item} key={item.name} />
                    )
                }
            })
        )
    }

    return (
        <View style={{ alignItems: 'center', marginBottom: 16, flex: 1, width: '100%' }}>
            <Button title="test" onPress={() => navigation.navigate('ChooseScreen')} />
            <Input
                containerStyle={{ width: '90%' }}
                rightIcon={
                    <Ionicons
                        name="ios-arrow-forward"
                        size={25}
                    />
                }
                // containerStyle={styles.inputContainerStyle}
                placeholder="Input with right icon"
            />
            <Just />
        </View>
    )
}

export default CascaderAttrs
