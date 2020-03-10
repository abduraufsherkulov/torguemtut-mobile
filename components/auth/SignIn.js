import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, StyleSheet, Image, Dimensions, SafeAreaView, Platform } from 'react-native';
import { Input, Text, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient';
import { PolifySafeArea } from '../../assets/styles/styles';
import logo from '../../assets/images/logo.png'
import { DURATION } from 'react-native-easy-toast'
import { ToastContext } from '../../contexts/ToastContext';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { _retrieveData, _storeData } from '../../assets/helpers/AssetsCaching';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function SignIn({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [formValid, setFormValid] = useState(true);
    const { dispatch } = useContext(ToastContext);
    const { userData, dispatch: authDispatch } = useContext(AuthContext);


    async function test() {
        console.log(await userData)
    }
    return (
        <SafeAreaView style={PolifySafeArea('#293046')}>
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: SCREEN_HEIGHT / 4 }}>
                    <Image style={{
                        height: 35,
                        width: 166,
                    }} source={logo} />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
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
    signInButtonText: {
        fontFamily: 'bold',
        fontSize: 13,
    },
    signInButton: {
        width: '70%',
        borderRadius: 20,
        height: 45,
        alignSelf: 'center'
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


export default SignIn
