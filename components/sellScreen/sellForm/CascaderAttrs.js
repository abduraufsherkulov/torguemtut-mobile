import React, { useState, useEffect, useMemo } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Input, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { pickerSelectStyles, pickerSelectErrorStyles } from '../../../assets/styles/styles';

function CascaderAttrs({ navigation, route, selectedAttr, setSelectedAttr }) {
    const [cascaderLoading, setCascaderLoading] = useState(false);
    const [attrHere, setAttrHere] = useState([])
    const [title, setTitle] = useState("Категории");
    let categoryId = route.params ? route.params.id : null;
    useEffect(() => {
        if (categoryId) {
            setTitle(`${route.params.first}/${route.params.second}/${route.params.title}`)
            setCascaderLoading(true);
            const endpoint = `https://tt.delivera.uz/api/category/get-category-attributes?Id=${route.params.id}`;
            axios({
                method: 'get',
                url: endpoint,
                headers: {
                    "content-type": "application/json"
                }
            }).then(response => {
                console.log(response.data)
                setCascaderLoading(false)
                setAttrHere(response.data)
                let parsed = response.data.map(function (item) {
                    return {
                        AttributeId: item.id,
                        Value: '',
                        name: item.name,
                        required: item.required,
                        error: false
                    }
                })
                console.log(parsed)
                setSelectedAttr(parsed)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [categoryId])

    const handleSelectChange = (attributeId, value, name, required) => {
        console.log(attributeId, value, name)
        let test = selectedAttr.findIndex(x => x.name == name)
        console.log(test)
        if (test !== -1) {
            let k = [...selectedAttr];
            k[test].Value = value === undefined ? '' : value;
            k[test].error = false;
            // setSelectedAttrHere(k)
            setSelectedAttr(k)
        } else {
            // setSelectedAttrHere([...selectedAttr, { AttributeId: attributeId, Value: value, name: name, required: required, error: false }])
            setSelectedAttr([...selectedAttr, { AttributeId: attributeId, Value: value === undefined ? '' : value, name: name, required: required, error: false }])
        }
    }
    return (
        <React.Fragment>
            <Button loading={cascaderLoading} title={title} onPress={() => navigation.navigate('ChooseScreen')} />
            {/* <MemoizedValue /> */}
            {attrHere && selectedAttr.length > 0 && attrHere.map((item, index) => (
                item.attributeOptions.length > 0 ?
                    <View key={item.name} style={{
                        width: '100%', marginVertical: 5, marginRight: 'auto', marginLeft: 'auto'
                    }}>
                        <RNPickerSelect
                            style={selectedAttr.find(x => x.name == item.name).error ? pickerSelectErrorStyles : pickerSelectStyles}
                            onValueChange={(value) => handleSelectChange(item.id, value, item.name, item.required)}
                            // onOpen={() => handleOpen(item.id, '', item.name)}
                            placeholder={{ label: item.label }}
                            value={selectedAttr.find(x => x.name == item.name) ? selectedAttr.find(x => x.name == item.name).Value : ''}
                            items={item.attributeOptions}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <Ionicons name="ios-arrow-down" size={24} color="gray" />;
                            }}
                        />
                    </View>
                    :
                    <Input
                        key={item.name}
                        // onValueChange={(value, key) => handleSelectChange(item.attributeOptions[key].attributeId, value, item.name)}
                        onChangeText={(value) => handleSelectChange(item.id, value, item.name, item.required)}
                        value={selectedAttr.find(x => x.name == item.name) ? selectedAttr.find(x => x.name == item.name).Value : ''}
                        containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                        inputContainerStyle={selectedAttr.find(x => x.name == item.name).error ? styles.inputErrorContainer : styles.inputContainer}
                        inputStyle={selectedAttr.find(x => x.name == item.name).error ? styles.inputErrorStyle : styles.inputStyle}
                        placeholder={item.title}
                    />

            ))}

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
    },
    inputErrorContainer: {
        paddingLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        height: 45,
        width: '100%'
    },
    inputErrorStyle: {
        flex: 1,
        color: 'red',
        fontFamily: 'regular',
        fontSize: 16,
    }
});

export default CascaderAttrs
