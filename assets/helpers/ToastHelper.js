import React, { useContext } from 'react'
import { ToastContext } from '../../contexts/ToastContext'
import { success, warning, error } from '../styles/styles'



function ToastHelper() {
    const { toastRef, setToastContainerStyle, setToastTextStyle } = useContext(ToastContext);
    if (type == 'success') {
        setToastContainerStyle(success.container);
        setToastTextStyle(success.text)
    } else if (type == 'warning') {
        toastContainerStyle = warning.container;
        toastTextStyle = warning.text;
    } else if (type == 'error') {
        toastContainerStyle = error.container;
        toastTextStyle = error.text;
    }
    toastRef.current.show(text, duration);
}

export default ToastHelper
