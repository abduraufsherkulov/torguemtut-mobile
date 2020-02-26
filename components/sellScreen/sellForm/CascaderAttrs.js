import React, { useState, useEffect, useMemo } from 'react'
import { View, StyleSheet, Button, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { pickerSelectStyles } from '../../../assets/styles/styles';

function CascaderAttrs({ navigation, route, selectedAttr, setSelectedAttr }) {
    const [cascaderLoading, setCascaderLoading] = useState(false);
    const [attrHere, setAttrHere] = useState([])
    const [selectedAttrHere, setSelectedAttrHere] = useState([])
    const [title, setTitle] = useState("Категории");
    let categoryId = route.params ? route.params.id : null;
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
                setAttrHere(response.data)
                // setAttr(response.data);
            }).catch(error => {
                console.log(error)
            })
        }
    }, [categoryId])

    const handleSelectChange = (attributeId, value, name) => {
        console.log(value)
        let it = selectedAttrHere.find(x => x.name == name);
        console.log(it, 'it here')
        if (it) {
            let index = selectedAttrHere.findIndex(x => x.name == name);
            let c = [...selectedAttrHere];
            c[index].Value = value;
            setSelectedAttrHere([...c]);
        } else {
            setSelectedAttrHere([...selectedAttrHere, { AttributeId: attributeId, Value: value, name: name }])
        }
    }
    const AttrSelect = ({ item, index }) => {
        return (
            <View style={{
                width: '100%', marginVertical: 5, marginRight: 'auto', marginLeft: 'auto'
            }}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => handleSelectChange(item.id, value, item.name)}
                    // onOpen={() => handleOpen(item.id, '', item.name)}
                    placeholder={{ label: item.label }}
                    // value={selectedAttrHere[item.name] ? selectedAttrHere[item.name].Value : ''}
                    items={item.attributeOptions}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="ios-arrow-down" size={24} color="gray" />;
                    }}
                />
            </View>
        )
    }

    const AttrInput = ({ item, index }) => {
        return (
            <Input
                // onValueChange={(value, key) => handleSelectChange(item.attributeOptions[key].attributeId, value, item.name)}
                onChangeText={(value) => handleSelectChange(item.id, value, item.name)}
                // value={selectedAttrHere[item.name] ? selectedAttrHere[item.name].Value : ''}
                containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder={item.title}
            />
        )
    }


    const Just = () => {
        console.log('test')
        return (
            attrHere.map((item, index) => {
                if (item.attributeOptions.length > 0) {
                    return (
                        <AttrSelect index={index} attr={attrHere} item={item} key={item.name} />
                    )
                } else {
                    return (
                        <AttrInput index={index} attr={attrHere} item={item} key={item.name} />
                    )
                }
            })
        )
    }
    console.log(selectedAttrHere)
    const MemoizedValue = useMemo(() => Just, [attrHere]);
    return (
        <React.Fragment>
            <Button title={title} onPress={() => navigation.navigate('ChooseScreen')} />
            <MemoizedValue />
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
