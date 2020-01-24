import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppNavigator from './navigation/Router';
import CategoryContextProvider from './contexts/CategoryContext';

export default function App() {
  return (
    <CategoryContextProvider>
      <AppNavigator />
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
