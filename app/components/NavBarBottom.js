import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles, images } from '@assets';

export default class NavBarBottom extends Component {
  render() {
    return (
      <View style={styles.navBarBottom}>
        <TouchableOpacity style={styles.navBarBottomBox} activeOpacity={0.4}>
          <View style={styles.navBarBottomView}>
            <Icon name="ios-home" size={20} color="#576574" />
            <Text style={styles.navBarBottomText}>Inicio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarBottomBox} activeOpacity={0.4}>
          <View style={styles.navBarBottomView}>
            <Icon name="ios-stats" size={20} color="#576574" />
            <Text style={styles.navBarBottomText}>Reportes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarBottomBox} activeOpacity={0.4}>
          <View style={styles.navBarBottomView}>
            <Icon name="ios-notifications" size={20} color="#576574" />
            <Text style={styles.navBarBottomText}>Notificaciones</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarBottomBox} activeOpacity={0.4}>
          <View style={styles.navBarBottomView}>
            <Icon name="ios-person" size={20} color="#576574" />
            <Text style={styles.navBarBottomText}>Cuenta</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
