import React, { useContext } from 'react'
import { Text, View, FlatList, Platform, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import UnAuthorizedNavigate from '../auth/UnAuthorizedNavigate';
import { PolifySafeArea } from '../../assets/styles/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SellForm from './sellForm/SellForm';

function SellScreen({ navigation, route }) {
    const { userData } = useContext(AuthContext);
    const { userInfo, setterUserInfo } = useContext(UserInfoContext);
    return userData.token ? (
        <ScrollView>
            <KeyboardAwareScrollView
                // style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
                enableOnAndroid={true}
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}
            >
                <SellForm userInfo={userInfo} setterUserInfo={setterUserInfo} navigation={navigation} route={route} />

            </KeyboardAwareScrollView>
        </ScrollView>
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
