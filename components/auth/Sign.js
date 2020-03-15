import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Image, Dimensions, SafeAreaView, Platform } from 'react-native';
import { Input, Text, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { DURATION } from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PolifySafeArea } from '../../assets/styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../../assets/images/logo.png'
import axios from 'axios'
import { ToastContext } from '../../contexts/ToastContext';
import { AuthContext } from '../../contexts/AuthContext';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function Sign({ navigation }) {


    const { dispatch } = useContext(ToastContext);
    const { userData, dispatch: authDispatch } = useContext(AuthContext);

    const [loading, setLoading] = useState(false)
    const [referral, setReferral] = useState("");
    const [password, setPassword] = useState("")
    const [passConfirm, setPassConfirm] = useState("")
    const [upEmail, setUpEmail] = useState("")
    const [emailValid, setEmailValid] = useState(true)
    const [passValid, setPassValid] = useState(true)
    const [confirmSide, setConfirmSide] = useState(false)
    const [confirmCode, setConfirmCode] = useState("")
    const [codeValid, setCodeValid] = useState(true)
    const [register, setRegister] = useState(false)

    const [signPhone, setSignPhone] = useState('');
    const [signPassword, setSignPassword] = useState('');
    const [signFormValid, setSignFormValid] = useState(true);


    function handleSubmit(e) {
        e.preventDefault();
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const eValid = re.test(upEmail);
        console.log(eValid)
        if (!eValid) {
            setEmailValid(false);
            return false;
        }
        if (password != passConfirm) {
            setPassValid(false)
            return false
        }
        setLoading(true)
        const isEmail = upEmail.includes('@') ? true : false;
        const endpoint = "https://tt.delivera.uz/api/users/register";
        const data = JSON.stringify({
            Phone: isEmail ? '' : upEmail,
            Password: password,
            IsEmail: isEmail,
            Email: isEmail ? upEmail : ""
        });

        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            setLoading(false)
            console.log(response)
            if (response.data.status) {
                setConfirmSide(true)
                setRegister(false)
            } else {
                setvalidateConfirmCode('error');
                setvalidateLoader('error');
                props.form.setFields({
                    password: {
                        value: values.password,
                        errors: [new Error(response.data.message)],
                    },
                });
            }
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })

    }



    function handleConfirmCode(e) {
        e.preventDefault();
        setLoading(true)
        const isEmail = upEmail.includes('@') ? true : false;
        const endpoint = "https://tt.delivera.uz/api/users/validate";
        const data = JSON.stringify({
            Phone: isEmail ? '' : upEmail,
            Code: confirmCode,
            IsEmail: isEmail,
            Email: isEmail ? upEmail : ""
        });

        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            setLoading(false)
            console.log(response)
            if (response.data.status) {
                dispatch({ type: 'loading', value: { text: response.data.userData.phone ? response.data.userData.phone : response.data.userData.email, duration: DURATION.FOREVER } })
                authDispatch({ type: 'SIGN_IN', userData: JSON.stringify(response.data.userData) })
                navigation.goBack();

            } else {
                setvalidateConfirmCode('error');
                setvalidateLoader('error');
                props.form.setFields({
                    password: {
                        value: values.password,
                        errors: [new Error(response.data.message)],
                    },
                });
            }
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })

    }


    function handleSignSubmit(e) {
        e.preventDefault();
        setLoading(true)
        const email = signPhone.includes('@') ? true : false;
        const endpoint = "https://tt.delivera.uz/api/users/authenticate";
        const data = JSON.stringify({
            Phone: email ? '' : signPhone,
            Password: signPassword,
            IsEmail: email,
            Email: email ? signPhone : ""
        });

        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data.status) {
                if (email) {
                    dispatch({ type: 'loading', value: { text: response.data.userData.phone, duration: DURATION.FOREVER } })
                    authDispatch({ type: 'SIGN_IN', userData: JSON.stringify(response.data.userData) })
                    navigation.goBack();
                } else {
                    dispatch({ type: 'loading', value: { text: response.data.userData.phone, duration: DURATION.FOREVER } })
                    authDispatch({ type: 'SIGN_IN', userData: JSON.stringify(response.data.userData) })
                    navigation.goBack();
                }
            } else {
                setvalidateConfirmCode('error');
                setvalidateLoader('error');
                props.form.setFields({
                    password: {
                        value: values.password,
                        errors: [new Error(response.data.message)],
                    },
                });
            }
        }).catch(error => {
            console.log(error)
            setFormValid(false)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!emailValid) {
            setEmailValid(true)
        }
        if (!passValid) {
            setPassValid(true)
        }
        if (!signFormValid) {
            setSignFormValid(true)
        }
    }, [upEmail, password, signPhone, signPassword])


    const mainForm = (
        <View style={{ width: '80%', height: SCREEN_HEIGHT, flex: 1, justifyContent: 'flex-start' }}>
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-contact" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Ваш e-mail"
                returnKeyType="next"
                placeholderTextColor="#7384B4"
                onChangeText={email => setUpEmail(email)}
                value={upEmail}
                errorMessage={
                    emailValid ? null : "Неверный формат имэйл"
                }
            />
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-finger-print" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Пароль"
                returnKeyType="next"
                placeholderTextColor="#7384B4"
                onChangeText={pass => setPassword(pass)}
                secureTextEntry={true}
            // errorMessage={
            //     emailValid ? null : "Неверный формат имэйл"
            // }
            />
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-finger-print" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Подтвердите Пароль"
                returnKeyType="next"
                placeholderTextColor="#7384B4"
                onChangeText={pass => setPassConfirm(pass)}
                secureTextEntry={true}
                errorMessage={
                    passValid ? null : "Пароли не совпадают"
                }
            />
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-git-branch" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Код рефералки"
                returnKeyType="next"
                placeholderTextColor="#7384B4"
                value={referral}
                onChangeText={pass => setReferral(pass)}
            />
            <Button
                loading={loading}
                title="ЗАРЕГИСТРИРОВАТЬСЯ"
                // containerStyle={{ alignSelf: 'center' }}
                buttonStyle={styles.signInButton}
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                ViewComponent={LinearGradient}
                titleStyle={styles.signUpButtonText}
                onPress={handleSubmit}
                disabled={loading}
            />
            <View style={styles.loginHereContainer}>
                <Text style={styles.alreadyAccountText}>
                    Уже есть аккаунт?
                </Text>
                <Button
                    title="Войти здесь"
                    titleStyle={styles.loginHereText}
                    containerStyle={{ flex: -1 }}
                    buttonStyle={{ backgroundColor: 'transparent' }}
                    underlayColor="transparent"
                    onPress={() => setRegister(false)}
                />
            </View>
        </View>
    )

    const confirmForm = (
        <View style={{ width: '80%', height: SCREEN_HEIGHT, flex: 1, justifyContent: 'flex-start' }}>
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-barcode" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Код верификации"
                returnKeyType="next"
                placeholderTextColor="#7384B4"
                onChangeText={code => setConfirmCode(code)}
                value={confirmCode}
                errorMessage={
                    codeValid ? null : "Неверный код"
                }
            />
            <Button
                loading={loading}
                title="ОТПРАВИТЬ"
                // containerStyle={{ alignSelf: 'center' }}
                buttonStyle={styles.signInButton}
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                ViewComponent={LinearGradient}
                titleStyle={styles.signUpButtonText}
                onPress={handleConfirmCode}
                disabled={loading}
            />
            <View style={styles.loginHereContainer}>
                <Button
                    title="Назад"
                    titleStyle={styles.loginHereText}
                    containerStyle={{ flex: -1 }}
                    buttonStyle={{ backgroundColor: 'transparent' }}
                    underlayColor="transparent"
                    onPress={() => {
                        setConfirmSide(false)
                        setRegister(true)
                    }}
                />
            </View>
        </View>
    )

    const signForm = (
        <View style={{ width: '80%', height: SCREEN_HEIGHT, flex: 1, justifyContent: 'flex-start' }}>
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-contact" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Ваш e-mail или телефон"
                returnKeyType="next"
                value={signPhone}
                placeholderTextColor="#7384B4"
                onChangeText={phone => setSignPhone(phone)}
            />
            <Input
                inputContainerStyle={styles.inputContainer}
                leftIcon={<Ionicons name="ios-finger-print" size={16} color="green" />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder="Пароль"
                returnKeyType="next"
                placeholderTextColor="#7384B4"
                secureTextEntry={true}
                onChangeText={pass => setSignPassword(pass)}
                errorMessage={
                    signFormValid ? null : "Имя пользователя или пароль неверны."
                }
            />
            <Button
                loading={loading}
                title="АВТОРИЗОВАТЬСЯ"
                buttonStyle={styles.signInButton}
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                ViewComponent={LinearGradient}
                titleStyle={styles.signUpButtonText}
                onPress={handleSignSubmit}
            />
            <View style={styles.signUpHereContainer}>
                <Text style={styles.newAccountText}>
                    Нет акаунта?
            </Text>
                <Button
                    title="Зарегистрироваться здесь"
                    titleStyle={styles.signUpHereText}
                    containerStyle={{ flex: -1 }}
                    buttonStyle={{ backgroundColor: 'transparent' }}
                    underlayColor="transparent"
                    onPress={() => setRegister(true)}
                />
            </View>
        </View>
    )
    return <SafeAreaView style={PolifySafeArea('#293046')}>
        <View>
            <Ionicons onPress={() => navigation.goBack()} name="ios-close" size={64} color="green" />
        </View>
        <KeyboardAwareScrollView
            // style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
            enableAutoAutomaticScroll={(Platform.OS === 'ios')}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: SCREEN_HEIGHT / 3 }}>
                <Image style={{
                    height: 35,
                    width: 166,
                }} source={logo} />
            </View>
            {register ? mainForm : confirmSide ? confirmForm : signForm}


        </KeyboardAwareScrollView>
    </SafeAreaView>
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#293046',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerScroll: {
        flex: 1,
        backgroundColor: '#293046',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        marginVertical: 10
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontFamily: 'regular',
        fontSize: 16,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#F44336',
    },
    signUpButtonText: {
        fontFamily: 'bold',
        fontSize: 13,
    },
    signInButton: {
        width: '70%',
        borderRadius: 50,
        height: 45,
        alignSelf: 'center'
    },
    loginHereContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    alreadyAccountText: {
        fontFamily: 'regular',
        fontSize: 12,
        color: 'white',
    },
    loginHereText: {
        color: '#FF9800',
        fontFamily: 'regular',
        fontSize: 12,
    },
    signUpHereContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    newAccountText: {
        fontFamily: 'regular',
        fontSize: 12,
        color: 'white',
    },
    signUpHereText: {
        color: '#FF9800',
        fontFamily: 'regular',
        fontSize: 12,
    },
})


export default Sign
