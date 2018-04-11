import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppStack from './../AppStack';

import { firebaseAuth } from './../../utils/firebase';
import { styles as _styles, images } from '@assets';

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      email: '',
      password: '',
    }
  }

  _focusNextField = (field) => {
    this.refs[field].focus();
  }

  handleSignIn = () => {
    const { email, password } = this.state;

    firebaseAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.setState({ signedIn: true });
    }).catch((error) => {
      let message = '';

      switch (error.code) {
        case 'auth/invalid-email':
          message = 'El correo electrónico no es valido.'
          break;
        case 'auth/user-disabled':
          message = 'El correo electrónico ha sido deshabilitado.'
          break;
        case 'auth/user-not-found':
          message = 'El correo electrónico no existe.'
          break;
        case 'auth/wrong-password':
          message = 'La contraseña no es valida.'
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

  handleSignUp = () => {
    this.props.navigation.navigate('SignUpView');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          ! this.state.signedIn ? (
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={{ flex: 1, justifyContent: 'center', }}
              enableAutomaticScroll={true}
              enableOnAndroid={true}
              scrollEnabled={false}
              extraScrollHeight={Platform.OS === 'android' ? -90 : 0}
            >
              <ImageBackground source={images.bg} style={[_styles.container]}>
                <StatusBar
                  backgroundColor="#1e272e"
                  barStyle="light-content"
                />

                <View style={[_styles.logoBox, { marginTop: 200, marginBottom: 30 }]}>
                  <Text style={_styles.logoText}>SEGUROS</Text>
                  <Image source={images.logo} style={_styles.logoImage} />
                </View>

                <View style={styles.signInInputBox}>
                  <TextInput
                    style={styles.signInInputText}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#455A64"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    keyboardAppearance="dark"
                    returnKeyType="next"
                    returnKeyLabel="Siguiente"
                    onSubmitEditing={() => this._focusNextField('password')}
                  />
                  <Icon name="account-circle" size={32} color="#455A64" />
                </View>

                <View style={styles.signInInputBox}>
                  <TextInput
                    ref="password"
                    style={styles.signInInputText}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder="Contraseña"
                    placeholderTextColor="#455A64"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardAppearance="dark"
                  />
                  <Icon name="lock" size={32} color="#455A64" />
                </View>

                <TouchableOpacity
                  onPress={() => this.handleSignIn()}
                  style={{ marginTop: 25 }}
                  activeOpacity={0.5}>
                  <View style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>Ingresar</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.handleSignUp()}
                  style={{ marginTop: 20 }}
                  activeOpacity={0.7}>
                  <Text style={styles.loginSignUpText}>
                    Regístrate para obtener una cuenta
                    </Text>
                </TouchableOpacity>
              </ImageBackground>
            </KeyboardAwareScrollView>
            
          ) : (
            <AppStack />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signInInputBox: {
    flexDirection: 'row',
    width: 280,
    height: 55,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255, 0.45)',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  signInInputText: {
    flex: 1,
    color: '#455A64',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  signInButton: {
    width: 205,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29B6F6',
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Semibold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginSignUpText: {
    marginTop: 25,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
  },
});