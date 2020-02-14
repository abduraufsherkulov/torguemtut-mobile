import React, { useContext } from 'react'
import { Text, View, FlatList, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import UnAuthorizedNavigate from '../auth/UnAuthorizedNavigate';
import { PolifySafeArea } from '../../assets/styles/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SellForm from './sellForm/SellForm';

function SellScreen({ navigation, route }) {
    const { userData } = useContext(AuthContext);
    return userData.token ? (
        <KeyboardAwareScrollView
            // style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
            enableAutoAutomaticScroll={(Platform.OS === 'ios')}
        >
            <SellForm navigation={navigation} route={route} />

        </KeyboardAwareScrollView>
    ) : (
            <UnAuthorizedNavigate navigation={navigation} />
        );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ebebec',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SellScreen
