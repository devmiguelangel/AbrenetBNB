import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class UserStack extends Component {
  static navigationOptions = {
    tabBarLabel: 'Cuenta',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-person" size={25} color={tintColor} />
    )
  }

  render() {
    return (
      <View>
        <Text>User</Text>
      </View>
    )
  }
}