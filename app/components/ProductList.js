import React, { Component } from 'react';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles } from '@assets';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render () {
    const { products } = this.state;

    return (
      <ScrollView style={styles.productList}>
        <View style={styles.productRow}>
          <TouchableOpacity style={styles.productTouch} activeOpacity={0.5}>
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
    )
  }
}