import React from 'react'
import { View, Button } from 'react-native';

function UnAuthorizedNavigate({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate('SignIn')} title="Войти" />
        </View>
    )
}

export default UnAuthorizedNavigate
