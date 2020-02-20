import React, { useState, useEffect, useContext } from 'react'
import { Button, Image, View, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


function ImageUpload() {
    const { userData } = useContext(AuthContext);
    const [image, setImage] = useState([{
        "uri": null,
    }, {
        "uri": null,
    }, {
        "uri": null,
    }, {
        "uri": null,
    }, {
        "uri": null,
    }, {
        "uri": null,
    }, {
        "uri": null,
    }, {
        "uri": null,
    }])

    useEffect(() => {
        getPermissionAsync();
        console.log('hi');
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
                console.log(response);
            }).catch(err => {
                console.log(err, 'in add photo')
            })
            image[index].uri = result.uri;
            // console.log(image)
            setImage([...image])
        }
    };
    console.log(userData.token)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Pick an image from camera roll"
                onPress={_pickImage}
            />
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <React.Fragment>
                        {image[index].uri ?
                            <Image key={index * Math.random()} source={{ uri: image[index].uri }} style={{ width: Dimensions.get('window').width / 4 - 10, height: 75, marginVertical: 2 }} /> :
                            <View key={index} style={{ width: Dimensions.get('window').width / 4 - 10, height: 75, backgroundColor: '#eaeaea', alignItems: 'center', marginVertical: 2 }}>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', paddingVertical: 12 }}
                                    onPress={() => _pickImage(index)}>
                                    <React.Fragment>
                                        <Ionicons name="ios-images" size={35} color="black" />
                                        <Text style={{ textAlign: 'center', fontSize: 10 }}>{index == 0 ? 'Добавить фото' : index + 1}</Text>
                                    </React.Fragment>
                                </TouchableOpacity>
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