import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppNavigator from './navigation/Router';
import CategoryContextProvider from './contexts/CategoryContext';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Font from 'expo-font';
import ToastContextProvider, { ToastContext } from './contexts/ToastContext';

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
        <AppNavigator />
      </ToastContextProvider>
    </CategoryContextProvider>
  ) : <Text>loading</Text>;
}
