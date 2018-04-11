import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Picker,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'underscore';

import PickerView from './../../../lib/PickerView';

import { styles } from '@assets';

export default class ProductDe extends Component {
  static navigationOptions = {
    title: 'Desgravamen',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#81C784',
    },
    headerTintColor: 'white',
  }

  constructor(props) {
    super(props);
    this.state = {
      coverage: '',
      coverageText: 'Tipo de cobertura...',
      coverages: [],
      amountRequested: '',
      currency: '',
      currencyText: 'Moneda...',
      currencies: [],
      term: '',
      typeTerm: '',
      typeTermText: 'Tipo de plazo...',
      typeTerms: [],
      creditProduct: '',
      creditProductText: 'Tipo de producto...',
      creditProducts: [],
    }
  }

  componentDidMount = () => {
    const coverages = [
      { 'value': 1, 'label': 'Individual', },
      { 'value': 2, 'label': 'Mancomunado (Afiliación al 100% para cada codeudor)', },
      { 'value': 4, 'label': 'Codeudor (Afiliación en porcentajes para cada codeudor)', },
    ];

    const currencies = [
      { 'value': 'BS', 'label': 'Bolivianos', },
      { 'value': 'USD', 'label': 'Dolares', },
    ];
    
    const typeTerms = [
      { 'value': "Y", 'label': "Años", },
      { 'value': "M", 'label': "Meses", },
      { 'value': "W", 'label': "Semanas", },
      { 'value': "D", 'label': "Días", },
    ];

    const creditProducts = [
      { 'value': "1", 'label': "Consumo", },
      { 'value': "2", 'label': "Comercial", },
      { 'value': "3", 'label': "Hipotecario de Vivienda, Vivienda Social o Automotor", },
      { 'value': "4", 'label': "Tarjetas", },
      { 'value': "5", 'label': "Otros", },
      { 'value': "7", 'label': "Asalariado 7x5", },
      { 'value': "8", 'label': "Línea Licitada", },
      { 'value': "9", 'label': "Línea no Licitada", },
    ];

    this.setState({
      coverages: coverages,
      currencies: currencies,
      typeTerms: typeTerms,
      creditProducts: creditProducts,
    });
  }
  

  handleCoverage = (itemValue) => {
    let c = _.first(_.filter(this.state.coverages, (coverage) => (coverage.value == itemValue)));
    
    this.setState({
      coverage: c.value,
      coverageText: c.label,
    });
  }
  
  handleCurrency = (itemValue) => {
    let c = _.first(_.filter(this.state.currencies, (currency) => (currency.value == itemValue)));
    
    this.setState({
      currency: c.value,
      currencyText: c.label,
    });
  }
  
  handleTypeTerm = (itemValue) => {
    let c = _.first(_.filter(this.state.typeTerms, (typeTerm) => (typeTerm.value == itemValue)));
    
    this.setState({
      typeTerm: c.value,
      typeTermText: c.label,
    });
  }
  
  handleCreditProduct = (itemValue) => {
    let c = _.first(_.filter(this.state.creditProducts, (creditProduct) => (creditProduct.value == itemValue)));
    
    this.setState({
      creditProduct: c.value,
      creditProductText: c.label,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.formTitle}>
          <Icon name="account-balance" size={13} color="#37474F" />
          <Text style={styles.formTitleText}>DATOS DEL PRESTAMO</Text>
        </View>

        <View style={styles.formView}>
          <View style={styles.formBox}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.pickerCoverage._handlePressOpen()}>
              <View style={styles.formGroup}>
                <Text style={styles.formText}>{this.state.coverageText}</Text>
                <View style={styles.formGroupIcon}>
                  <Icon name="keyboard-arrow-down" size={20} color="#37474F" />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <Picker
                  style={styles.formPicker}
                  selectedValue={this.state.coverage}
                  onValueChange={(itemValue, itemIndex) => this.setState({ coverage: itemValue })}>
                  <Picker.Item label={this.state.coverageText} value="" />
                  {
                    this.state.coverages.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                  }
                </Picker>
              </View>
            </View>
          )}
          </View>
        </View>

        <View style={styles.formView}>
          <View style={styles.formBox}>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formText}
                onChangeText={(amountRequested) => this.setState({ amountRequested })}
                value={this.state.amountRequested}
                keyboardType="numeric"
                placeholder="Monto solicitado"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.formBox}>
            <View style={styles.formBox}>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity activeOpacity={0.4} onPress={() => this.pickerCurrency._handlePressOpen()}>
                <View style={styles.formGroup}>
                  <Text style={styles.formText}>{this.state.currencyText}</Text>
                  <View style={styles.formGroupIcon}>
                    <Icon name="keyboard-arrow-down" size={20} color="#37474F" />
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.formBoxPicker}>
                <Picker
                  style={styles.formPicker}
                  selectedValue={this.state.currency}
                  onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}>
                  <Picker.Item label={this.state.currencyText} value="" />
                  {
                    this.state.currencies.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                  }
                </Picker>
              </View>
            )}
            </View>
          </View>
        </View>
        
        <View style={styles.formView}>
          <View style={styles.formBox}>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formText}
                onChangeText={(term) => this.setState({ term })}
                value={this.state.term}
                keyboardType="numeric"
                placeholder="Plazo del crédito"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.formBox}>
            <View style={styles.formBox}>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity activeOpacity={0.4} onPress={() => this.pickerTypeTerm._handlePressOpen()}>
                <View style={styles.formGroup}>
                  <Text style={styles.formText}>{this.state.typeTermText}</Text>
                  <View style={styles.formGroupIcon}>
                    <Icon name="keyboard-arrow-down" size={20} color="#37474F" />
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.formBoxPicker}>
                <Picker
                  style={styles.formPicker}
                  selectedValue={this.state.typeTerm}
                  onValueChange={(itemValue, itemIndex) => this.setState({ typeTerm: itemValue })}>
                  <Picker.Item label={this.state.typeTermText} value="" />
                  {
                    this.state.typeTerms.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                  }
                </Picker>
              </View>
            )}
            </View>
          </View>
        </View>

        <View style={styles.formView}>
          <View style={styles.formBox}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.pickerCreditProduct._handlePressOpen()}>
              <View style={styles.formGroup}>
                <Text style={styles.formText}>{this.state.creditProductText}</Text>
                <View style={styles.formGroupIcon}>
                  <Icon name="keyboard-arrow-down" size={20} color="#37474F" />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.formGroup}>
              <View style={styles.formBox}>
                <Picker
                  style={styles.formPicker}
                  selectedValue={this.state.creditProduct}
                  onValueChange={(itemValue, itemIndex) => this.setState({ creditProduct: itemValue })}>
                  <Picker.Item label={this.state.creditProductText} value="" />
                  {
                    this.state.creditProducts.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                  }
                </Picker>
              </View>
            </View>
          )}
          </View>
        </View>

        

        {Platform.OS === 'ios' && 
        <PickerView
          ref={(pickerCoverage) => { this.pickerCoverage = pickerCoverage; }}
          data={this.state.coverages}
          _handleValue={this.handleCoverage}
        />
        }
        
        {Platform.OS === 'ios' && 
        <PickerView
          ref={(pickerCurrency) => { this.pickerCurrency = pickerCurrency; }}
          data={this.state.currencies}
          _handleValue={this.handleCurrency}
        />
        }
        
        {Platform.OS === 'ios' && 
        <PickerView
          ref={(pickerTypeTerm) => { this.pickerTypeTerm = pickerTypeTerm; }}
          data={this.state.typeTerms}
          _handleValue={this.handleTypeTerm}
        />
        }
        
        {Platform.OS === 'ios' && 
        <PickerView
          ref={(pickerCreditProduct) => { this.pickerCreditProduct = pickerCreditProduct; }}
          data={this.state.creditProducts}
          _handleValue={this.handleCreditProduct}
        />
        }
        
      </View>
    )
  }
}