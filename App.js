import React, { Component } from 'react';
import {
  Platform,
  YellowBox,
  View,
  ActivityIndicator,
} from "react-native";
import { StackNavigator } from 'react-navigation';

import { firebaseAuth } from './app/components/firebase';

import AuthStack from './app/components/user/AuthStack';
import AppStack from './app/components/AppStack';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      loading: true,
    }
  }

  componentDidMount = () => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ signedIn: true });

        /* firebaseAuth.signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        }); */
      }

      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {
          this.state.loading ? (
            <ActivityIndicator size="small" color="#607D8B" style={{ flex: 1, backgroundColor: '#E0F2F1' }} />
          ) : (
            ! this.state.signedIn ? (
              <AuthStack />
            ) : (
              <AppStack />
            )
          )
        }
      </View>
    );
  }
}