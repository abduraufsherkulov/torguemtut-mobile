import React, { createContext, useRef, useState } from 'react'
import Toast, { DURATION } from 'react-native-easy-toast'
import { success, warning, error } from '../assets/styles/styles';

export const ToastContext = createContext();

function ToastContextProvider(props) {
    const toastRef = React.createRef();
    const [toastContainerStyle, setToastContainerStyle] = useState(success.container);
    const [toastTextStyle, setToastTextStyle] = useState(success.text)
    return (
        <ToastContext.Provider value={{ toastRef, setToastContainerStyle, setToastTextStyle }}>
            <ToastComponent containerStyle={toastContainerStyle} textStyle={toastTextStyle} ref={toastRef} />
            {props.children}
        </ToastContext.Provider>
    )
}

export const ToastComponent = React.forwardRef((props, ref) => (
    <Toast ref={ref}
        style={props.containerStyle}
        position='top'
        positionValue={0}
        fadeInDuration={750}
        fadeOutDuration={4000}
        opacity={0.8}
        textStyle={props.textStyle} />
));

export default ToastContextProvider
