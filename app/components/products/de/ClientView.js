import React, { Component } from "react";
import {
  Alert,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'underscore';
import moment from 'moment';
import numeral from 'numeral';

import QuestionView from './QuestionView';
import {
  DatePickerView,
  HeaderLeftView,
  HeaderRightView,
  LoadingView,
  PickerView,
  SearchBarView,
} from '@libs';
import { db, Validation } from '@utils';
import { styles } from '@assets';

export default class ClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search: false,
      details : [],

      formData: this.initForm(),
    }
  }

  static navigationOptions = ({ navigation  }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Datos del Cliente',
      // headerTintColor: 'white',
      headerLeft: (
        <HeaderLeftView
          title="Cancelar"
          icon={Platform.OS === 'android' ? 'cancel' : false}
          handleAction={params.handleCancel}
        />
      ),
      headerTitle: (
        <SearchBarView
          handleSearch={params.handleSearch}
        />
      ),
      headerRight: (
        <HeaderRightView
          title="OK"
          icon={Platform.OS === 'android' ? 'check' : false}
          handleAction={params.handleStore}
        />
      )
    }
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      handleCancel: this.handleCancel,
      search: this.state.search,
      handleSearch: this.handleSearch,
      handleStore: this.handleStore,
    });

    const extensions = [
      { 'value': 'LP', 'label': 'La Paz', },
      { 'value': 'CB', 'label': 'Cochabamba', },
      { 'value': 'SC', 'label': 'Santa Cruz', },
    ];
    
    const activities = [
      { 'value': 1, 'label': 'Actividad 1', },
      { 'value': 2, 'label': 'Actividad 2', },
      { 'value': 4, 'label': 'Actividad 3', },
    ];

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        extensions,
        activities,
      }
    }));

    const { params } = this.props.navigation.state;
    const { headerRef } = params;

    db.collection("de_headers").doc(headerRef.id).collection("details")
      .where("amount", ">=", 0)
      .onSnapshot((querySnapshot) => {
        let details = [];

        querySnapshot.forEach((doc) => {
          let detail = doc.data();

          detail.clientRef.get()
            .then(d => {
              detail['client'] = d.data();
              details.push(detail);

              this.setState({ details });
            });
        });
      });
  }

  initForm = () => {
    return {
      firstName: '',
      firstNameText: 'Nombres',
      lastName: '',
      lastNameText: 'Ap. Paterno',
      motherLastName: '',
      motherLastNameText: 'Ap. Materno',
      marriedName: '',
      marriedNameText: 'Ap. de Casada',
      dni: '',
      dniText: 'Documento de Identidad',
      complement: '',
      complementText: 'Complemento',
      extension: '',
      extensionText: 'Extensión',
      extensions: [],
      birthdate: null,
      birthdateText: 'Fecha de Nacimiento',
      locality: '',
      localityText: 'Localidad',
      homeAddress: '',
      homeAddressText: 'Dirección',
      businessAddress: '',
      businessAddressText: 'Dirección laboral',
      workplace: '',
      workplaceText: 'Lugar de trabajo',
      activity: '',
      activityText: 'Ocupación CAEDEC',
      activities: [],
      occupationDescription: '',
      occupationDescriptionText: 'Descripcción de Actividad',
      phoneNumberHome: '',
      phoneNumberHomeText: 'Teléfono 1',
      phoneNumberOffice: '',
      phoneNumberOfficeText: 'Teléfono de oficina',
      phoneNumberMobile: '',
      phoneNumberMobileText: 'Teléfono 2',
      email: '',
      emailText: 'Correo electrónico',
      weight: '',
      weightText: 'Peso',
      height: '',
      heightText: 'Estatura',
    };
  }
  
  handleCancel = () => {
    this.props.navigation.navigate('DeCreateView');
  }

  handleInputChange = (inputField) => {
    const name = Object.keys(inputField)[0];
    const value = inputField[name];

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }));
  }

  _focusNextField = (field) => {
    this.refs[field].focus();
  }

  handlePicker = (field, lists) => {
    const value = this.state.formData[field];
    const data = this.state.formData[lists];

    this._picker._handleOpen(field, value, data);
  }

  handlePickerValue = (field, value, data) => {
    const fieldText = field + 'Text';
    const selectedItem = _.first(_.filter(data, (d) => (d.value == value)));

    this.setState(prevState => ({
      formData : {
        ...prevState.formData,
        [field]: selectedItem.value,
        [fieldText]: selectedItem.label,
      }
    }));
  }

  handleDatePicker = (field) => {
    let date = moment().toDate();

    if (this.state.formData[field]) {
      date = this.state.formData[field];
    }

    this._datePicker._handleOpen(field, date);
  }
  
  handleDatePickerValue = (field, value) => {
    const fieldText = field + 'Text';

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [field]: value,
        [fieldText]: moment(value).format('DD / MM / YYYY'),
      }
    }));
  }

  handleSearch = () => {
    this.setState({ search: true });
  }

  handleStore = () => {
    //this._questions._handleOpen(null);
    const { search } = this.state;
    const {
      firstName, lastName, motherLastName, marriedName, dni, complement,
      extension, birthdate, locality, homeAddress, businessAddress,
      workplace, activity, occupationDescription, phoneNumberHome,
      phoneNumberOffice, phoneNumberMobile, email, weight, height,
    } = this.state.formData;

    if (search) {
      const data = {
        firstName, lastName, motherLastName, marriedName, dni, complement,
        extension, birthdate, locality, homeAddress, businessAddress,
        workplace, activity, occupationDescription, phoneNumberHome,
        phoneNumberOffice, phoneNumberMobile, email, weight, height,
      };

      const rules = {
        firstName: ['required', 'alpha_space'],
        lastName: ['required', 'alpha_space'],
        motherLastName: ['alpha_space'],
        marriedName: ['alpha_space'],
        dni: ['required', 'alpha_dash'],
        complement: ['alpha_num'],
        extension: ['required'],
        birthdate: ['required', 'date'],
        locality: ['required'],
        homeAddress: ['required'],
        businessAddress: ['required'],
        workplace: ['required'],
        activity: ['required', 'integer'],
        occupationDescription: ['required'],
        phoneNumberHome: ['required', 'numeric'],
        phoneNumberOffice: ['numeric'],
        phoneNumberMobile: ['numeric'],
        email: ['required', 'email'],
        weight: ['required', 'numeric'],
        height: ['required', 'numeric'],
      };

      const validation = new Validation(data, rules);
      const errors = Object.keys(validation.errors);

      if (errors.length > 0) {
        const field = errors[0] + 'Text';

        Alert.alert(
          'Mensaje',
          `El valor del campo ${this.state[field]} no es válido.`,
          [
            { text: 'Aceptar', onPress: () => { }, style: 'cancel' },
          ],
          { cancelable: false }
        );

        return false;
      }

      this.setState({ loading: true });

      const { params } = this.props.navigation.state;
      const { headerRef } = params;
      const date = moment();

      db.collection("clients")
        .add({
          firstName,
          lastName,
          motherLastName,
          marriedName,
          dni,
          complement,
          extension,
          birthdate,
          locality,
          homeAddress,
          businessAddress,
          workplace,
          activity,
          occupationDescription,
          phoneNumberHome,
          phoneNumberOffice,
          phoneNumberMobile,
          email,
          weight: numeral(weight).value(),
          height: numeral(height).value(),
          createdAt: date.toDate(),
          updatedAt: date.toDate(),
        })
        .then((docRef) => {
          db.collection(`de_headers/${headerRef.id}/details`)
            .add({
              clientRef: docRef,
              percentageCredit: 100,
              companyApproval: 'FC',
              rate: 0,
              balance: 0,
              cumulus: 0,
              refinancing: 0,
              amount: 0,
              approved: true,
              headline: 'D',
              involuntary_unemployment: false,
              validated: false,
              createdAt: date.toDate(),
              updatedAt: date.toDate(),
            })
            .then((docRef) => {
              this.setState({
                data: this.initForm(),
                loading: false, 
                search: false
              });

              this._questions._handleOpen(headerRef, docRef);
            })
            .catch((error) => {
              this.setState({ loading: false });

              console.warn("Error adding document 1: ", error);
            });
        })
        .catch((error) => {
          this.setState({ loading: false });

          console.warn("Error adding document 2: ", error);
        });
    } else {
      alert('Buscar datos del Cliente');
    }
  }

  render() {
    const { details, search, loading } = this.state;

    return (
      <View style={styles.container}>
        <QuestionView
          ref={(_questions) => { this._questions = _questions; }}
          navigation={this.props.navigation}
        />
        {
          loading && (
            <LoadingView />
          )
        }
        {
          search ? (
            <ScrollView
              style={styles.productList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <KeyboardAwareScrollView
                // style={{ backgroundColor: '#FFECB3' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flex: 1, justifyContent: 'center', }}
                enableAutomaticScroll={true}
                enableOnAndroid={true}
                scrollEnabled={false}
                extraScrollHeight={Platform.OS === 'android' ? -90 : -50}
              >
                <View style={styles.formContainer}>
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        style={styles.formInputText}
                        onChangeText={(firstName) => this.handleInputChange({ firstName: firstName })}
                        value={this.state.formData.firstName}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.firstNameText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('lastName')}
                      />
                    </View>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="lastName"
                        style={styles.formInputText}
                        onChangeText={(lastName) => this.handleInputChange({ lastName: lastName })}
                        value={this.state.formData.lastName}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.lastNameText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('motherLastName')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="motherLastName"
                        style={styles.formInputText}
                        onChangeText={(motherLastName) => this.handleInputChange({ motherLastName: motherLastName })}
                        value={this.state.formData.motherLastName}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.motherLastNameText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('marriedName')}
                      />
                    </View>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="marriedName"
                        style={styles.formInputText}
                        onChangeText={(marriedName) => this.handleInputChange({ marriedName: marriedName })}
                        value={this.state.formData.marriedName}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.marriedNameText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('dni')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={[styles.formInputBox, styles.formInputBoxMd]}>
                      <TextInput
                        ref="dni"
                        style={styles.formInputText}
                        onChangeText={(dni) => this.handleInputChange({ dni: dni })}
                        value={this.state.formData.dni}
                        keyboardType="numeric"
                        placeholder={this.state.formData.dniText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('complement')}
                      />
                    </View>
                  </View>
    
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="complement"
                        style={styles.formInputText}
                        onChangeText={(complement) => this.handleInputChange({ complement: complement })}
                        value={this.state.formData.complement}
                        keyboardType="default"
                        autoCapitalize="none"
                        placeholder={this.state.formData.complementText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    {
                      Platform.OS === 'ios' ? (
                        <TouchableOpacity
                          style={styles.formInputBox}
                          activeOpacity={0.4}
                          onPress={() => this.handlePicker('extension', 'extensions')}
                        >
                          <Text style={styles.formInputText}>
                            {this.state.formData.extensionText}
                          </Text>
                          <Icon name="keyboard-arrow-down" size={30} color="#37474F" />
                        </TouchableOpacity>
                      ) : (
                          <View style={styles.formInputBox}>
                            <Picker
                              style={styles.formPicker}
                              selectedValue={this.state.formData.extension}
                              onValueChange={(itemValue, itemIndex) => this.handleInputChange({ extension: itemValue })}>
                              <Picker.Item label={this.state.formData.extensionText} value="" />
                              {
                                this.state.formData.extensions.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                              }
                            </Picker>
                          </View>
                        )
                    }
                  </View>
    
                  <View style={styles.formInputGroup}>
                    <TouchableOpacity
                      style={[styles.formInputBox, styles.formInputBoxMd]}
                      activeOpacity={0.4}
                      onPress={() => this.handleDatePicker('birthdate')}
                    >
                      <Text style={styles.formInputText}>
                        {this.state.formData.birthdateText}
                      </Text>
                      <Icon name="date-range" size={30} color="#37474F" />
                    </TouchableOpacity>
                  </View>
    
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        style={styles.formInputText}
                        onChangeText={(locality) => this.handleInputChange({ locality: locality })}
                        value={this.state.formData.locality}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.localityText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('homeAddress')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="homeAddress"
                        style={styles.formInputText}
                        onChangeText={(homeAddress) => this.handleInputChange({ homeAddress: homeAddress })}
                        value={this.state.formData.homeAddress}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.homeAddressText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('businessAddress')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="businessAddress"
                        style={styles.formInputText}
                        onChangeText={(businessAddress) => this.handleInputChange({ businessAddress: businessAddress })}
                        value={this.state.formData.businessAddress}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.businessAddressText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('workplace')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="workplace"
                        style={styles.formInputText}
                        onChangeText={(workplace) => this.handleInputChange({ workplace: workplace })}
                        value={this.state.formData.workplace}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder={this.state.formData.workplaceText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
    
                  <View style={styles.formInputGroup}>
                    {
                      Platform.OS === 'ios' ? (
                        <TouchableOpacity
                          style={styles.formInputBox}
                          activeOpacity={0.4}
                          onPress={() => this.handlePicker('activity', 'activities')}
                        >
                          <Text style={styles.formInputText}>
                            {this.state.formData.activityText}
                          </Text>
                          <Icon name="keyboard-arrow-down" size={30} color="#37474F" />
                        </TouchableOpacity>
                      ) : (
                          <View style={styles.formInputBox}>
                            <Picker
                              style={styles.formPicker}
                              selectedValue={this.state.formData.activity}
                              onValueChange={(itemValue, itemIndex) => this.handleInputChange({ activity: itemValue })}>
                              <Picker.Item label={this.state.formData.activityText} value="" />
                              {
                                this.state.formData.activities.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
                              }
                            </Picker>
                          </View>
                        )
                    }
                  </View>
    
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        style={styles.formInputText}
                        onChangeText={(occupationDescription) => this.handleInputChange({ occupationDescription: occupationDescription })}
                        value={this.state.formData.occupationDescription}
                        keyboardType="default"
                        placeholder={this.state.formData.occupationDescriptionText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('phoneNumberHome')}
                      />
                    </View>
                  </View>
    
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="phoneNumberHome"
                        style={styles.formInputText}
                        onChangeText={(phoneNumberHome) => this.handleInputChange({ phoneNumberHome: phoneNumberHome })}
                        value={this.state.formData.phoneNumberHome}
                        keyboardType="phone-pad"
                        placeholder={this.state.formData.phoneNumberHomeText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('phoneNumberMobile')}
                      />
                    </View>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="phoneNumberMobile"
                        style={styles.formInputText}
                        onChangeText={(phoneNumberMobile) => this.handleInputChange({ phoneNumberMobile: phoneNumberMobile })}
                        value={this.state.formData.phoneNumberMobile}
                        keyboardType="phone-pad"
                        placeholder={this.state.formData.phoneNumberMobileText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('phoneNumberOffice')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={[styles.formInputBox, styles.formInputBoxMd]}>
                      <TextInput
                        ref="phoneNumberOffice"
                        style={styles.formInputText}
                        onChangeText={(phoneNumberOffice) => this.handleInputChange({ phoneNumberOffice: phoneNumberOffice })}
                        value={this.state.formData.phoneNumberOffice}
                        keyboardType="phone-pad"
                        placeholder={this.state.formData.phoneNumberOfficeText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('email')}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.formInputGroup}>
                    <View style={[styles.formInputBox, styles.formInputBoxMd]}>
                      <TextInput
                        ref="email"
                        style={styles.formInputText}
                        onChangeText={(email) => this.handleInputChange({ email: email })}
                        value={this.state.formData.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={this.state.formData.emailText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('weight')}
                      />
                    </View>
                  </View>
    
                  <View style={styles.formInputGroup}>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="weight"
                        style={styles.formInputText}
                        onChangeText={(weight) => this.handleInputChange({ weight: weight })}
                        value={this.state.formData.weight}
                        keyboardType="numeric"
                        placeholder={this.state.formData.weightText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        returnKeyLabel="Siguiente"
                        onSubmitEditing={() => this._focusNextField('height')}
                      />
                    </View>
                    <View style={styles.formInputBox}>
                      <TextInput
                        ref="height"
                        style={styles.formInputText}
                        onChangeText={(height) => this.handleInputChange({ height: height })}
                        value={this.state.formData.height}
                        keyboardType="numeric"
                        placeholder={this.state.formData.heightText}
                        placeholderTextColor="#8E8E93"
                        underlineColorAndroid="transparent"
                        returnKeyType="done"
                        returnKeyLabel="Guardar"
                        onSubmitEditing={() => this.handleStore()}
                      />
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>
          ) : (
            <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', backgroundColor: 'white',}}>
              {
                details.length > 0 ? (
                  <ScrollView
                    style={styles.clientListContainer}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  >
                    {
                      details.map((detail, index) => {
                        return (
                          <TouchableOpacity
                            style={styles.clientListBox}
                            activeOpacity={0.6}
                            key={index}
                          >
                            <Text style={styles.clientListType}>{index === 0 ? 'T' : `C${index}`}</Text>
                            <Text style={styles.clientListName}>
                              {detail.client.firstName} {detail.client.lastName} {detail.client.motherLastName}
                            </Text>
                            <TouchableOpacity
                              style={styles.clientListIconBox}
                              activeOpacity={0.6}
                            >
                              <Icon name="mode-edit" size={25} color="#78909C" />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.clientListIconBox}
                              activeOpacity={0.6}
                            >
                              <Icon name="delete" size={25} color="rgba(255,56,36, 0.7)" />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                ) : (
                  <View style={css.formTitleContainer}>
                    <View style={styles.formTitleBox}>
                      <Text style={styles.formTitleText}>Datos del Cliente</Text>
                    </View>
                  </View>
                )
              }
            </View>
          )
        }

        {
          Platform.OS === 'ios' &&
          <PickerView
            ref={(_picker) => { this._picker = _picker; }}
            handleValue={this.handlePickerValue}
          />
        }

        <DatePickerView
          ref={(_datePicker) => { this._datePicker = _datePicker; }}
          handleValue={this.handleDatePickerValue}
        />
      </View>
    );
  }
}

const css = StyleSheet.create({
  formTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});