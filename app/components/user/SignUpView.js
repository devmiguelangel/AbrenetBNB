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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { firebaseAuth } from './../firebase';
import { styles, images } from "@assets";

import AppStack from './../AppStack';

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // signedIn: false,
      full_name: '',
      email: '',
      password: '',
      password_confirm: '',
      city: '',
    }
  }

  handleSignUp = () => {
    const { full_name, email, password, password_confirm, city } = this.state;
    
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.warn(data);
        
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  handleCancel = () => {
    this.props.navigation.navigate('SignInView');
  }

  render() {
    return (
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
              placeholderTextColor="#546E7A"
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
              placeholder="Email"
              placeholderTextColor="#546E7A"
              keyboardType="email-address"
              autoCapitalize="none"
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
              placeholderTextColor="#546E7A"
              secureTextEntry={true}
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
              placeholderTextColor="#546E7A"
              secureTextEntry={true}
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
              placeholderTextColor="#546E7A"
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
              <Text style={styles.signInText}>Ingresar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#E57373',
  },
  signUpButtonCancel: {
    backgroundColor: '#78909C',
  },
});