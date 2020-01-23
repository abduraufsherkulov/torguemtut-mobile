import React, { createContext } from 'react'
import { _retrieveData } from '../assets/helpers/AssetsCaching';
import { authReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [userData, dispatch] = useReducer(authReducer, null, () => {
        const localData = _retrieveData('userData');
        return localData ? JSON.parse(localData) : { token: null };
    })
    return (
        <AuthContext.Provider value={{ userData, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
