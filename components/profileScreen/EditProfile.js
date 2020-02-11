import React, { useState, useContext } from 'react'
import { Button, Input } from 'react-native-elements'
import { View } from 'react-native'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext';
import { UserInfoContext } from '../../contexts/UserInfoContext';

function EditProfile({ navigation }) {
    const { userData } = useContext(AuthContext);
    const { userInfo, setterUserInfo } = useContext(UserInfoContext);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(userInfo.name);
    const [surname, setSurname] = useState(userInfo.surname)

    function handleSubmit(e) {
        setLoading(true)
        let info = { ...userInfo };
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
            if (response.data.status) {
                info.name = name;
                info.surname = surname;
                setterUserInfo(info)
                setLoading(false)
                navigation.goBack();
            }
        }).catch(error => {

        })
    }

    navigation.setOptions({
        headerTitle: 'Редактировать',
        headerRight: () => (
            <Button loading={loading} type="clear" onPress={handleSubmit} title={'Сохранить'} />
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
