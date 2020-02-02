import React, { createContext, useReducer } from 'react'
import { _retrieveData } from '../assets/helpers/AssetsCaching';
import { authReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [userData, dispatch] = useReducer(authReducer, null, async () => {
        await _retrieveData('userData').then((data) => {
            console.log(data, 'returned')
            return data ? JSON.parse(data) : { userData: { token: null } };
        });
    })
    console.log(userData, 'userData')
    return (
        <AuthContext.Provider value={{ userData, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
