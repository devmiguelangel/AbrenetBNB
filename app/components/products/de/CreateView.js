import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'underscore';

import { PickerView } from '@libs';
import { db } from '@utils';
import { styles } from '@assets';

export default class CreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataValue: '',
      currentPicker: '',
      loading: false,
      
      coverage: '',
      coverageText: 'Cobertura...',
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
      creditProductText: 'Producto...',
      creditProducts: [],
    }
  }

  static navigationOptions = {
    title: 'Desgravamen',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 0.5,
      borderBottomColor: '#8e8e93',
    },
    headerTitleStyle: {
      fontWeight: '500',
    },
    // headerTintColor: 'white',
    headerBackTitle: 'Atras',
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

  handleInputChange = (inputField) => {
    const name  = Object.keys(inputField)[0];
    const value = inputField[name];

    this.setState({
      [name]: value
    });
  }

  handlePicker = (currentPicker) => {
    const dataValue = (this.state[currentPicker] ? this.state[currentPicker] : '');
    let data = [];

    switch (currentPicker) {
      case 'coverage':
        data = this.state.coverages;
        break;
      case 'currency':
        data = this.state.currencies;
        break;
      case 'typeTerm':
        data = this.state.typeTerms;
        break;
      case 'creditProduct':
        data = this.state.creditProducts;
        break;
    }

    this.setState({ data, dataValue, currentPicker });

    this._picker._handleOpen();
  }

  handleChangeData = (itemValue) => {
    if (itemValue) {
      const { currentPicker } = this.state;
      let c = null;

      switch (currentPicker) {
        case 'coverage':
          c = _.first(_.filter(this.state.coverages, (coverage) => (coverage.value == itemValue)));

          this.setState({
            coverage: c.value,
            coverageText: c.label,
          });
          break;
        case 'currency':
          c = _.first(_.filter(this.state.currencies, (currency) => (currency.value == itemValue)));

          this.setState({
            currency: c.value,
            currencyText: c.label,
          });
          break;
        case 'typeTerm':
          c = _.first(_.filter(this.state.typeTerms, (typeTerm) => (typeTerm.value == itemValue)));

          this.setState({
            typeTerm: c.value,
            typeTermText: c.label,
          });
          break;
        case 'creditProduct':
          c = _.first(_.filter(this.state.creditProducts, (creditProduct) => (creditProduct.value == itemValue)));

          this.setState({
            creditProduct: c.value,
            creditProductText: c.label,
          });
          break;
      }

      this.setState({ dataValue: itemValue });
    }
  }

  handleStore = () => {
    this.setState({ loading: true });

    const { coverage, amountRequested, currency, term, typeTerm, creditProduct } = this.state;

    db.collection("de_headers")
      .add({
        coverage,
        amountRequested,
        currency,
        term,
        typeTerm,
        creditProduct
      })
      .then((docRef) => {
        this.setState({ loading: false });
        
        const { id } = docRef;
        
        this.props.navigation.navigate('DeClientView');
      })
      .catch((error) => {
        this.setState({ loading: false });
        // console.warn("Error adding document: ", error);
      });    
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#cccccc"
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />

        {
          this.state.loading ? (
            <ActivityIndicator size="small" color="#607D8B" style={{ flex: 1 }} />
          ) : (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <View style={styles.formTitleBox}>
                <Text style={styles.formTitleText}>Datos del prestamo</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={[styles.formInputGroup, css.spaceTop]}>
                  {
                    Platform.OS === 'ios' ? (
                      <TouchableOpacity
                        style={styles.formInputBox}
                        activeOpacity={0.4}
                        onPress={() => this.handlePicker('coverage')}
                      >
                        <Text style={styles.formInputText}>
                          {this.state.coverageText}
                        </Text>
                        <Icon name="keyboard-arrow-down" size={30} color="#37474F" />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.formInputBox}>
                        <Picker
                          style={styles.formPicker}
                          selectedValue={this.state.coverage}
                          onValueChange={(itemValue, itemIndex) => this.handleInputChange({ coverage: itemValue })}>
                          <Picker.Item label={this.state.coverageText} value="" />
                            {
                              this.state.coverages.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                            }
                        </Picker>
                      </View>
                    )
                  }
                </View>

                <View style={[styles.formInputGroup, css.spaceTop]}>
                  <View style={styles.formInputBox}>
                    <TextInput
                      style={styles.formInputText}
                      onChangeText={(amountRequested) => this.handleInputChange({ amountRequested: amountRequested })}
                      value={this.state.amountRequested}
                      keyboardType="numeric"
                      placeholder="Monto solicitado"
                      placeholderTextColor="#8E8E93"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  {
                    Platform.OS === 'ios' ? (
                      <TouchableOpacity
                        style={styles.formInputBox}
                        activeOpacity={0.4}
                        onPress={() => this.handlePicker('currency')}
                      >
                        <Text style={styles.formInputText}>
                          {this.state.currencyText}
                        </Text>
                        <Icon name="keyboard-arrow-down" size={30} color="#37474F" />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.formInputBox}>
                        <Picker
                          style={styles.formPicker}
                          selectedValue={this.state.currency}
                          onValueChange={(itemValue, itemIndex) => this.handleInputChange({ currency: itemValue })}>
                          <Picker.Item label={this.state.currencyText} value="" />
                          {
                            this.state.currencies.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                          }
                        </Picker>
                      </View>
                    )
                  }
                </View>
                
                <View style={[styles.formInputGroup, css.spaceTop]}>
                  <View style={styles.formInputBox}>
                    <TextInput
                      style={styles.formInputText}
                      onChangeText={(term) => this.handleInputChange({ term: term })}
                      value={this.state.term}
                      keyboardType="numeric"
                      placeholder="Plazo del crédito"
                      placeholderTextColor="#8E8E93"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  {
                    Platform.OS === 'ios' ? (
                      <TouchableOpacity
                        style={styles.formInputBox}
                        activeOpacity={0.4}
                        onPress={() => this.handlePicker('typeTerm')}
                      >
                        <Text style={styles.formInputText}>
                          {this.state.typeTermText}
                        </Text>
                        <Icon name="keyboard-arrow-down" size={30} color="#37474F" />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.formInputBox}>
                        <Picker
                          style={styles.formPicker}
                          selectedValue={this.state.typeTerm}
                          onValueChange={(itemValue, itemIndex) => this.handleInputChange({ typeTerm: itemValue })}>
                          <Picker.Item label={this.state.typeTermText} value="" />
                          {
                            this.state.typeTerms.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                          }
                        </Picker>
                      </View>
                    )
                  }
                </View>

                <View style={[styles.formInputGroup, css.spaceTop]}>
                  {
                    Platform.OS === 'ios' ? (
                      <TouchableOpacity
                        style={styles.formInputBox}
                        activeOpacity={0.4}
                        onPress={() => this.handlePicker('creditProduct')}
                      >
                        <Text style={styles.formInputText}>
                          {this.state.creditProductText}
                        </Text>
                        <Icon name="keyboard-arrow-down" size={30} color="#37474F" />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.formInputBox}>
                        <Picker
                          style={styles.formPicker}
                          selectedValue={this.state.creditProduct}
                          onValueChange={(itemValue, itemIndex) => this.handleInputChange({ creditProduct: itemValue })}>
                          <Picker.Item label={this.state.creditProductText} value="" />
                            {
                              this.state.creditProducts.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                            }
                        </Picker>
                      </View>
                    )
                  }
                </View>
              </View>

              {Platform.OS === 'ios' &&
                <PickerView
                  ref={(_picker) => { this._picker = _picker; }}
                  data={this.state.data}
                  dataValue={this.state.dataValue}
                  handleChangeData={this.handleChangeData}
                />
              }

              <TouchableOpacity
                style={styles.formButtonTouch}
                activeOpacity={0.6}
                onPress={() => this.handleStore()}
              >
                <View style={styles.formButtonBox}>
                  <Text style={styles.formButtonText}>
                    Continuar
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    )
  }
}

const css = StyleSheet.create({
  spaceTop: {
    marginTop: 25,
  },
});