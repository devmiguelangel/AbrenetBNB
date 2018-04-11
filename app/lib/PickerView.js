import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Button,
  Picker,
  Animated,
  Dimensions,
} from 'react-native';

const { width: WindowWidth } = Dimensions.get('window');
const modalAnimatedValue = new Animated.Value(0);
const opacity = modalAnimatedValue;
const translateY = modalAnimatedValue.interpolate({
  inputRange: [0, 1],
  outputRange: [300, 0],
});

export default class PickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      modalIsVisible: false,
      modalAnimatedValue: modalAnimatedValue,
    }
  }

  _handlePressOpen = () => {
    if (this.state.modalIsVisible) {
      return;
    }

    this.setState({ modalIsVisible: true }, () => {
      Animated.timing(this.state.modalAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }

  _handlePressDone = () => {
    Animated.timing(this.state.modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalIsVisible: false });
    });
  }

  _handleValue = (itemValue) => {
    this.setState({ value: itemValue });

    if (itemValue) {
      this.props._handleValue(itemValue);
    }
  }

  render() {
    if (! this.state.modalIsVisible) {
      return null;
    }
    
    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={this.state.modalIsVisible ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={this._handlePressDone}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }],
          }}>
          <View style={styles.toolbar}>
            <View style={styles.toolbarRight}>
              <Button title="OK" onPress={this._handlePressDone} />
            </View>
          </View>
          <Picker
            style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
            selectedValue={this.state.value}
            onValueChange={(itemValue) => this._handleValue(itemValue)}>
            <Picker.Item label="Seleccione..." value="" />
            {
              this.props.data.map(item => <Picker.Item label={item.label} value={item.value} key={item.value} />)
            }
          </Picker>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  toolbarRight: {
    alignSelf: 'flex-end',
  },
});