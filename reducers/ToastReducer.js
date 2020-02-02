import { success, warning, error, loading } from "../assets/styles/styles"

export const toastReducer = (state, action) => {
    // console.log(state, action);
    switch (action.type) {
        case 'success':
            return { text: action.value.text, duration: action.value.duration, style: success, type: 'success' };
        case 'warning':
            return
        case 'error':
            return
        case 'loading':
            return { text: action.value.text, duration: action.value.duration, style: loading, type: 'loading' };
        case 'finished':
            return { type: 'finished', style: loading, }
        default:
            return { text: action.value.text, duration: action.value.duration, style: success, type: 'success' }
    }
}
