import React, { useState, useEffect } from 'react'
import { View, Picker, Modal, Text, StyleSheet, Alert, Platform } from 'react-native'
import { Input, Button, Divider } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import IosPickerHelper from '../../../assets/helpers/IosPickerHelper';
import axios from 'axios';
import CascaderAttrs from './CascaderAttrs';
import ImageUpload from './ImageUpload';
import AddMapPart from './AddMapPart';

function SellForm({ navigation, route, userInfo }) {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [currency, setCurrency] = useState("2")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("");
    const [contactPerson, setContactPerson] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [telegram, setTelegram] = useState("")
    const [attr, setAttr] = useState([]);
    const [selectedAttr, setSelectedAttr] = useState({});

    let categoryId = route.params ? route.params.id : null;

    useEffect(() => {
        setContactPerson(`${userInfo.name} ${userInfo.surname}`)
    }, [userInfo])

    const [image, setImage] = useState([{
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }, {
        "imageId": 0,
        "uri": null,
        "loading": false,
    }])

    const [latlong, setlatlong] = useState({
        latitude: 41.311157,
        longitude: 69.279718,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    })
    const [pinLocation, setPinLocation] = useState({
        latitude: 41.311157,
        longitude: 69.279718
    })

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        let images = [];

        image.map(i => {
            if (i.imageId > 0) {
                images.push(i.imageId)
            }
        })
        images = images.toString();
        const endpoint = "https://ttuz.azurewebsites.net/api/news/add";

        let position = {
            RegionId: 1,
            DistrictId: 1,
            Address: address,
            Longtitude: pinLocation.latitude,
            Latitude: pinLocation.longitude
        }

        let newAttr = [];
        console.log(attr)
        return false;
        for (let i = 0; i < attr.length; i++) {
            newAttr.push({ AttributeId: attr[i].id, Value: attr[i].name in values ? (typeof values[attr[i].name] == "object" ? values[attr[i].name].key : values[attr[i].name]) : false })
        }
        const data = JSON.stringify({
            NewsAttribute: newAttr,
            Title: title,
            CategoryId: categoryId,
            Price: {
                Amount: price,
                Currency: +selectChange,
                Exchange: false,
                Free: false,
                Negotiatable: checked
            },
            Description: description,
            Location: position,
            ContactDetail: {
                Name: contactPerson,
                IsIndividual: true,
                Email: userData.email,
                Phone: userData.phone
            },
            Status: 1,
            ImageIds: images
        });

        axios({
            method: 'post',
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            console.log(response);
            if (response.data.status) {
                setActiveKey('waiting');
                setMyAds([...myAds, response.data.data]);
                props.history.push('/myads');
            }
        }).catch(error => {
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatch({ type: 'SIGN_IN' })
            }
            console.log(error.response)
        })
    };
    console.log(selectedAttr);
    return (
        <View style={{ alignItems: 'center', marginBottom: 16, flex: 1, width: '100%' }}>
            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <Input
                    placeholder="Заголовок"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                <CascaderAttrs selectedAttr={selectedAttr} setSelectedAttr={setSelectedAttr} attr={attr} setAttr={setAttr} navigation={navigation} route={route} />
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
                    onChangeText={pass => setPassword(pass)}
                />
                <ImageUpload image={image} setImage={setImage} />
            </View>
            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <Input
                    value={address}
                    disabled={true}
                    placeholder="Местоположения"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                <AddMapPart
                    setlatlong={setlatlong}
                    latlong={latlong}
                    setPinLocation={setPinLocation}
                    pinLocation={pinLocation}
                    address={address}
                    setAddress={setAddress}
                    navigation={navigation}
                    route={route} />
            </View>
            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <Input
                    value={contactPerson}
                    placeholder="Контактное лицо"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                <Input
                    placeholder="E-mail"
                    value={`${userInfo.email}`}
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                <Input
                    disabled={true}
                    value={`${userInfo.phone}`}
                    placeholder="Контакты"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                <Input
                    placeholder="Телеграм: @paveldurov"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                />
                {/* <ImageUpload /> */}
            </View>
            <Button onPress={handleSubmit} title="Опубликовать" />
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
