import React, { useState } from 'react'
import { View, Picker, Modal, Text, TouchableHighlight, Alert, Button } from 'react-native'
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

function SellForm({ navigation }) {
    const [currency, setCurrency] = useState("2")
    const [modalVisible, setModalVisible] = useState(false);
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
                <Picker
                    selectedValue={1}
                    style={{ height: 50, width: "30%" }}
                    onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
                    <Picker.Item label="UZS" value="2" />
                    <Picker.Item label="USD" value="1" />
                </Picker>
            </View>
            <Button title="test" onPress={() => navigation.navigate('CategoryStackScreen')} />
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
        </View>
    )
}

export default SellForm
