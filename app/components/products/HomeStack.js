import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeListView from './HomeListView';
import DeCreateView from './de/CreateView';
import DeClientView from './de/ClientView';

const Home = StackNavigator(
  {
    HomeListView: {
      screen: HomeListView
    },
    DeCreateView: {
      screen: DeCreateView
    },
    DeClientView: {
      screen: DeClientView
    },
  },
  {
    initialRouteName: 'HomeListView',
    // headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? '#81C784' : '#FFFFFF',
        borderBottomWidth: 0.5,
        borderBottomColor: '#8e8e93',
      },
      headerTitleStyle: {
        fontWeight: '500',
        ...Platform.select({
          android: {
            color: 'white',
          }
        })
      },
    }
  }
);

export default class HomeStack extends Component {
  static navigationOptions = {
    tabBarLabel: 'Productos',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" size={25} color={tintColor} />
    ),
  }

  render() {
    return (
      <Home />
    );
  }
}