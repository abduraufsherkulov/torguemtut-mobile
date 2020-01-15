import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


const Placeholder = ({ text }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{text}</Text>
  </View>
);

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Главная!',
  };

  render() {
    return <Placeholder text="Главная" />;
  }
}

class Favourites extends Component {
  static navigationOptions = {
    tabBarLabel: 'Избранные!',
  };

  render() {
    return <Placeholder text="Избранные" />;
  }
}


class Sell extends Component {
  static navigationOptions = {
    tabBarLabel: 'Продать!',
  };

  render() {
    return <Placeholder text="Продать" />;
  }
}


class Top extends Component {
  static navigationOptions = {
    tabBarLabel: 'Топ!',
  };

  render() {
    return <Placeholder text="Топ" />;
  }
}


class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Профиль!',
  };

  render() {
    return <Placeholder text="Профиль" />;
  }
}


let HomeStack = createStackNavigator({ Home });
let FavouriteStack = createStackNavigator({ Favourites });
let SellStack = createStackNavigator({ Sell });
let TopStack = createStackNavigator({ Top });
let ProfileStack = createStackNavigator({ Profile });

const AppNavigator = createAppContainer(createBottomTabNavigator(
  {
  HomeTab: {
      screen: HomeStack
  },
  FavouriteStack,
  SellStack,
  TopStack,
  ProfileStack
}));

export default AppNavigator;
