import React, { createContext, useRef, useState, useReducer, useEffect } from 'react'
import Toast, { DURATION } from 'react-native-easy-toast'
import { success, warning, error } from '../assets/styles/styles';
import { toastReducer } from '../reducers/ToastReducer';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing } from 'react-native';

export const ToastContext = createContext();


function ToastContextProvider(props) {

    const toastRef = React.createRef();
    const [rotateAnim, setRotateAnim] = useState(new Animated.Value(0))


    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    const [toaster, dispatch] = useReducer(toastReducer, {
        text: '', duration: 1, type: success
    })
    {/* <Animated.View
            style={{ transform: [{ rotate: spin }] }}><Ionicons name="ios-close" size={64} color="green" /></Animated.View> */}

    useEffect(() => {
        toastCaller()
    }, [toastRef])

    // useEffect(() => {
    //     'calling'
    //     startAnimation()
    // }, [])

    function startAnimation() {
        rotateAnim.setValue(0)
        Animated.timing(
            rotateAnim,
            {
                toValue: 1,
                duration: 800,
                easing: Easing.linear
            }
        ).start(() => {
            startAnimation()
        })
    }

    function toastCaller() {
        toastRef.current.show(toaster.text, toaster.duration);
    }
    return (
        <ToastContext.Provider value={{ toastRef, dispatch }}>
            <ToastComponent containerStyle={toaster.type.container} textStyle={toaster.type.text} ref={toastRef} />
            {props.children}
        </ToastContext.Provider>
    )
}

export const ToastComponent = React.forwardRef((props, ref) => (
    <Toast ref={ref}
        style={props.containerStyle}
        position='top'
        positionValue={50}
        fadeInDuration={750}
        fadeOutDuration={4000}
        opacity={0.8}
        textStyle={props.textStyle} />
));

export default ToastContextProvider
