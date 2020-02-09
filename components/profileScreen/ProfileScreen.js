import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, FlatList, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem, Button, Avatar, Image } from 'react-native-elements';
import { AuthContext } from '../../contexts/AuthContext';
import Constants from 'expo-constants';
import axios from 'axios'
import logo from '../../assets/images/tt.png'

function ProfileScreen({ navigation }) {
    const { userData, dispatch } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
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
                    console.log(response.data)
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
    console.log(userInfo)

    navigation.setOptions({
        headerRight: () => (
            <Button type="clear" onPress={() => console.log('clicked')} title={userData.token ? 'edit' : ''} />
        ),
        headerTitle: userInfo ? `${userInfo.name} ${userInfo.surname}` : 'Мой профиль'
    })
    return (
        <ScrollView>
            {userInfo ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{
                            uri:
                                'https://img.icons8.com/cotton/2x/person-male.png',
                        }}
                    />
                    <View style={{ backgroundColor: '#0098d0', marginTop: 5, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Ваш счет: {userInfo.balance} Сум</Text>
                    </View>
                </View>
            ) : (
                    <View style={{ justifyContent: 'center', padding: 20 }}>
                        <Image
                            style={{
                                width: 44,
                                height: 35,
                                marginBottom: 20
                            }}
                            containerStyle={{ alignSelf: 'center' }}
                            PlaceholderContent={<ActivityIndicator />}
                            source={logo}
                        />
                        <Button title="Войти" style={{ width: '100%' }} onPress={() => navigation.navigate("SignIn")} />
                    </View>
                )}
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Мои объвления</Text>
            </View>
            <View style={styles.list}>
                <ListItem
                    title="Подать объвление"
                    bottomDivider
                    button
                    titleStyle={{ fontFamily: 'bold' }}
                    onPress={() => navigation.navigate('Sell')}
                />
                <ListItem
                    onPress={() => navigation.setOptions({ title: 'Updated!' })}
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
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Настройки"
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Обратная звязь"
                    chevron
                    bottomDivider
                    button
                />
                <ListItem
                    title="Условия использования"
                    chevron
                    bottomDivider
                    button
                />
            </View>
            {userData.token && userInfo ? (
                <React.Fragment>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Вы вошли как</Text>
                        <Text>{userInfo.name} {userInfo.surname}</Text>
                    </View>

                    <ListItem
                        titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                        title="Выйти"
                        bottomDivider
                        button
                        onPress={() => dispatch({ type: 'SIGN_OUT' })}
                    />
                </React.Fragment>
            ) : null}
            <View style={styles.firstRow}>
                <Image style={{
                    alignSelf: 'center',
                    width: 44,
                    height: 35,
                }} source={logo} />
                <Text> версия {Constants.manifest.version}</Text>
            </View>
            <View style={styles.secondRow}>
                <Text style={{ fontSize: 11, textAlign: 'center' }}>
                    Чтобы использовать это приложение необходимо принять условия Пользовательского соглашения.
                </Text>
            </View>
            <View style={styles.thirdRow}>
                <Text style={{ fontSize: 11, textAlign: 'center' }}>
                    tt.uz cохраняет за собой право собирать анонимную статистику об использовании приложения и действиях пользователей в нём.
                </Text>
            </View>
            <View style={styles.fourthRow}>
                <Text>
                    © tt.uz, Inc {new Date().getFullYear()}
                </Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#e7e8e9',
        paddingHorizontal: 10
    },
    heading: {
        color: '#738892',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    list: {
        borderColor: 'gray',
        backgroundColor: '#fff',
    },
    firstRow: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20
    },
    secondRow: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    thirdRow: {
        flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10
    },
    fourthRow: {
        flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: '#cac4c4',
    }
})

export default ProfileScreen
