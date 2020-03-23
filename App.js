import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import AppNavigator from './navigation/Router';
import CategoryContextProvider from './contexts/CategoryContext';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Font from 'expo-font';
import ToastContextProvider, { ToastContext } from './contexts/ToastContext';
import AuthContextProvider from './contexts/AuthContext';
import WishlistContextProvider from './contexts/WishlistContext';
import { enableScreens } from 'react-native-screens';
import UserInfoContextProvider from './contexts/UserInfoContext';
import MyAdsContextProvider from './contexts/MyAdsContext';
import loader from './assets/images/loader.gif'
import SoataContextProvider from './contexts/SoataContext';
import AdsActiveProvider from './contexts/AdsActiveContext';
import AdsArchiveProvider from './contexts/AdsArchiveContext';
import AdsWaitingProvider from './contexts/AdsWaitingContext';

enableScreens();

export default function App() {
  const [fontLoad, setFontLoad] = useState(false)

  async function loadFont() {
    await Font.loadAsync({
      'regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'bold': require('./assets/fonts/Roboto-Bold.ttf')
    });
    setFontLoad(true);
  }
  useEffect(() => {
    loadFont();
  }, [])

  return fontLoad ? (
    <CategoryContextProvider>
      <ToastContextProvider>
        <AuthContextProvider>
          <WishlistContextProvider>
            <UserInfoContextProvider>
              <MyAdsContextProvider>
                <AdsActiveProvider>
                  <AdsArchiveProvider>
                    <AdsWaitingProvider>
                      <SoataContextProvider>
                        <AppNavigator />
                      </SoataContextProvider>
                    </AdsWaitingProvider>
                  </AdsArchiveProvider>
                </AdsActiveProvider>
              </MyAdsContextProvider>
            </UserInfoContextProvider>
          </WishlistContextProvider>
        </AuthContextProvider>
      </ToastContextProvider>
    </CategoryContextProvider>
  ) :
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        style={{ width: 100, height: 100 }}
        source={loader}
      />
    </View>;
}
