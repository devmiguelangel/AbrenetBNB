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
  header: {
    minHeight: 100,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#1e272e',
    ...Platform.select({
      'ios': {
        paddingTop: 15
      }
    })
  },
  headerBox: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    marginRight: 10,
    // color: '#00a8ff',
    color: '#dff9fb',
    fontSize: 35,
    fontFamily: 'Quicksand-Medium',
  },
  headerLogo: {
    width: 85,
    height: 76
  },
  productList: {
    flex: 2,
    alignSelf: 'stretch',
    // backgroundColor: 'rgba(20, 149, 95, 0.3)', // #14955F
    // backgroundColor: 'rgba(26, 170, 142, 0.7)', // #1AAA8E
  },
  productListBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  productBox: {
    width: 150,
    height: 150,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    flexDirection: 'column',
    // backgroundColor: '#A1D36E'
  },
  productTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },
  navBarBottom: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f7f8ff',
  },
  navBarBottomBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBarBottomView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarBottomText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#576574',
  }
});

export default styles;