import React, { createContext, useReducer, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { wishlistReducer } from '../reducers/WishlistReducer';
import { ToastContext } from './ToastContext';
import { DURATION } from 'react-native-easy-toast'

export const WishlistContext = createContext();

function WishlistContextProvider(props) {

    const { userData, dispatch: dispatcher } = useContext(AuthContext);

    const [{ wishlist }, dispatch] = useReducer(wishlistReducer, { wishlist: [] })
    const { dispatch: toastDispatch } = useContext(ToastContext)

    useEffect(() => {
        if (userData.token) {
            const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-favourites";
            axios({
                method: 'post',
                url: endpoint,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${userData.token}`
                }
            }).then(response => {
                dispatch({ type: 'INIT_WISHLIST', wishlist: response.data });
            }).catch(error => {
                console.log(error.response.status);
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatcher({ type: 'SIGN_IN' })
                // }
            })
        }
    }, [userData.token]);

    const addWish = (wish, listData, setListData) => {
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.id == wish.id);
        listData[selectedWish].favourite = true;
        setListData([...listData]);
        toastDispatch({ type: 'loading', value: { text: "Добавление в избранных...", duration: DURATION.FOREVER } })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/post-favourite?newsId=${wish.id}`;
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                toastDispatch({ type: 'success', value: { text: "Добавлено в избранные", duration: 2000 } })
                dispatch({ type: 'ADD_WISH', wishlist: wish });
            } else {
                listData[selectedWish].favourite = false;
                setListData([...listData]);
                toastDispatch({ type: 'error', value: { text: "Что то пошло не так", duration: 2000 } })
            }
        }).catch(error => {
            if (error.response.status == 401) {
                // message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
            }
            listData[selectedWish].favourite = false;
            setListData([...listData]);
            toastDispatch({ type: 'error', value: { text: "Что то пошло не так", duration: 2000 } })
        })
    }

    const removeWish = (wish, listData, setListData) => {
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.id == wish.id);
        listData[selectedWish].favourite = false;
        setListData([...listData]);
        toastDispatch({ type: 'loading', value: { text: "Удаление из избранных...", duration: DURATION.FOREVER } })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/delete-favourite?newsId=${wish.id}`;
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                toastDispatch({ type: 'success', value: { text: "Удалено из избранных", duration: 2000 } })
                dispatch({ type: 'REMOVE_WISH', wishlist: wish });
            } else {
                listData[selectedWish].favourite = true;
                setListData([...listData]);
                toastDispatch({ type: 'error', value: { text: "Что то пошло не так", duration: 2000 } })
            }
        }).catch(error => {
            if (error.response.status == 401) {
                // message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
            }
            listData[selectedWish].favourite = true;
            setListData([...listData]);
            toastDispatch({ type: 'error', value: { text: "Что то пошло не так", duration: 2000 } })
        })
    }
    console.log(wishlist)
    return (
        <WishlistContext.Provider value={{ wishlist, dispatch, addWish, removeWish }}>
            {props.children}
        </WishlistContext.Provider>
    )
}
export default WishlistContextProvider
