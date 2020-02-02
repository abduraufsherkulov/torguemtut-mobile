import React, { createContext, useRef, useState, useReducer, useEffect } from 'react'
import Toast, { DURATION } from 'react-native-easy-toast'
import { success, warning, error, loading } from '../assets/styles/styles';
import { toastReducer } from '../reducers/ToastReducer';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Animated, Easing, View, Text } from 'react-native';

export const ToastContext = createContext();


function ToastContextProvider(props) {

    const toastRef = React.createRef();
    const [rotateAnim, setRotateAnim] = useState(new Animated.Value(0))


    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    const [toaster, dispatch] = useReducer(toastReducer, {
        text: '', duration: 2000, style: loading, type: 'loading'
    })
    {/* <Animated.View
            style={{ transform: [{ rotate: spin }] }}><Ionicons name="ios-close" size={64} color="green" /></Animated.View> */}

    useEffect(() => {
        toastCaller()
    }, [toastRef])

    // useEffect(() => {
    //     startAnimation()
    // }, [])

    function startAnimation() {
        rotateAnim.setValue(0)
        Animated.timing(
            rotateAnim,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start(() => {
            startAnimation()
        })
    }

    function toastCaller() {
        if (toaster.type == 'loading') {
            toastRef.current.show(
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Animated.View style={{ transform: [{ rotate: spin }], width: 30 }}>
                        <AntDesign name="loading2" size={32} color="green" />
                    </Animated.View>
                    <Text>{"   "}{toaster.text}</Text>
                </View>, toaster.duration);
            startAnimation()
        } else if (toaster.type == 'finished') {
            toastRef.current.close();
        } else if (toaster.type == 'success') {
            toastRef.current.show(
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 30 }}>
                        <Ionicons name="ios-checkmark-circle" size={32} color="green" />
                    </View>
                    <Text>{"   "}{toaster.text}</Text>
                </View>, toaster.duration);
        } else if (toaster.type == 'error') {
            toastRef.current.show(
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 30 }}>
                        <Ionicons name="ios-close-circle" size={32} color="red" />
                    </View>
                    <Text>{"   "}{toaster.text}</Text>
                </View>, toaster.duration);
        }
    }
    return (
        <ToastContext.Provider value={{ toastRef, dispatch }}>
            <ToastComponent containerStyle={toaster.style.container} textStyle={toaster.style.text} ref={toastRef} />
            {props.children}
        </ToastContext.Provider>
    )
}

export const ToastComponent = React.forwardRef((props, ref) => (
    <Toast ref={ref}
        style={props.containerStyle}
        position='top'
        positionValue={50}
        fadeInDuration={1}
        fadeOutDuration={1}
        opacity={0.8}
        textStyle={props.textStyle} />
));

export default ToastContextProvider
