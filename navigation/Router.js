import React, { Component, useEffect, useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../components/homeScreen/MainScreen';
import MainSubScreen from '../components/homeScreen/MainSubScreen';
import MainSubSubScreen from '../components/homeScreen/MainSubSubScreen';
import ListProducts from '../components/homeScreen/ListProducts';
import FavouriteScreen from '../components/favouriteScreen/FavouriteScreen';
import SellScreen from '../components/sellScreen/SellScreen';
import TopProductsScreen from '../components/topProductsScreen/TopProductsScreen';
import ProfileScreen from '../components/profileScreen/ProfileScreen';
import { CategoryContext } from '../contexts/CategoryContext';
import Product from '../components/productScreen/Product';
import ProductLocation from '../components/productScreen/ProductLocation';
import Seller from '../components/sellerScreen/Seller';
import SellerNewProducts from '../components/sellerScreen/SellerAllProducts';
import EditProfile from '../components/profileScreen/EditProfile';
import ArchivedAds from '../components/profileScreen/ArchivedAds';
import ActiveAds from '../components/profileScreen/ActiveAds';
import ChooseScreen from '../components/sellScreen/chooseCategory/ChooseScreen';
import ChooseSubScreen from '../components/sellScreen/chooseCategory/ChooseSubScreen';
import ChooseSubSubScreen from '../components/sellScreen/chooseCategory/ChooseSubSubScreen';
import MainMapPart from '../components/sellScreen/sellForm/MainMapPart';
import WaitingAds from '../components/profileScreen/WaitingAds';
import Sign from '../components/auth/Sign';
import ChooseRegion from '../components/sellScreen/chooseSoato/ChooseRegion';
import ChooseDistrict from '../components/sellScreen/chooseSoato/ChooseDistrict';


const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const SellStack = createStackNavigator();
const CategoryStack = createStackNavigator();

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

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
    </ProfileStack.Navigator>)
}

function MainTab({ route }) {
  const routeName = route.state
    ?
    route.state.routes[route.state.index]
    :
    'Main';

  const router = routeName.state ? route.state.routes[route.state.index].state.index : routeName.state
  console.log(router)
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
      <Tab.Screen options={{ headerTitle: 'Мой профиль' }} name="Profile" component={ProfileScreen} />
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
          headerShown: route.state ? (route.state.index == 4 ? false : true) : true
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

      <MainStack.Screen
        name="ChooseScreen"
        component={ChooseScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="ChooseSubScreen"
        component={ChooseSubScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="ChooseSubSubScreen"
        component={ChooseSubSubScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />

      <MainStack.Screen
        name="ChooseRegion"
        component={ChooseRegion}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="ChooseDistrict"
        component={ChooseDistrict}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />

      <MainStack.Screen
        name="MainMapPart"
        component={MainMapPart}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          gestureEnabled: false,
        })} />


      <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="ActiveAds"
        component={ActiveAds}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="ArchivedAds"
        component={ArchivedAds}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
      <MainStack.Screen
        name="WaitingAds"
        component={WaitingAds}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />


    </MainStack.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <ModalStack.Navigator mode="modal" headerMode="none"
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }} >
        <ModalStack.Screen
          name="MainApp"
          component={MainApp} />
        <ModalStack.Screen
          name="Sign"
          component={Sign} />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
}
