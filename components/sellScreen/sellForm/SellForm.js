import React, { useState, useEffect } from 'react'
import { View, Picker, Modal, Text, StyleSheet, Alert, Platform } from 'react-native'
import { Input, Button, Divider } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import IosPickerHelper from '../../../assets/helpers/IosPickerHelper';
import axios from 'axios';
import CascaderAttrs from './CascaderAttrs';
import ImageUpload from './ImageUpload';

function SellForm({ navigation, route }) {
    const [currency, setCurrency] = useState("2")
    return (
        <View style={{ alignItems: 'center', marginBottom: 16, flex: 1, width: '100%' }}>
            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <Input
                    placeholder="Заголовок"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                <CascaderAttrs navigation={navigation} route={route} />
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <Input
                        placeholder="Цена"
                        containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                    />
                    {/* {
                    Platform.OS === 'android' ? (
                        <Picker
                            selectedValue={1}
                            style={{ width: "30%" }}
                            onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
                            <Picker.Item label="UZS" value="2" />
                            <Picker.Item label="USD" value="1" />
                        </Picker>
                    ) : (
                            <Text>UZS</Text>
                        )
                } */}
                </View>
            </View>

            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <Input
                    placeholder="Описания"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    multiline={true}
                />
                <ImageUpload />
            </View>
            <Button title="submit" />
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        width: '100%',
        marginVertical: 5,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        fontFamily: 'regular',
        fontSize: 16,
    }
});



export default SellForm
