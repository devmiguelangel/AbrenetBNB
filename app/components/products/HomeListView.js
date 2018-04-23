import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';

import { styles, images } from '@assets';

export default class HomeListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOpacity: 0.5,
      typeProduct: '',
      options: [],
    };
  }

  static navigationOptions = {
    header: null,
  }

  actionView = (text) => {
    const view = Platform.OS === 'android' ? (
      <View style={{ width: '100%', paddingHorizontal: 20, flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, color: '#546E7A', fontWeight: 'bold' }}>
          {text}
        </Text>
      </View>
    ) : text;

    return view;
  }

  handleProductOptions = (typeProduct) => {
    let options = [];
    
    if (typeProduct === 'product') {
      const actions = [ 
        'Cancelar',
        'Desgravamen',
        'Automotores',
        'Todo Riesgo',
      ];

      options = actions.map((value, index) => {
        return index !== 0 ? this.actionView(value) : value;
      });
    }

    this.setState({ options: options, typeProduct: typeProduct, }, () => {
      this.ActionSheet.show();
    });
  }

  handleProductActions = (index) => {
    const { typeProduct } = this.state;

    if (typeProduct === 'product') {
      switch (index) {
        case 1:
          this.props.navigation.navigate('DeCreateView');
          break;
      }
    }
  }

  render () {
    const { options } = this.state;

    return (
      <View style={styles.container}>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Emitir una póliza de...'}
          options={options}
          cancelButtonIndex={0}
          onPress={(index) => this.handleProductActions(index) }
        />
        
        <StatusBar
          backgroundColor="#37474F"
          barStyle="light-content"
        />

        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>SEGUROS</Text>
            <Image source={images.logo} style={styles.logoImage} />
          </View>
        </View>

        <ScrollView
          style={styles.productList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.productRow}>
            <TouchableOpacity
              style={styles.productTouch}
              activeOpacity={this.state.activeOpacity}
              onPress={() => this.handleProductOptions('product')}>
              <View style={[styles.productBox, { backgroundColor: '#81C784' }]}>
                <View style={styles.productIcon}>
                  <Icon name="dashboard" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>PRODUCTOS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.productTouch}
              activeOpacity={this.state.activeOpacity}>
              <View style={[styles.productBox, { backgroundColor: '#55C0E6' }]}>
                <View style={styles.productIcon}>
                  <Icon name="assessment" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>REPORTES</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productRow}>
            <TouchableOpacity
              style={styles.productTouch}
              activeOpacity={this.state.activeOpacity}>
              <View style={[styles.productBox, { backgroundColor: '#F96F57' }]}>
                <View style={styles.productIcon}>
                  <Icon name="cancel" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>ANULACIONES</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.productTouch}
              activeOpacity={this.state.activeOpacity}>
              <View style={[styles.productBox, { backgroundColor: '#FECD60' }]}>
                <View style={styles.productIcon}>
                  <Icon name="data-usage" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>OPERACIONES BAJO LÍNEA</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.productRow}>
            <TouchableOpacity
              style={styles.productTouch}
              activeOpacity={this.state.activeOpacity}>
              <View style={[styles.productBox, { backgroundColor: '#0288D1' }]}>
                <View style={styles.productIcon}>
                  <Icon name="create-new-folder" size={60} color="white" />
                </View>
                <Text style={styles.productTitle}>LINEAS DE CRÉDITO</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}