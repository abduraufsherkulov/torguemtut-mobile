
import React, { Component, useEffect, useState, useContext } from 'react';
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
import SignIn from '../components/auth/SignIn';
import { CategoryContext } from '../contexts/CategoryContext';
import Product from '../components/productScreen/Product';
import ProductLocation from '../components/productScreen/ProductLocation';
import Seller from '../components/sellerScreen/Seller';
import SellerNewProducts from '../components/sellerScreen/SellerAllProducts';


const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();
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

function MainApp() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainTab"
        component={MainTab}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="MainSubScreen"
        component={MainSubScreen}
        options={({ route }) => ({
          title: route.params.title,
        })} />
      <MainStack.Screen
        name="MainSubSubScreen"
        component={MainSubSubScreen}
        options={({ route }) => ({
          title: route.params.title,
        })} />
      <MainStack.Screen
        name="ListProducts"
        component={ListProducts}
        options={({ route }) => ({
          title: route.params.title,
        })} />
      <MainStack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({
          title: route.params.title,
        })} />
      <MainStack.Screen
        name="ProductLocation"
        component={ProductLocation}
        options={({ route }) => ({
          title: route.params.title,
        })} />
      <MainStack.Screen
        name="Seller"
        component={Seller}
        options={({ route }) => ({
          title: route.params.title,
        })} />
      <MainStack.Screen
        name="SellerNewProducts"
        component={SellerNewProducts}
        options={({ route }) => ({
          title: route.params.title,
        })} />
    </MainStack.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationNativeContainer>
      <ModalStack.Navigator mode="modal" headerMode="none">
        <ModalStack.Screen
          name="MainApp"
          component={MainApp} />
        <ModalStack.Screen
          name="SignIn"
          component={SignIn} />
      </ModalStack.Navigator>
    </NavigationNativeContainer>
  );
}
