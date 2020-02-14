import React, { useState, useEffect } from 'react'
import { View, Picker, Modal, Text, TouchableHighlight, Alert, Button, Platform } from 'react-native'
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import IosPickerHelper from '../../../assets/helpers/IosPickerHelper';
import axios from 'axios';
import CascaderAttrs from './CascaderAttrs';

function SellForm({ navigation, route }) {
    const [currency, setCurrency] = useState("2")
    return (
        <View style={{ alignItems: 'center', marginBottom: 16, flex: 1, width: '100%' }}>
            <Input
                containerStyle={{ width: '90%' }}
                placeholder="Заголовок"
                labelStyle={{ marginTop: 16 }}
            />
            <Input
                containerStyle={{ width: '90%' }}
                placeholder="Категории"
                labelStyle={{ marginTop: 16 }}
            />
            <View style={{ width: '90%', flexDirection: 'row' }}>
                <Input
                    containerStyle={{ width: '70%' }}
                    placeholder="Цена"
                    labelStyle={{ marginTop: 16 }}
                />
                {
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
                }
            </View>
            <CascaderAttrs navigation={navigation} route={route} />
        </View>
    )
}

export default SellForm
