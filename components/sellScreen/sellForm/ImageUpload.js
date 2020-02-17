import React, { useState, useEffect, useContext } from 'react'
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';

function ImageUpload() {
    const { userData } = useContext(AuthContext);
    const [image, setImage] = useState(null)

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

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: true,
            base64: true,
            exif: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            const endpoint = "https://ttuz.azurewebsites.net/api/news/upload-image";
            const data = new FormData();
            data.append('image', result.uri);

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
                console.log(err)
            })
            setImage(result.uri)
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Pick an image from camera roll"
                onPress={_pickImage}
            />
            {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );

}

export default ImageUpload