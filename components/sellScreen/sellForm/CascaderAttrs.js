import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Button, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { pickerSelectStyles } from '../../../assets/styles/styles';

function CascaderAttrs({ navigation, route }) {
    const [currency, setCurrency] = useState("2")
    const [modalVisible, setModalVisible] = useState(false);
    const [cascaderLoading, setCascaderLoading] = useState(false);
    const [attr, setAttr] = useState([]);
    const [title, setTitle] = useState("Категории");
    let categoryId = route.params ? route.params.id : null;
    console.log(route.params)
    useEffect(() => {
        if (categoryId) {
            setTitle(`${route.params.first}/${route.params.second}/${route.params.title}`)
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
            <View style={{
                width: '95%', marginVertical: 5, marginRight: 'auto', marginLeft: 'auto'
            }}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => console.log(value)}
                    placeholder={{ label: item.label }}
                    items={item.attributeOptions}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="ios-arrow-down" size={24} color="gray" />;
                    }}
                />
            </View>
        )
    }

    function AttrInput({ item }) {
        return (
            <Input
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder={item.title}
            />
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
        <React.Fragment>
            <Button title={title} onPress={() => navigation.navigate('ChooseScreen')} />
            <Just />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        width: '100%'
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        fontFamily: 'regular',
        fontSize: 16,
    }
});

export default CascaderAttrs
