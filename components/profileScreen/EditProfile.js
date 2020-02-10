import React, { useState, useContext } from 'react'
import { Button, Input } from 'react-native-elements'
import { View } from 'react-native'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext';

function EditProfile({ navigation, route }) {
    const [name, setName] = useState(route.params.name);
    const [surname, setSurname] = useState(route.params.surname)
    const { userData } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault()

        const endpoint = "https://ttuz.azurewebsites.net/api/users/update-profile";

        const data = JSON.stringify({
            Name: name,
            Surname: surname
        });

        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            console.log(response.data);
        }).catch(error => {

        })
    }

    navigation.setOptions({
        headerRight: () => (
            <Button type="clear" onPress={handleSubmit} title={'Сохранить'} />
        ),
        // headerTitle: userInfo ? `${userInfo.name} ${userInfo.surname}` : 'Мой профиль'
    })
    return (
        <View style={{ flex: 1, margin: 20 }}>
            <Input
                placeholder='Имя'
                value={name}
                onChangeText={name => setName(name)}
            />
            <Input
                placeholder='Фамилия'
                value={surname}
                onChangeText={surname => setSurname(surname)}
            />
        </View>
    )
}

export default EditProfile
