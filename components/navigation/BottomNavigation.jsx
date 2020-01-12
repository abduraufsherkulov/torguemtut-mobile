import React from 'react';
import { View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


const Placeholder = ({ text }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{text}</Text>
  </View>
);

class A extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home!',
  };

  render() {
    return <Placeholder text="A!" />;
  }
}

class B extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings!',
  };

  render() {
    return <Placeholder text="B!" />;
  }
}

let HomeStack = createStackNavigator({ A });
let SettingsStack = createStackNavigator({ B });

const AppNavigator = createAppContainer(createBottomTabNavigator({
  HomeStack,
  SettingsStack,
}));

export default AppNavigator;
