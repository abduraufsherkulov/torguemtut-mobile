import React, { useContext } from 'react'
import { Text, View, FlatList } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import UnAuthorizedNavigate from '../auth/UnAuthorizedNavigate';

function SellScreen({ navigation }) {
    const { userData } = useContext(AuthContext);
    return userData.token ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Добавить!</Text>
        </View>
    ) : (
            <UnAuthorizedNavigate navigation={navigation} />
        );
}

export default SellScreen
