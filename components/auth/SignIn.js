import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, ScrollView, Dimensions, SafeAreaView, Platform } from 'react-native';
import { Input, Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PolifySafeArea } from '../../assets/styles/styles';
import logo from '../../assets/images/logo.png'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function SignIn({ navigation }) {
    const [fontLoad, setFontLoad] = useState(false)


    async function loadFont() {
        await Font.loadAsync({
            'regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        });
        setFontLoad(true);
    }

    useEffect(() => {
        loadFont();
    }, [])

    return fontLoad ? (
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: SCREEN_HEIGHT/3 }}>
                    <Image style={{
                        height: 35,
                        width: 166,
                    }} source={logo} />
                </View>
                <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flex: 1, justifyContent: 'flex-start' }}>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        leftIcon={<Ionicons name="ios-clock" size={16} color="green" />}
                        inputStyle={styles.inputStyle}
                        autoFocus={false}
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        errorStyle={styles.errorInputStyle}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        placeholder="Username"
                        returnKeyType="next"
                        placeholderTextColor="#7384B4"
                    />
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        leftIcon={<Ionicons name="ios-clock" size={16} color="green" />}
                        inputStyle={styles.inputStyle}
                        autoFocus={false}
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        errorStyle={styles.errorInputStyle}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        placeholder="Username"
                        returnKeyType="next"
                        placeholderTextColor="#7384B4"
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    ) : <Text>Loading</Text>
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
})


export default SignIn
