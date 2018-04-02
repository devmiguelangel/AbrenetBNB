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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import AppStack from './../AppStack';

import { firebaseAuth } from './../firebase';
import { styles, images } from "@assets";

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

    firebaseAuth.signInWithEmailAndPassword(email, password).then((data) => {
      this.setState({ signedIn: true });
    }).catch((error) => {
      console.warn(error);
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
                <Text style={styles.loginLabel}>EMAIL</Text>
                <View style={styles.loginInputBox}>
                  <TextInput
                    style={styles.loginInputText}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
          ) : (
            <AppStack />
          )
        }
      </View>
    );
  }
}