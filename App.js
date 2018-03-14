import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import Home from './app/components/Home';
import User from './app/components/user/User';
import Report from './app/components/reports/Report';
import Notification from './app/components/notifications/Notification';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

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

export default App;