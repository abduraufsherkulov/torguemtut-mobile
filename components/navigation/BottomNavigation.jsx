
import React, { Component, useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem } from 'react-native-elements';
import axios from 'axios';


const Stack = createStackNavigator();


function MainScreen() {
  const [category, setCategory] = useState([]);
  // https://ttuz.azurewebsites.net/api/category/get-all
  useEffect(() => {
    const endpoint = "https://ttuz.azurewebsites.net/api/category/get-with-children";
    axios({
      method: "get",
      url: endpoint
    })
      .then(response => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch(error => {
        console.log(error, "error in categories");
      });

  }, []);

  const list = [
    {
      title: 'Appointments',
      icon: 'av-timer'
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff'
    }
  ]
  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.title}
      leftIcon={{ name: item.icon }}
      bottomDivider
      chevron
    />
  )

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
  );
}

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
}

function FavouriteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Избранные!</Text>
    </View>
  );
}

function SellScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Добавить!</Text>
    </View>
  );
}

function TopProductsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Топ!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Мой профиль!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationNativeContainer>
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
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Sell" component={SellScreen} />
        <Tab.Screen name="TopProducts" component={TopProductsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
}
