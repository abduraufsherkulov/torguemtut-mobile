import React, { createContext } from 'react'

export const WishlistContext = createContext();

function WishlistContextProvider() {

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
                console.log(response, 'wishlist')
                dispatch({ type: 'INIT_WISHLIST', wishlist: response.data });
            }).catch(error => {
                console.log(error.response.status);
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatcher({ type: 'SIGN_IN' })
                }
            })
        }
    }, []);

    
    return (
        <WishlistContext.Provider value={{ wishlist, dispatch, addWish, removeWish }}>
            {props.children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider
