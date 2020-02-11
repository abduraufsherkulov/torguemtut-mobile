import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext';

export const MyAdsContext = createContext();

function MyAdsContextProvider(props) {

    const { userData, dispatch } = useContext(AuthContext);
    const [myAds, setMyAds] = useState([]);

    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-user";
        axios({
            method: "post",
            url: endpoint,
            data: {},
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response.data[0])
                setMyAds(response.data);
            })
            .catch(error => {
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error, "error in myads");
            });
    }, [userData.token])
    return (
        <MyAdsContext.Provider value={{ myAds, setMyAds }}>
            {props.children}
        </MyAdsContext.Provider>
    )
}

export default MyAdsContextProvider
