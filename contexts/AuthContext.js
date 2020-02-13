import React, { createContext, useReducer, useEffect } from 'react'
import { _retrieveData } from '../assets/helpers/AssetsCaching';
import { authReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [userData, dispatch] = useReducer(authReducer, { token: null })
    useEffect(() => {
        _retrieveData('userData').then((data) => {
            if (data) {
                console.log(data)
                dispatch({ type: 'INIT_LOAD', userData: data });
            }
        });
    }, []); // The empty array causes this effect to only run on mount
    return (
        <AuthContext.Provider value={{ userData, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
