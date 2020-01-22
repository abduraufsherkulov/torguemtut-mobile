
import React, { Component, useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../components/homeScreen/MainScreen';
import MainSubScreen from '../components/homeScreen/MainSubScreen';
import MainSubSubScreen from '../components/homeScreen/MainSubSubScreen';
import ListProducts from '../components/homeScreen/ListProducts';
import FavouriteScreen from '../components/favouriteScreen/FavouriteScreen';
import SellScreen from '../components/sellScreen/SellScreen';
import TopProductsScreen from '../components/topProductsScreen/TopProductsScreen';
import ProfileScreen from '../components/profileScreen/ProfileScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
    route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to the initial screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    'Main';

  switch (routeName) {
    case 'Main':
      return 'Главная';
    case 'Favourite':
      return 'Избранные';
    case 'Sell':
      return 'Добавить';
    case 'TopProducts':
      return 'Топ';
    case 'Profile':
      return 'Мой профиль';
  }
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'ios-heart' : 'ios-heart-empty';
          } else if (route.name === 'Sell') {
            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
          } else if (route.name === 'TopProducts') {
            iconName = focused ? 'ios-flash' : 'ios-flash';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}

      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen options={{ title: 'Главная' }} name="Main" component={MainScreen} />
      <Tab.Screen options={{ title: 'Избранные' }} name="Favourite" component={FavouriteScreen} />
      <Tab.Screen options={{ title: 'Добавить' }} name="Sell" component={SellScreen} />
      <Tab.Screen options={{ title: 'Топ' }} name="TopProducts" component={TopProductsScreen} />
      <Tab.Screen options={{ title: 'Мой профиль' }} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })} />
        <Stack.Screen
          name="MainSubScreen"
          component={MainSubScreen}
          options={({ route }) => ({
            title: route.params.title,
          })} />
        <Stack.Screen
          name="MainSubSubScreen"
          component={MainSubSubScreen}
          options={({ route }) => ({
            title: route.params.title,
          })} />
        <Stack.Screen
          name="ListProducts"
          component={ListProducts}
          options={({ route }) => ({
            title: route.params.title,
          })} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
