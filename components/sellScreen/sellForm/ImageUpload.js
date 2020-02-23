import React, { useState, useEffect, useContext } from 'react'
import { Animated, Easing, Button, Image, View, Text, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
const AnimatableIcon = Animatable.createAnimatableComponent(AntDesign);


function ImageUpload({ image, setImage }) {
    const { userData } = useContext(AuthContext);


    useEffect(() => {
        getPermissionAsync();
    }, [])


    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const _pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            image[index].loading = true;
            setImage([...image])
            const endpoint = "https://ttuz.azurewebsites.net/api/news/upload-image";
            const data = new FormData();
            let name = result.uri.split("/");
            name = name[name.length - 1];
            let type = name.split(".");
            type = type[type.length - 1];
            type = `image/${type}`;
            data.append('image', { uri: result.uri, name: name, filename: name, type: type });
            data.append('Content-Type', type);
            axios({
                method: "post",
                url: endpoint,
                data: data,
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userData.token}`
                }
            }).then(response => {
                image[index].uri = result.uri;
                image[index].imageId = response.data.imageId;
                image[index].loading = false;
                setImage([...image])
            }).catch(err => {
                image[index].loading = false;
                setImage([...image])
                console.log(err, 'in add photo')
            })
        }
    };

    const handleDelete = (index, imageId) => {
        image[index].loading = true;
        const endpoint = `https://ttuz.azurewebsites.net/api/news/delete-image?imageId=${imageId}`;
        axios({
            method: "post",
            url: endpoint,
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.state) {
                image[index].uri = null;
                image[index].imageId = 0;
                image[index].loading = false;
                setImage([...image])
            }
        }).catch(err => {
            console.log(err.response, 'in add photo')
        })
    }

    const handleConfirm = (index, imageId) => {
        Alert.alert(
            'Вы реально хотите удалить?',
            'Подумайте еще раз',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => handleDelete(index, imageId) },
            ],
            { cancelable: false },
        )
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <React.Fragment key={index}>
                        {image[index].uri ?
                            <TouchableOpacity onPress={() => handleConfirm(index, image[index].imageId)}>
                                <Image source={{ uri: image[index].uri }} style={{ width: Dimensions.get('window').width / 4 - 10, height: 75, marginVertical: 2 }} />
                            </TouchableOpacity>
                            :
                            <View style={{ width: Dimensions.get('window').width / 4 - 10, height: 75, backgroundColor: '#eaeaea', alignItems: 'center', marginVertical: 2 }}>
                                {!image[index].loading ?
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', paddingVertical: 12 }}
                                        onPress={() => _pickImage(index)}>
                                        <React.Fragment>
                                            <Ionicons name="ios-images" size={35} color="black" />
                                            <Text style={{ textAlign: 'center', fontSize: 10 }}>{index == 0 ? 'Добавить фото' : index + 1}</Text>
                                        </React.Fragment>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <AnimatableIcon easing="linear" animation="rotate" useNativeDriver={true} iterationCount="infinite" name="loading2" size={32} color="green" />
                                    </View>
                                }
                            </View>
                        }
                    </React.Fragment>
                ))}
            </View>
        </View>

        // {image &&
        //     <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    );

}

export default ImageUpload