import React, { createContext, useReducer } from 'react'
import { _retrieveData } from '../assets/helpers/AssetsCaching';
import { authReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [userData, dispatch] = useReducer(authReducer, null, async () => {
        const userData = await _retrieveData('userData');
        return userData ? JSON.parse(userData) : { userData: { token: null } };
    })
    return (
        <AuthContext.Provider value={{ userData, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
