import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NotificationStack extends Component {
  static navigationOptions = {
    tabBarLabel: 'Notificaciones',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-notifications" size={25} color={tintColor} />
    )
  }

  render() {
    return (
      <View>
        <Text>Notification</Text>
      </View>
    )
  }
}