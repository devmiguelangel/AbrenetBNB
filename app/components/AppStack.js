import React, { Component } from 'react';
import {
  Platform,
} from "react-native";
import { TabNavigator } from 'react-navigation';

import Home from './Home';
import User from './user/User';
import Report from './reports/Report';
import Notification from './notifications/Notification';

const App = TabNavigator({
  Home: { screen: Home },
  Report: { screen: Report },
  Notification: { screen: Notification },
  User: { screen: User },
}, {
  tabBarPosition: 'bottom',
  navigationOptions: {
    title: 'Seguros BNB',
  },
  tabBarOptions: {
    activeTintColor: '#4CAF50',
    inactiveTintColor: '#576574',
    upperCaseLabel: false,
    showIcon: true,
    labelStyle: {
      fontSize: 10,
      ...Platform.select({
        'ios': {
          paddingBottom: 5,
        }
      }),
    },
    pressOpacity: 0.3,
    style: {
      backgroundColor: '#f7f8ff',
    }
  }
});

export default class AppStack extends Component {
  render() {
    return (
      <App />
    );
  }
}