import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const HeaderLeftView = (props) => {
  const { icon } = props;

  return (
    <TouchableOpacity
      style={styles.headerBox}
      activeOpacity={0.4}
      onPress={() => props.handleAction()}
    >
      {
        icon ? (
          <Icon name={icon} size={30} color="white" />
        ) : (
          <Text style={styles.headerText}>
            {props.title}
          </Text>
        )
      }
    </TouchableOpacity>
  )
}

export const HeaderRightView = (props) => {
  const { icon } = props;

  return (
    <TouchableOpacity
      style={styles.headerBox}
      activeOpacity={0.4}
      onPress={() => props.handleAction()}
    >
      {
        icon ? (
          <Icon name={icon} size={30} color="white" />
        ) : (
          <Text style={styles.headerText}>
            {props.title}
          </Text>
        )
      }
    </TouchableOpacity>
  )
}

export class SearchBarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false,
      loading: false,
    }
  }

  render() {
    const { focus, loading } = this.state;
    
    return (
      <View style={styles.searchBarBox}>
        <Icon name="search" size={20} color="#8e8e93" />
        <TextInput
          style={styles.searchBarInput}
          onChangeText={(value) => { this.setState({ value: 0 }) }}
          value={this.state.value}
          placeholder="Buscar"
          underlineColorAndroid="transparent"
          keyboardType="default"
          returnKeyType="search"
          returnKeyLabel="Buscar"
          onSubmitEditing={() => this.props.handleSearch() }
          onFocus={() => { this.setState({ focus: true }) }}
          onBlur={() => { this.setState({ focus: false }) }}
        />
        {
          loading && (
            <ActivityIndicator
              style={{ marginRight: 5 }}
              size="small"
              color="#8e8e93"
            />
          )
        }
        {
          focus && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { this.setState({ value: '' }) }}
            >
              <Icon name={Platform.OS === 'ios' ? 'cancel' : 'close'} size={18} color="#8e8e93" />
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#0076FF'
  },
  searchBarBox: {
    width: '100%',
    height: '70%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginLeft: 20,
        borderRadius: 8,
      }
    }),
  },
  searchBarInput: {
    flex: 1,
    marginLeft: 5,
    padding: 0,
    fontSize: 14,
  },
});