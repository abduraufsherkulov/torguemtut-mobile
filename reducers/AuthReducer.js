import { _retrieveData, _removeData, _storeData } from "../assets/helpers/AssetsCaching";

export const authReducer = (state, action) => {
    // console.log(state, action, 'authreducer');
    switch (action.type) {
        case 'SIGN_IN':
            _storeData('userData', action.userData);
            return JSON.parse(action.userData)
        case 'SIGN_OUT':
            _removeData('userData');
            return { token: null };
        case 'INIT_LOAD':
            return JSON.parse(action.userData)
        case 'SIGN_UP':
            return
        case 'FB_LOGIN':
            return
        default:
            return
    }
}
