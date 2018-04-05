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

import { firebaseAuth } from './../firebase';
import { styles, images } from "@assets";

import AppStack from './../AppStack';

export default class SignInView extends Component {
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
        <View style={[styles.container]}>
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>SEGUROS</Text>
              <Image source={images.logo} style={styles.logoImage} />
            </View>
          </View>

          <View style={styles.signUpContainer}>
            <View style={styles.loginSignUpBox}>
              <TextInput
                style={styles.loginSignUpInputText}
                onChangeText={(full_name) => this.setState({ full_name })}
                value={this.state.full_name}
                placeholder="Nombre"
                placeholderTextColor="#90A4AE"
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
              />
              <Icon name="account-box" size={36} color="#546E7A" />
            </View>

            <View style={styles.loginSignUpBox}>
              <TextInput
                style={styles.loginSignUpInputText}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                placeholder="Correo Electrónico"
                placeholderTextColor="#90A4AE"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
              />
              <Icon name="email" size={36} color="#546E7A" />
            </View>

            <View style={styles.loginSignUpBox}>
              <TextInput
                style={styles.loginSignUpInputText}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                placeholder="Contraseña"
                placeholderTextColor="#90A4AE"
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
              />
              <Icon name="lock-open" size={36} color="#546E7A" />
            </View>

            <View style={styles.loginSignUpBox}>
              <TextInput
                style={styles.loginSignUpInputText}
                onChangeText={(password_confirm) => this.setState({ password_confirm })}
                value={this.state.password_confirm}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#90A4AE"
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
              />
              <Icon name="lock-open" size={36} color="#546E7A" />
            </View>

            <View style={styles.loginSignUpBox}>
              <TextInput
                style={styles.loginSignUpInputText}
                onChangeText={(city) => this.setState({ city })}
                value={this.state.city}
                placeholder="Ciudad"
                placeholderTextColor="#90A4AE"
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
              />
              <Icon name="location-on" size={36} color="#546E7A" />
            </View>
          </View>

          <View style={_styles.signUpButtonContainer}>
            <TouchableOpacity
              onPress={() => this.handleCancel()}
              style={_styles.signUpButtonBox}
              activeOpacity={0.7}>
              <View style={[styles.signInButton, _styles.signUpButton, _styles.signUpButtonCancel,]}>
                <Text style={styles.signInText}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleSignUp()}
              style={_styles.signUpButtonBox}
              activeOpacity={0.7}>
              <View style={[styles.signInButton, _styles.signUpButton, _styles.signUpButtonSuccess]}>
                <Text style={styles.signInText}>Registrar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const _styles = StyleSheet.create({
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
});