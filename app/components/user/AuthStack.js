import React, { Component } from 'react';
import {
  Platform,
  View,
} from "react-native";
import { StackNavigator } from 'react-navigation';

import SignInView from './SignInView';
import SignUpView from './SignUpView';

const Auth = StackNavigator(
  {
    SignInView: {
      screen: SignInView,
    },
    SignUpView: {
      screen: SignUpView,
    },
  },
  {
    initialRouteName: 'SignInView',
    headerMode: 'none',
  }
);

export default class AuthStack extends Component {
  render() {
    return <Auth />
  }
}