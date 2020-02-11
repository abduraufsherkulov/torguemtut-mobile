import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
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
                <AppNavigator />
              </MyAdsContextProvider>
            </UserInfoContextProvider>
          </WishlistContextProvider>
        </AuthContextProvider>
      </ToastContextProvider>
    </CategoryContextProvider>
  ) : <Text>loading</Text>;
}
