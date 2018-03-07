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
      products: [
        {
          name: 'Desgravamen',
          icon: 'home',
          color: '#81C784',
        },
        {
          name: 'Automotores',
          icon: 'directions-car',
          color: '#55C0E6',
        },
        {
          name: 'Todo Riesgo',
          icon: 'gavel',
          color: '#F96F57',
        },
        {
          name: 'Reportes',
          icon: 'assessment',
          color: '#FECD60',
        },
      ]
    }
  }

  render () {
    const { products } = this.state;

    return (
      <ScrollView style={styles.productList}>
        <View style={styles.productListBox}>
          {
            products.map((product, index) => {
              return (
                <TouchableOpacity activeOpacity={0.5} key={index}>
                  <View style={[styles.productBox, { backgroundColor: product.color }]}>
                    <View style={{ flex: 1 }}>
                      <Icon name={product.icon} size={60} color="white" />
                    </View>
                    <Text style={styles.productTitle}>
                      {product.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}