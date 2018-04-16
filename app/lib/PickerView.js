import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Picker,
  Animated,
  Dimensions,
  TouchableHighlight,
  Text,
  PixelRatio,
  Modal,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const offSet = new Animated.Value(deviceHeight);

export default class PickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }

  _handleOpen = () => {
    this.setState({modal: true});

    Animated.timing(offSet, {
      duration: 300,
      toValue: 0
    }).start();
  }

  _handleClose = () => {
    Animated.timing(offSet, {
      duration: 300,
      toValue: deviceHeight
    }).start(() => this.setState({ modal: false }));
  }

  render() {
    const { data } = this.props;
    
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        animationType='none'
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(38,50,56 ,0.7)' }}>
          <Animated.View style={[{ transform: [{ translateY: offSet }] }, styles.container]}>
            <View style={styles.closeButtonContainer}>
              <TouchableHighlight onPress={this._handleClose} underlayColor="transparent" style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Ok</Text>
              </TouchableHighlight>
            </View>
            <Picker
              style={styles.picker}
              selectedValue={this.props.dataValue}
              onValueChange={(itemValue) => { this.props.handleChangeData(itemValue) }}>
              <Picker.Item
                value=''
                label='Seleccione...'
              />
              {
                data.map((item) => (
                  <Picker.Item
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  />
                ))
              }
            </Picker>
          </Animated.View>
        </View>
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end'
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    backgroundColor: '#FAFAF8',
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  closeButtonText: {
    color: '#027afe',
    fontSize: 14,
  },
  picker: {
    backgroundColor: '#FFFFFF',
  }
});