import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { firebaseAuth } from './../../utils/firebase';
import { styles as _styles, images } from "@assets";

import AppStack from './../AppStack';

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      password: '',
      password_confirm: '',
      city: '',
    };
  }

  _focusNextField = (field) => {
    this.refs[field].focus();
  }

  handleSignUp = () => {
    const { full_name, email, password, password_confirm, city } = this.state;

    if (! full_name.match(/^[a-z\-_\s]+$/i)) {
      Alert.alert(
        '',
        'El formato del Nombre es incorrecto.',
        [
          { text: 'OK', }
        ]
      );

      return false;
    }

    if (password !== password_confirm) {
      Alert.alert(
        '',
        'Las contraseñas no coinciden.',
        [
          { text: 'OK', }
        ]
      );

      return false;
    }
    
    
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.warn(user);
      })
      .catch((error) => {
        let message = '';

        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'El correo electrónico ya existe.'
            break;
          case 'auth/invalid-email':
            message = 'El correo electrónico no es valido.'
            break;
          case 'auth/operation-not-allowed':
            message = 'Operación no permitida.'
            break;
          case 'auth/weak-password':
            message = 'La contraseña no es suficientemente fuerte.'
            break;
        }

        Alert.alert(
          '',
          message,
          [
            { text: 'OK', }
          ]
        );
      });
  }

  handleCancel = () => {
    this.props.navigation.navigate('SignInView');
  }

  render() {
    return (
      <KeyboardAwareScrollView
        // style={{ backgroundColor: '#FFECB3' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', }}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        scrollEnabled={false}
        extraScrollHeight={Platform.OS === 'android' ? -90 : 0}
      >
        <View style={_styles.container}>
          <View style={_styles.header}>
            <View style={_styles.logoBox}>
              <Text style={_styles.logoText}>SEGUROS</Text>
              <Image source={images.logo} style={_styles.logoImage} />
            </View>
          </View>

          <View style={styles.signUpContainer}>
            <View style={styles.signUpBox}>
              <Text style={styles.signUpLabel}>Nombre: </Text>
              <TextInput
                style={styles.signUpInputText}
                onChangeText={(full_name) => this.setState({ full_name })}
                value={this.state.full_name}
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Siguiente"
                onSubmitEditing={() => this._focusNextField('email')}
              />
              <Icon name="account-box" size={30} color="#455A64" />
            </View>

            <View style={styles.signUpBox}>
              <Text style={styles.signUpLabel}>Correo electrónico: </Text>
              <TextInput
                ref="email"
                style={styles.signUpInputText}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Siguiente"
                onSubmitEditing={() => this._focusNextField('password')}
              />
              <Icon name="email" size={30} color="#455A64" />
            </View>

            <View style={styles.signUpBox}>
              <Text style={styles.signUpLabel}>Contraseña: </Text>
              <TextInput
                ref="password"
                style={styles.signUpInputText}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Siguiente"
                onSubmitEditing={() => this._focusNextField('password_confirm')}
              />
              <Icon name="lock-open" size={30} color="#455A64" />
            </View>

            <View style={styles.signUpBox}>
              <Text style={styles.signUpLabel}>Confirmar Contraseña: </Text>
              <TextInput
                ref="password_confirm"
                style={styles.signUpInputText}
                onChangeText={(password_confirm) => this.setState({ password_confirm })}
                value={this.state.password_confirm}
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="Siguiente"
                onSubmitEditing={() => this._focusNextField('city')}
              />
              <Icon name="lock-open" size={30} color="#455A64" />
            </View>

            <View style={styles.signUpBox}>
              <Text style={styles.signUpLabel}>Ciudad: </Text>
              <TextInput
                ref="city"
                style={styles.signUpInputText}
                onChangeText={(city) => this.setState({ city })}
                value={this.state.city}
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
              />
              <Icon name="location-on" size={30} color="#455A64" />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.handleSignUp()}
            activeOpacity={0.7}>
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Registrar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.handleCancel()}
            activeOpacity={0.7}>
            <Text style={styles.signUpCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  signUpContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  signUpBox: {
    width: '95%',
    height: 35,
    marginTop: 25,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CECED2',
    alignItems: 'center',
  },
  signUpLabel: {
    color: '#8E8E93',
    fontSize: 12,
    fontFamily: 'Oxygen-Regular',
  },
  signUpInputText: {
    flex: 1,
    fontSize: 12,
    color: 'black',
    paddingHorizontal: 5,
    fontFamily: 'Oxygen-Regular',
  },
  signUpButton: {
    width: 250,
    height: 45,
    marginTop: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: 'Oxygen-Regular',
    color: '#FFFFFF',
    fontSize: 16,
  },
  signUpCancel: {
    marginTop: 20,
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Oxygen-Regular',
  },
});

/* const _styles = StyleSheet.create({
  signUpButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
  },
  signUpButtonBox: {
    flex: 1,
  },
  signUpButton: {
    flex: 1,
    width: 'auto',
  },
  signUpButtonSuccess: {
    // backgroundColor: '#E57373',
  },
  signUpButtonCancel: {
    backgroundColor: '#ef9a9a',
  },
}); */