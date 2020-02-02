import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios'

const list1 = [
    {
        title: 'Appointments',
        icon: 'av-timer',
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff',
    }
];

function ProfileScreen() {
    const { userData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        console.log(userData)
        if (userData.token) {

            const endpoint = `https://ttuz.azurewebsites.net/api/users/get-profile?userId=${userData.id}`;
            axios({
                method: "post",
                url: endpoint,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${userData.token}`
                }
            })
                .then(response => {
                    console.log(response.data, 'vendorinfo')
                    setUserInfo(response.data);
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    // if (error.response.status == 401) {
                    //     message.info('Сессия истекла', 2);
                    //     dispatch({ type: 'SIGN_IN' })
                    // }
                    console.log(error.response, "error in categories");
                });
        }
    }, [userData.token])
    console.log(userData)
    return (
        <ScrollView>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Мои объвления</Text>
            </View>
            <View style={styles.list}>
                <ListItem
                    title="Подать объвление"
                    chevron
                    bottomDivider
                    button
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                />
                <ListItem
                    title="Проверенные"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Архивные"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Мой бизнес</Text>
            </View>
            <View style={styles.list}>
                <ListItem
                    title="Настройка бизнес-страницы"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Полезные ссылки</Text>
            </View>
            <View style={styles.list}>
                <ListItem
                    title="Оплата"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Настройки"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Помощь"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Обратная звязь"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Условия использования"
                    badge={{ value: 3, textStyle: { color: 'white' } }}
                    chevron
                    bottomDivider
                    button
                />
            </View>
            {userInfo ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Вы вошли как</Text>
                    <Text>{userInfo.name} {userInfo.surname}</Text>
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    list: {
        borderTopWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
    },
})

export default ProfileScreen
