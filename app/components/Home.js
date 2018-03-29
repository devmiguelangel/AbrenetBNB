import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductList from './ProductList';
import ProductDe from './products/de/ProductDe';

const HomeStack = StackNavigator({
  ProductList: {
    screen: ProductList
  },
  ProductDe: {
    screen: ProductDe
  },
}, {
  // headerMode: 'none',
});

export default class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Productos',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" size={20} color={tintColor} />
    )
  }

  render() {
    return (
      <HomeStack />
    );
  }
}