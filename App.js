import React, { useRef, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppNavigator from './navigation/Router';
import CategoryContextProvider from './contexts/CategoryContext';
import Toast, { DURATION } from 'react-native-easy-toast'
import ToastContextProvider, { ToastContext } from './contexts/ToastContext';

export default function App() {
  return (
    <CategoryContextProvider>
      <ToastContextProvider>
        <AppNavigator />
      </ToastContextProvider>
    </CategoryContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
