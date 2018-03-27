import React, { Component } from 'react';

import {
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles, images } from '@assets';

export default class ProductList extends Component {
  static navigationOptions = {
    header: null,
  }

  handleProductDe () {
    this.props.navigation.navigate('ProductDe');
  }

  render () {
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

        <ScrollView style={styles.productList}>
          <View style={styles.productRow}>
            <TouchableOpacity style={styles.productTouch} activeOpacity={0.5} onPress={() => this.handleProductDe()}>
              <View style={[styles.productBox, { backgroundColor: '#81C784' }]}>
                <View style={styles.productIcon}>
                  <Icon name="home" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>Desgravamen</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.productTouch} activeOpacity={0.5}>
              <View style={[styles.productBox, { backgroundColor: '#55C0E6' }]}>
                <View style={styles.productIcon}>
                  <Icon name="directions-car" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>Automotores</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.productRow}>
            <TouchableOpacity style={styles.productTouch} activeOpacity={0.5}>
              <View style={[styles.productBox, { backgroundColor: '#F96F57' }]}>
                <View style={styles.productIcon}>
                  <Icon name="gavel" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>Todo Riesgo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.productTouch} activeOpacity={0.5}>
              <View style={[styles.productBox, { backgroundColor: '#FECD60' }]}>
                <View style={styles.productIcon}>
                  <Icon name="assessment" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>Reportes</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}