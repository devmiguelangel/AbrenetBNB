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
  modalContainer: {
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
    fontFamily: 'Poppins-Medium',
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
  },
});

export default styles;