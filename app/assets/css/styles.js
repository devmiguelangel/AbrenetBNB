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
  header: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#37474F',
    ...Platform.select({
      ios: {
        paddingTop: 15,
      },
      android: {
        marginTop: -15,
      },
    })
  },
  // Home
  productList: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 20,
    // backgroundColor: 'rgba(20, 149, 95, 0.3)', // #14955F
    // backgroundColor: 'rgba(26, 170, 142, 0.7)', // #1AAA8E
  },
  productRow: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 'auto',
    flexDirection: 'row',
  },
  productTouch: {
    flex: 1,
    alignItems: 'center',
  },
  productBox: {
    flex: 1,
    width: 160, 
    height: 150,
    padding: 5,
    flexDirection: 'column',
  },
  productIcon: {
    flex: 1,
  },
  productTitle: {
    textAlign: 'right',
    fontSize: 13,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },

  // Modal
  /* modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(38,50,56 ,0.7)',
    padding: 30,
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalTitleBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#42A5F5',
  },
  modalTitleText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#546E7A',
  },
  modalCloseBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#42A5F5',
  },
  modalCloseText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#ef5350',
  },
  modalActionTouch: {
    alignSelf: 'stretch',
  },
  modalActionBox: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalActionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1E88E5',
  }, */

  // Forms
  formTitleBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitleText: {
    fontSize: 20,
    color: '#37474F',
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  formInputGroup: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 5,
  },
  formInputBox: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    marginHorizontal: 3,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CECED2',
  },
  formInputText: {
    flex: 1,
    fontFamily: 'Oxygen-Regular',
    fontSize: 14,
    paddingHorizontal: 10,
    color: 'black',
  },
  formPicker: {
    flex: 1,
  },
  formButtonTouch: {
    width: '95%',
    height: 45,
    marginVertical: 10,
    alignSelf: 'center',
  },
  formButtonBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 118, 255, 0.7)',
    // backgroundColor: 'rgba(129, 199, 132, 1)',
    // backgroundColor: 'rgba(76, 217, 100, 0.7)',
    backgroundColor: 'rgba(0, 122, 255, 0.7)',
    ...Platform.select({
      ios: {
        borderRadius: 8,
      }
    }),
  },
  formButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Regular'
  }

});

export default styles;