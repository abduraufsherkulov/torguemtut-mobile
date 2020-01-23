import { _retrieveData, _removeData, _storeData } from "../assets/helpers/AssetsCaching";

export const authReducer = (state, action) => {
    // console.log(state);
    switch (action.type) {
        case 'SIGN_IN':
            if (_retrieveData('userData') !== null) {
                _removeData('userData');
                return { token: null };
            }
            _storeData('userData', action.userData);
            return JSON.parse(action.userData)
        case 'SIGN_UP':
            return
        case 'FB_LOGIN':
            return
        default:
            return
    }
}
