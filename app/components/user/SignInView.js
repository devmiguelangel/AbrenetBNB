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

import { firebaseAuth } from './../firebase';
import { styles, images } from '@assets';

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      email: '',
      password: '',
    }
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
              <ImageBackground source={images.bg} style={[styles.container]}>
                <StatusBar
                  backgroundColor="#1e272e"
                  barStyle="light-content"
                />

                <View style={[styles.logoBox, { marginTop: 200, marginBottom: 30 }]}>
                  <Text style={styles.logoText}>SEGUROS</Text>
                  <Image source={images.logo} style={styles.logoImage} />
                </View>

                <View style={styles.loginBox}>
                  <Text style={styles.loginLabel}>CORREO ELECTRÓNICO</Text>
                  <View style={styles.loginInputBox}>
                    <TextInput
                      style={styles.loginInputText}
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      underlineColorAndroid="transparent"
                      keyboardAppearance="dark"
                    />
                    <Icon name="account-circle" size={32} color="#37474F" />
                  </View>
                </View>

                <View style={styles.loginBox}>
                  <Text style={styles.loginLabel}>CONTRASEÑA</Text>
                  <View style={styles.loginInputBox}>
                    <TextInput
                      style={styles.loginInputText}
                      onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      keyboardAppearance="dark"
                    />
                    <Icon name="lock" size={32} color="#37474F" />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.handleSignIn()}
                  style={{ marginTop: 25 }}
                  activeOpacity={0.5}>
                  <View style={styles.signInButton}>
                    <Text style={styles.signInText}>Ingresar</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.handleSignUp()}
                  style={{ marginTop: 20 }}
                  activeOpacity={0.7}>
                  <Text style={styles.loginSignUpText}>
                    REGÍSTRATE PARA OBTENER UNA CUENTA
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