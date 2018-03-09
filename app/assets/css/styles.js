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
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
    // backgroundColor: 'rgba(20, 149, 95, 0.3)', // #14955F
    // backgroundColor: 'rgba(26, 170, 142, 0.7)', // #1AAA8E
  },
  productRow: {
    alignSelf: 'stretch',
    height: 160,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  productTouch: {
    flex: 1,
  },
  productBox: {
    flex: 1,
    height: 160,
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
});

export default styles;