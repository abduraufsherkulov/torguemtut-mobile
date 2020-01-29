import { success, warning, error } from "../assets/styles/styles"

export const toastReducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'success':
            return { text: action.value.text, duration: action.value.duration, type: success };
        case 'warning':
            return
        case 'error':
            return
        default:
            return { text: action.value.text, duration: action.value.duration, type: success }
    }
}
