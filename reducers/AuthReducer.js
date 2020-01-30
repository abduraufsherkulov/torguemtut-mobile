import { _retrieveData, _removeData, _storeData } from "../assets/helpers/AssetsCaching";

export const authReducer = (state, action) => {
    console.log(state, action, 'authreducer');
    switch (action.type) {
        case 'SIGN_IN':
            _storeData('userData', action.userData);
            return JSON.parse(action.userData)
        case 'SIGN_OUT':
            _removeData('userData');
            return { userData: { token: null } }
        case 'USER_DATA':
            async () => {
                const data = await _retrieveData('userData');
                return JSON.parse(data);
            }
        case 'SIGN_UP':
            return
        case 'FB_LOGIN':
            return
        default:
            return
    }
}
