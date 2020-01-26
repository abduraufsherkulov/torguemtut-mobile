import React, { createContext, useRef } from 'react'
import Toast, { DURATION } from 'react-native-easy-toast'

export const ToastContext = createContext();

function ToastContextProvider(props) {
    // const [text, setText] = useState(initialState)
    const toastRef = React.createRef();
    const ok = {}
    return (
        <ToastContext.Provider value={{ toastRef, ok }}>
            <ToastComponent ref={toastRef} />
            {props.children}
        </ToastContext.Provider>
    )
}

export const ToastComponent = React.forwardRef((props, ref) => (
    <Toast ref={ref}
        style={{ backgroundColor: 'red' }}
        position='top'
        positionValue={0}
        fadeInDuration={750}
        fadeOutDuration={4000}
        opacity={0.8}
        textStyle={{ color: 'red' }} />
));

export default ToastContextProvider
