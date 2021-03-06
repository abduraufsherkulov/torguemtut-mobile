import React, { useState, useEffect, useContext } from 'react'
import { View, Picker, Modal, Text, StyleSheet, Alert, Platform } from 'react-native'
import { Input, Button, Divider } from 'react-native-elements'
import axios from 'axios';
import CascaderAttrs from './CascaderAttrs';
import ImageUpload from './ImageUpload';
import AddMapPart from './AddMapPart';
import { AuthContext } from '../../../contexts/AuthContext';
import { MyAdsContext } from '../../../contexts/MyAdsContext';
import CascaderSoato from './CascaderSoato';

function SellForm({ navigation, route, userInfo }) {
    const { userData, dispatch } = useContext(AuthContext)
    const { myAds, setMyAds } = useContext(MyAdsContext);

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
    const [selectedAttr, setSelectedAttr] = useState([]);
    const [selectedSoato, setSelectedSoato] = useState([]);


    let categoryId = route.params ? route.params.id : null;

    useEffect(() => {
        setContactPerson(`${userInfo.name} ${userInfo.surname}`)
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
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
        if (selectedAttr.length == 0 || price == '' || description == '' || title == '') {
            console.log('please choose categories')
        }
        let images = [];

        image.map(i => {
            if (i.imageId > 0) {
                images.push(i.imageId)
            }
        })
        images = images.toString();
        const endpoint = "https://tt.delivera.uz/api/news/add";

        let position = {
            RegionId: selectedSoato[0],
            DistrictId: selectedSoato[1],
            Address: address,
            Longtitude: pinLocation.latitude,
            Latitude: pinLocation.longitude
        }

        let newAttr = [];
        let checkRequired = selectedAttr.filter(x => x.required == true);
        let checkUndefinded = checkRequired.filter(x => x.Value == '');
        console.log(selectedAttr)
        if (checkUndefinded.length > 0) {
            console.log('tick all');
            let showErrorMap = [...selectedAttr];
            showErrorMap.forEach((x, index) => {
                if (x.required == true && x.Value == '') {
                    showErrorMap[index].error = true;
                }
            });
            setSelectedAttr(showErrorMap);
            setLoading(false);
            return false
        }
        const data = JSON.stringify({
            NewsAttribute: selectedAttr,
            Title: title,
            CategoryId: categoryId,
            Price: {
                Amount: +price,
                Currency: 1,
                Exchange: false,
                Free: false,
                Negotiatable: true
            },
            Description: description,
            Location: position,
            ContactDetail: {
                Name: contactPerson,
                IsIndividual: true,
                Email: email,
                Phone: phone
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
            console.log(response.data);
            if (response.data.status) {
                setLoading(false);
                setMyAds([...myAds, response.data.data]);
                navigation.navigate('WaitingAds')
            }
        }).catch(error => {
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatch({ type: 'SIGN_IN' })
            }
            console.log(error.response)
        })
    };
    console.log(route)
    return (
        <View style={{ alignItems: 'center', marginBottom: 16, flex: 1, width: '100%' }}>
            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <Input
                    placeholder="Заголовок"
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    onChangeText={e => setTitle(e)}
                    value={title}
                />
                <CascaderAttrs selectedAttr={selectedAttr} setSelectedAttr={setSelectedAttr} navigation={navigation} route={route} />
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
                    onChangeText={desc => setDescription(desc)}
                />
                <ImageUpload image={image} setImage={setImage} />
            </View>
            <View style={{ backgroundColor: 'white', marginVertical: 4, paddingVertical: 10, width: '100%', paddingHorizontal: 10 }}>
                <CascaderSoato selectedSoato={selectedSoato} setSelectedSoato={setSelectedSoato} navigation={navigation} route={route} />
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
                    value={email}
                    containerStyle={{ paddingHorizontal: 0, padding: 0, margin: 0 }}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    onChangeText={e => setEmail(e)}
                />
                <Input
                    disabled={true}
                    value={phone}
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
            </View>
            <Button loading={loading} onPress={handleSubmit} title="Опубликовать" />
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
