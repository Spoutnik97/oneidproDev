import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
import variables from '../../native-base-theme/variables/platform';

import colour from './colors';

const { width } = Dimensions.get('window');

const ratio = 16.0 / 9.0;

const h = width / ratio;

export default StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    // margin:10,
    overflow: 'hidden',
    elevation: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    padding: 10,
    color: colour.secondarydark,
    fontWeight: 'bold',
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  text: {
    color: colour.secondarydark,
    fontSize: 15,
    textAlign: 'left',
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  header: {
    color: colour.secondarydark,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  subHeader: {
    color: colour.secondarydark,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  button: {
    width: 30,
    height: 25,
  },

  buttonLabel: {
    color: colour.secondary,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  flatButton: {
    backgroundColor: colour.primary,
    paddingLeft: 24,
    paddingRight: 24,
    margin: 24,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },

  value: {
    color: colour.primary,
    fontSize: 17,
  },

  label: {
    color: colour.label,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  profileHeader: {
    backgroundColor: colour.primary,
    height: h,
    width,
  },
  statBar: {
    height: 24,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureProfile: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  fabButton: {
    backgroundColor: colour.accent,
    position: 'absolute',
    bottom: 24,
    right: 24,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  textButton: {
    color: colour.secondarydark,
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  textForButton: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

  left: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    marginRight: 16,
  },

  body: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 3,
  },

  listItem: {
    flexDirection: 'row',
    padding: 24,
  },

  input: {
    height: variables.inputHeightBase,
    color: '#2eb4b1',
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize,
    lineHeight: variables.inputLineHeight,
    fontFamily: Constants.platform.android ? 'Roboto' : 'Avenir',
  },

});
