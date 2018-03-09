import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';

import ProductList from './ProductList';
import ProductDe from './products/de/ProductDe';

const HomeApp = StackNavigator({
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
    tabBarLabel: 'Inicio',
    tabBarIcon: ({tintColor}) => (
      <Icons name="ios-home" size={20} color={tintColor} />
    )
  }

  render() {
    return (
      <HomeApp />
    );
  }
}