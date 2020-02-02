import React, { useState, useContext } from 'react'
import { WishlistContext } from '../../contexts/WishlistContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

function WishlistHelper({ navigation, item, listData, setListData }) {
    const { addWish, removeWish } = useContext(WishlistContext);
    const { userData } = useContext(AuthContext)
    const wishController = () => {
        if (!userData.token) {
            navigation.navigate('SignIn')
            // message.info('Пожалуйста, войдите, чтобы добавить', 2);
        } else {
            if (item.favourite) {
                removeWish(item, listData, setListData);
            } else {
                addWish(item, listData, setListData);
            }
        }
    }


    return (
        <Button type="clear" onPress={wishController} icon={item.favourite ? <Ionicons name="ios-heart" size={28} color="black" /> : <Ionicons name="ios-heart-empty" size={28} color="black" />} />
        // <Icon onClick={wishController} onMouseLeave={() => setHeartHover("outlined")} onMouseOver={() => setHeartHover("twoTone")} type="heart" theme={props.favourite ? "filled" : heartHover} />
    )
}

export default WishlistHelper;