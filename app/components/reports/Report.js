import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Report extends Component {
  static navigationOptions = {
    tabBarLabel: 'Reportes',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-stats" size={20} color={tintColor} />
    )
  }

  render() {
    return (
      <View>
        <Text>Report</Text>
      </View>
    )
  }
}