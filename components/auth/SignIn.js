import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    Animated,
    Keyboard
} from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const window = Dimensions.get('window');

const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width / 7;

let keyboardWillShowSub;
let keyboardWillHideSub;
function SignIn() {
    const [fontLoaded, setFontLoaded] = useState(false)

    const keyboardHeight = new Animated.Value(0);
    const imageHeight = new Animated.Value(IMAGE_HEIGHT);
    async function loadFont() {
        await Font.loadAsync({
            'regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        });
        setFontLoaded(true);
    }
    useEffect(() => {
        loadFont();

        keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
        keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

        return () => {
            keyboardWillShowSub.remove();
            keyboardWillHideSub.remove();
        };
    }, [])

    const keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            }),
            Animated.timing(imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL,
            }),
        ]).start();
    };

    const keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT,
            }),
        ]).start();
    };
    return fontLoaded ? (

        <Animated.View style={[styles.container, { paddingBottom: keyboardHeight }]}>
            <Input
                leftIcon={
                    <Ionicons name="ios-clock" size={18} color="green" />
                }
                placeholder='BASIC INPUT'
                inputContainerStyle={styles.inputContainer}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholderTextColor="#7384B4"
                inputStyle={styles.inputStyle}
                returnKeyType="go"
            />
            <Input
                placeholder='INPUT WITH CUSTOM ICON'
                leftIcon={
                    <Ionicons name="ios-clock" size={18} color="green" />
                }
            />
            <Input
                placeholder='INPUT WITH ERROR MESSAGE'
                errorStyle={{ color: 'red' }}
                errorMessage='ENTER A VALID ERROR HERE'
            />
        </Animated.View>
    ) : <Text>loading</Text>
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4c69a5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
        // paddingVertical: 5,
        // paddingHorizontal: 15,
        width: window.width - 30,
    },
    logo: {
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',
        marginBottom: 20,
        padding: 10,
        marginTop: 20
    },
    register: {
        marginBottom: 20,
        width: window.width - 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#ffae',
    }
});
export default SignIn