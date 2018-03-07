import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import ProductList from './ProductList';
import NavBarBottom from './NavBarBottom';

import { styles, images } from '@assets';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1e272e"
          barStyle="light-content"
        />

        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Seguros</Text>
            <Image style={styles.headerLogo} source={images.logo} />
          </View>
        </View>
        
        <ProductList />

        <NavBarBottom />
      </View>
    );
  }
}