import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Picker,
  Platform,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles } from '@assets';

export default class ProductDe extends Component {
  static navigationOptions = {
    title: 'Desgravamen',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#81C784',
    },
    headerTintColor: 'white'
  }

  constructor(props) {
    super(props);
    this.state = {
      coverage: '',
      amount_requested: '',
      currency: '',
      term: '',
      type_term: '',
      credit_product: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.formTitle}>
          <Icon name="account-balance" size={13} color="#37474F" />
          <Text style={styles.formTitleText}>DATOS DEL PRESTAMO</Text>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={{ flex: 1, }}>
            { Platform.OS === 'ios' ? (
              <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({ modal: true })}>
                <Text>Cobertura</Text>
              </TouchableHighlight>
            ) : (
              <Picker
                selectedValue={this.state.coverage}
                onValueChange={(itemValue, itemIndex) => this.setState({ coverage: itemValue })}>
                <Picker.Item itemStyle label="Tipo de cobertura" value="" />
                <Picker.Item label="Individual" value="1" />
                <Picker.Item label="Mancomunado (Afiliación al 100% para cada codeudor)" value="2" />
                <Picker.Item label="Codeudor (Afiliación en porcentajes para cada codeudor)" value="4" />
              </Picker>
              ) 
            }
          </View>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <TextInput
            style={{ flex: 1, }}
            onChangeText={(amount_requested) => this.setState({ amount_requested })}
            value={this.state.amount_requested}
            keyboardType="numeric"
            placeholder="Monto solicitado"
          />
          <View style={{ flex: 1, }}>
            <Picker
              selectedValue={this.state.currency}
              onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}>
              <Picker.Item label="Bolivianos" value="BS" />
              <Picker.Item label="Dolares" value="USD" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(term) => this.setState({ term })}
            value={this.state.term}
            keyboardType="numeric"
            placeholder="Plazo del crédito"
          />
          <View style={{ flex: 1, }}>
            <Picker
              selectedValue={this.state.type_term}
              onValueChange={(itemValue, itemIndex) => this.setState({ type_term: itemValue })}>
              <Picker.Item label="Años" value="Y" />
              <Picker.Item label="Meses" value="M" />
              <Picker.Item label="Semanas" value="W" />
              <Picker.Item label="Días" value="D" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={{ flex: 1, }}>
            <Picker
              selectedValue={this.state.credit_product}
              onValueChange={(itemValue, itemIndex) => this.setState({ credit_product: itemValue })}>
              <Picker.Item label="Producto" value="" />
              <Picker.Item label="Consumo" value="1" />
              <Picker.Item label="Comercial" value="2" />
              <Picker.Item label="Hipotecario de Vivienda, Vivienda Social o Automotor" value="3" />
              <Picker.Item label="Tarjetas" value="4" />
              <Picker.Item label="Otros" value="5" />
              <Picker.Item label="Asalariado 7x5" value="7" />
              <Picker.Item label="Línea Licitada" value="8" />
              <Picker.Item label="Línea no Licitada" value="9" />
            </Picker>
          </View>
        </View>
        
      </View>
    )
  }
}