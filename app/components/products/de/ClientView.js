import React, { Component } from "react";
import {
  View,
  Text,
} from 'react-native';

import { db } from '@utils';
import { styles } from '@assets';

export default class ClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Client</Text>
      </View>
    );
  }
}