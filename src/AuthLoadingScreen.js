import React from 'react';
import {
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { Spinner } from 'native-base';
import { AppLoading, SecureStore, Linking } from 'expo';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  // Fetch the token from storage then navigate to our appropriate place
  getOneidAsync = async () => new Promise(async (resolve, reject) => {
    try {
      const url = await Linking.getInitialURL();

      // AsyncStorage.clear();
      AsyncStorage.getItem('user').then(async (user) => {
        if (user) {
          let proservice = null;
          if (url) {
            if (url.indexOf('/connect') !== -1) {
              const pathSliced = url.split('/');
              proservice = pathSliced[pathSliced.indexOf('connect') + 1];
            }
          }
          await SecureStore.getItemAsync('password').then((value) => {
            this.setState({
              user: JSON.parse(user), route: 'SignIn', password: value, proservice,
            });
          }).catch(err => console.error(err));
        } else {
          this.setState({ route: 'Start' });
        }
        resolve();
      });
    } catch (error) {
      console.log(error);
      throw error;
      reject(error);
    }
  });


  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.getOneidAsync}
          onFinish={() => { this.props.navigation.navigate(this.state.route, this.state.user ? { user: this.state.user, password: this.state.password, proservice: this.state.proservice } : null); }}
          onError={console.warn}
          autoHideSplash
        />
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar barStyle="default" />
        <Spinner />
      </View>
    );
  }
}
