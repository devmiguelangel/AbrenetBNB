import React, { Component } from 'react';
import {
  Platform,
} from "react-native";
import { TabNavigator } from 'react-navigation';

import HomeStack from './products/HomeStack';
import UserStack from './user/UserStack';
import ReportStack from './reports/ReportStack';
import NotificationStack from './notifications/NotificationStack';

const App = TabNavigator({
  HomeStack: { screen: HomeStack },
  ReportStack: { screen: ReportStack },
  NotificationStack: { screen: NotificationStack },
  UserStack: { screen: UserStack },
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
    indicatorStyle: false,
    labelStyle: {
      marginTop: 0,
      fontSize: 10,
      ...Platform.select({
        'ios': {
          paddingBottom: 5,
        },
      }),
    },
    pressOpacity: 0.3,
    style: {
      backgroundColor: '#ffffff',
      borderTopWidth: 0,
    },
    tabStyle: {
      padding: 0,
      paddingTop: 2,
      paddingBottom: 0,
    },
  }
});

export default class AppStack extends Component {
  render() {
    return (
      <App />
    );
  }
}