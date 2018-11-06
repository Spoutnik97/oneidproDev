import React from 'react';
import {
  Text, View, Image, AsyncStorage, Alert, TouchableHighlight,
} from 'react-native';
import {
  Form, StyleProvider, Container, Content, Spinner,
} from 'native-base';

import { SecureStore } from 'expo';

import {
  Button, Toast, InputOneID, fetchOneID,
} from './react-native-oneid';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import styles from './Styles/style';
import colour from './Styles/colors';

import connect from './Tests/SigninTest';
import Config from '../env';

const xhr = new XMLHttpRequest();
const { API_URI } = Config;
const imgLogo = require('../images/logoPro.png');

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      readyToRender: false,
      user: params ? params.user : null,
      password: params ? params.password : null,
      proservice: params && params.proservice ? params.proservice : null,
    };
  }

  // récupère le jeton JWT auprès du serveur pour identification


  componentDidMount() {
    if (!this.state.user || !this.state.password) {
      try {
        SecureStore.getItemAsync('password').then((password) => {
          AsyncStorage.getItem('user').then((user) => {
            this.setState({ password, user: JSON.parse(user), readyToRender: true });
          }).catch(err => console.error(err));
        });
      } catch (e) {
        console.error(`${e.name} : ${e.message}`);
      }
    } else {
      this.setState({ readyToRender: true });
    }

    if (Config.ENV === 'dev') {
      this.setState({ password: 'Azertyu8', psw: 'Azertyu8' });
    }
  }

  getJWT(oneid, password) {
    xhr.abort();
    const data = `oneid=${oneid}&password=${password}`;

    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.responseText && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);

          if (response.success) {
            if (this.state.proservice && this.state.user) {
              this.connectEvent(response.token);
            }

            AsyncStorage.setItem('token', response.token).then(() => {
              Toast.show('Authentification réussie !');
              AsyncStorage.setItem('offline', JSON.stringify(false));
              this.props.navigation.navigate('App', { offline: false });
              return true;
            });
          } else {
            Toast.show('Connexion à l\'application impossible...');
            Alert.alert('Erreur', response.message);
            return false;
          }
        } else {
          console.log(`Mode hors connexion, status : ${xhr.status}`);
          Toast.show('Mode hors connexion :(');
          AsyncStorage.setItem('offline', JSON.stringify(true));
          this.props.navigation.navigate('App', { offline: true });
          return true;
        }
      }
      return false;
    });
    xhr.open('POST', `${API_URI}api/pro/authenticate`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(data);
  }

  connectEvent = (token) => {
    fetchOneID('POST', `api/pro/connect/${this.state.proservice}`, token, `email=${this.state.user.email}`).then((responseConnect) => {
      if (responseConnect.success) {
        AsyncStorage.getItem('events').then((evts) => {
          const events = JSON.parse(evts);
          events.push(responseConnect.event);
          AsyncStorage.setItem('events', JSON.stringify(events));
        });
      } else {
        Alert.alert('Erreur', 'Vous n\'êtes pas autorisé à vous connecter à cet évènement. Contactez l\'organisateur pour être autorisé.');
      }
    });
  }

  render() {
    if (Config.ENV === 'test' && this.state.readyToRender) {
      const boundConnect = connect.bind(this);
      boundConnect(this.state.user.oneid);
    }

    if (this.state.readyToRender) {
      return (
        <StyleProvider style={getTheme(material)}>

          <Container style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <View style={styles.statBar} />
            <Content>
              <View style={{
                marginTop: 62, marginBottom: 24, justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Image resizeMode="contain" style={{ height: 120 }} source={this.state.proservice ? { uri: `https://storage.googleapis.com/oneid-207910.appspot.com/logos/${this.state.proservice}.png` } : imgLogo} />
              </View>

              <Text style={{
                marginBottom: 5, color: colour.darklighter, fontSize: 25, fontWeight: 'bold', textAlign: 'center',
              }}
              >
                {this.state.proservice ? 'Connectez vous pour ajouter cet évènement' : 'OneID Pro'}
              </Text>
              <Text style={{
                marginBottom: 24, color: colour.secondary, fontSize: 10, textAlign: 'center',
              }}
              >
                {`Version ${Config.VERSION}`}
              </Text>

              <Form>
                <InputOneID
                  label="password"
                  displayLabel="Mot de passe OneID"
                  noLogo
                  onChangeText={val => this.setState({ psw: val })}
                />
              </Form>

              <Button
                icon="log-in"
                onPress={() => {
                  if (this.state.password === this.state.psw) {
                    this.getJWT(this.state.user.oneid, this.state.psw);
                  } else {
                    Toast.show('Mot de passe incorrect !');
                  }
                }}
              >
                {'Je m\'identifie'}
              </Button>

              <TouchableHighlight
                style={{ marginTop: 56, alignSelf: 'center' }}
                underlayColor="transparent"
                onPress={async () => {
                  Alert.alert(
                    'Attention',
                    'En continuant tout votre compte sera effacé. Les données associées également. Cette opération est irréversible !',
                    [
                      { text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                      {
                        text: 'Continuer',
                        onPress: async () => {
                          AsyncStorage.clear((e) => { console.log(e); this.props.navigation.navigate('Begin'); });
                        },
                      },
                    ],
                    { cancelable: false },
                  );
                }}
              >
                <Text style={[styles.textButton, { color: colour.secondary, fontSize: 14, fontWeight: 'normal' }]}>{ 'J\'ai oublié mon mot de passe' }</Text>
              </TouchableHighlight>
            </Content>
          </Container>
        </StyleProvider>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>OneID récupère les informations nécessaires...</Text>
        <Spinner />
      </View>
    );
  }
}
