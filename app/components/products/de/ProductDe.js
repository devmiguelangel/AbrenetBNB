import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native';

export default class ProductDe extends Component {
  static navigationOptions = {
    title: 'Desgravamen',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#81C784',
    },
    headerTintColor: 'white'
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Desgravamen</Text>
      </View>
    )
  }
}