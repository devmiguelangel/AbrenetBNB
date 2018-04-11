import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ReportStack extends Component {
  static navigationOptions = {
    tabBarLabel: 'Reportes',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-stats" size={25} color={tintColor} />
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