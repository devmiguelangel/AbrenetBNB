import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  Picker,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'underscore';
import moment from 'moment';
import numeral from 'numeral';

import {
  HeaderLeftView,
  LoadingView,
  PickerView,
} from '@libs';
import {
  db,
  firebaseAuth,
  Validation,
} from '@utils';
import { styles } from '@assets';

export default class CreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      
      coverage: '',
      coverageText: 'Cobertura',
      coverages: [],
      amountRequested: '',
      amountRequestedText: 'Monto solicitado',
      currency: '',
      currencyText: 'Moneda',
      currencies: [],
      term: '',
      termText: 'Plazo del crédito',
      typeTerm: '',
      typeTermText: 'Tipo de plazo',
      typeTerms: [],
      creditProduct: '',
      creditProductText: 'Producto',
      creditProducts: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Desgravamen',
      // headerTintColor: 'white',
      headerLeft: (
        <HeaderLeftView
          title="Salir"
          icon={Platform.OS === 'android' ? 'arrow-back' : false}
          handleAction={params.handleCancel}
        />
      ),
    }
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ handleCancel: this.handleCancel });

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
      { 'value': 1, 'label': "Consumo", },
      { 'value': 2, 'label': "Comercial", },
      { 'value': 3, 'label': "Hipotecario de Vivienda, Vivienda Social o Automotor", },
      { 'value': 4, 'label': "Tarjetas", },
      { 'value': 5, 'label': "Otros", },
      { 'value': 7, 'label': "Asalariado 7x5", },
      { 'value': 8, 'label': "Línea Licitada", },
      { 'value': 9, 'label': "Línea no Licitada", },
    ];

    this.setState({
      coverages: coverages,
      currencies: currencies,
      typeTerms: typeTerms,
      creditProducts: creditProducts,
    });
  }

  handleCancel = () => {
    this.props.navigation.navigate('HomeListView');
  }

  handleInputChange = (inputField) => {
    const name  = Object.keys(inputField)[0];
    const value = inputField[name];

    this.setState({
      [name]: value
    });
  }

  handlePicker = (field, lists) => {
    const value = this.state[field];
    const data = this.state[lists];

    this._picker._handleOpen(field, value, data);
  }

  handlePickerValue = (field, value, data) => {
    const fieldText = field + 'Text';
    const selectedItem = _.first(_.filter(data, (d) => (d.value == value)));

    this.setState({
      [field]: selectedItem.value,
      [fieldText]: selectedItem.label,
    });
  }

  handleStore = () => {
    // this.props.navigation.navigate('DeClientView');
    const { coverage, amountRequested, currency, term, typeTerm, creditProduct } = this.state;
    const data = { coverage, amountRequested, currency, term, typeTerm, creditProduct };
    
    const rules = {
      coverage: ['required', 'integer'],
      amountRequested: ['required', 'numeric'],
      currency: ['required', 'in:BS,USD'],
      term: ['required', 'numeric'],
      typeTerm: ['required', 'in:Y,M,W,D'],
      creditProduct: ['required', 'integer'],
    };

    const validation = new Validation(data, rules);
    const errors = Object.keys(validation.errors);

    if (errors.length > 0) {
      const field = errors[0] + 'Text';
      
      Alert.alert(
        'Mensaje',
        `El valor del campo ${this.state[field]} no es válido.`,
        [
          { text: 'Aceptar', onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: false }
      );

      return false;
    }
    
    this.setState({ loading: true });

    const user = firebaseAuth.currentUser;
    const date = moment();

    db.collection("de_headers")
      .add({
        userId: user.uid,
        policyNumber: '',
        operationNumber: '',
        movementType: 'FC',
        coverage,
        creditProduct,
        amountRequested: numeral(amountRequested).value(),
        currency,
        term: numeral(term).value(),
        typeTerm,
        dateIssue: null,
        createdAt: date.toDate(),
        updatedAt: date.toDate(),
      })
      .then((docRef) => {
        this.props.navigation.navigate('DeClientView', { headerRef: docRef });
        
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        // console.warn("Error adding document: ", error);
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#519657"
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />

        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          {
            loading && (
              <LoadingView />
            )
          }
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
                    onPress={() => this.handlePicker('coverage', 'coverages')}
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
                  placeholder={this.state.amountRequestedText}
                  placeholderTextColor="#8E8E93"
                  underlineColorAndroid="transparent"
                />
              </View>
              {
                Platform.OS === 'ios' ? (
                  <TouchableOpacity
                    style={styles.formInputBox}
                    activeOpacity={0.4}
                    onPress={() => this.handlePicker('currency', 'currencies')}
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
                  placeholder={this.state.termText}
                  placeholderTextColor="#8E8E93"
                  underlineColorAndroid="transparent"
                />
              </View>
              {
                Platform.OS === 'ios' ? (
                  <TouchableOpacity
                    style={styles.formInputBox}
                    activeOpacity={0.4}
                    onPress={() => this.handlePicker('typeTerm', 'typeTerms')}
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
                    onPress={() => this.handlePicker('creditProduct', 'creditProducts')}
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

          {
            Platform.OS === 'ios' && (
              <PickerView
                  ref={(_picker) => { this._picker = _picker; }}
                  handleValue={this.handlePickerValue}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const css = StyleSheet.create({
  spaceTop: {
    marginTop: 25,
  },
});