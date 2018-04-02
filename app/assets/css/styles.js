import {
  Platform,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // Logo
  logoBox: {
    flexDirection: 'row',
    width: 250,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    marginRight: 10,
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: '#EDF6F7',
  },
  logoImage: {
    width: 100,
    height: 90,
  },
  // Login
  loginBox: {
    width: 260,
    height: 55,
    marginTop: 20,
  },
  loginLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#37474F',
  },
  loginInputBox: {
    flexDirection: 'row',
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#F5FCFF',
  },
  loginInputText: {
    flex: 1,
    color: '#37474F',
  },
  loginSignUpBox: {
    width: 270,
    height: 55,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(77,182,172, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,105,92, 0.1)',
    alignItems: 'center',
  },
  loginSignUpInputText: {
    flex: 1,
    color: '#546E7A',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Medium',
  },
  signInButton: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#60A3BC',
  },
  signInText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#F5FCFF',
  },
  loginSignUpText: {
    fontSize: 12,
    fontFamily: 'Oxygen-Regular',
    color: '#78909C',
  },
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  header: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#37474F',
    ...Platform.select({
      ios: {
        paddingTop: 15
      }
    })
  },
  /* 
  headerBox: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  productList: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
    // backgroundColor: 'rgba(20, 149, 95, 0.3)', // #14955F
    // backgroundColor: 'rgba(26, 170, 142, 0.7)', // #1AAA8E
  },
  productRow: {
    alignSelf: 'stretch',
    height: 165,
    flexDirection: 'row',
    // paddingHorizontal: 10,
    alignItems: 'center',
  },
  productTouch: {
    flex: 1,
  },
  productBox: {
    flex: 1,
    height: 165,
    padding: 12,
    flexDirection: 'column',
  },
  productIcon: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },

  // Forms
  formTitle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 8,
    backgroundColor: '#e8eff2',
  },
  formTitleText: {
    fontSize: 11,
    color: '#37474F',
    marginLeft: 10,
    fontFamily: 'Quicksand-Medium',
  },
  formView: {
    flexDirection: 'row',
  },
  formBox: {
    flex: 1,
  },
  formBoxPicker: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8DC',
  },
  formPicker: {
    color: '#37474F',
  },
  formGroup: {
    flexDirection: 'row',
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8DC',
    paddingHorizontal: 7,
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
    }),
  },
  formGroupIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formText: {
    flex: 1,
    color: '#37474F',
  }, */
});

export default styles;