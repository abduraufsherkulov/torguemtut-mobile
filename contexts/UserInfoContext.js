import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext';
import axios from 'axios'

export const UserInfoContext = createContext();

function UserInfoContextProvider(props) {
    const { userData, dispatch } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const endpoint = `https://ttuz.azurewebsites.net/api/users/get-profile?userId=${userData.id}`;
        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.log(error);
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error.response, "error in categories");
            });
    }, [userData.token])

    function setterUserInfo(val) {
        console.log('log')
        setUserInfo(val)
    }

    return (
        <UserInfoContext.Provider value={{
            userInfo, setterUserInfo
        }}>
            {props.children}
        </UserInfoContext.Provider >
    )
}

export default UserInfoContextProvider
