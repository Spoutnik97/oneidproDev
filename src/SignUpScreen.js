import React from 'react';
import {
  Text, View, Image, AsyncStorage, ScrollView, Alert,
} from 'react-native';
import {
  Container, Content, Form, StyleProvider,
} from 'native-base';
import { SecureStore } from 'expo';

import {
  Button, fetchOneID, InputOneID, randomString,
} from './react-native-oneid';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import styles from './Styles/style';
import colour from './Styles/colors';

import Config from '../env';

const imgLogo = require('../images/logo.png');

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Renseignez vos données',
    headerMode: 'screen',
    headerStyle: { backgroundColor: colour.primary, height: 56 },
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      plan: params ? params.plan : 'lite',
      password: '',
      passwordConfirm: '',
      email: '',
    };
    this.inputs = {};
  }

  areFieldsValidated() {
    let validate = true;
    let isValue = false;
    ['email', 'password', 'passwordConfirm'].forEach((label) => {
      isValue = this.state[label] && this.state[`validate_${label}`];
      validate = validate && isValue;

      if (!this.state[label] || this.state[label] === ' ' || !this.state[`validate_${label}`]) {
        this.setState({ [`${label}_required`]: true });
      } else {
        this.setState({ [`${label}_required`]: false });
      }
    });
    return validate;
  }

  async signup() {
    const oneid = randomString(10);
    const data = `password=${this.state.password}&oneid=${oneid}&email=${this.state.email}&plan=${this.props.plan}&code=${this.state.code || null}`;
    fetchOneID('POST', 'api/pro/new', '', data).then((response) => {
      if (response) {
        if (response.success) {
          SecureStore.setItemAsync('password', this.state.password);
          const plan = response.plan || 'lite';
          const { events } = response;
          const user = { oneid, email: this.state.email, plan };

          AsyncStorage.multiSet([
            ['user', JSON.stringify(user)],
            ['events', JSON.stringify(events)],
          ])
            .then(() => {
              Alert.alert('Enregistrement réussi', 'Vos informations sont maintenant chiffrées sur votre téléphone. Connectez vous pour continuer.', [
                { text: 'Je me connecte', onPress: () => this.props.navigation.navigate('SignIn', { user, password: this.state.password }) }]);
            }).catch(err => console.error(err));
        } else {
          console.log(`Erreur to create new user. ${response.message}`);
          Alert.alert('Erreur', response.message);
        }
      } else {
        Alert.alert('Erreur de connexion', 'Le serveur ne répond pas. Veuillez rééssayer plus tard svp...');
      }
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Content>
            <View style={{ margin: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Image resizeMode="contain" style={{ height: 70 }} source={imgLogo} />
            </View>

            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.header}>{this.props.plan}</Text>
              <Text style={styles.subHeader}>Identifiez-vous pour la première fois</Text>

              <Text style={[styles.text, { textAlign: 'left', marginLeft: 24 }]}>Utilisez au moins 8 caractères dont 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial</Text>

              <Form key="password">
                <InputOneID
                  label="email"
                  displayLabel="Email"
                  inputRef={r => this.inputs.email = r}
                  returnKeyType="next"
                  onChangeText={(value) => {
                    this.setState({ email: value });
                  }}
                  onSubmitEditing={() => {
                    this.inputs.password.focus();
                  }}
                  required={this.state.email_required}
                  onValidate={(val) => {
                    this.setState({ validate_email: val });
                  }}
                />
                <InputOneID
                  label="password"
                  displayLabel="Mot de passe OneID"
                  inputRef={r => this.inputs.password = r}
                  returnKeyType="next"
                  onChangeText={(value) => {
                    this.setState({ password: value });
                  }}
                  onSubmitEditing={() => {
                    this.inputs.passwordConfirm.focus();
                  }}
                  required={this.state.password_required}
                  onValidate={(val) => {
                    this.setState({ validate_password: val });
                  }}
                />
                <InputOneID
                  label="password"
                  displayLabel="Confirmation"
                  inputRef={r => this.inputs.passwordConfirm = r}
                  returnKeyType={this.props.plan === 'lite' ? 'done' : 'next'}
                  onChangeText={(value) => {
                    this.setState({ passwordConfirm: value });
                  }}
                  required={this.state.passwordConfirm_required}
                  onValidate={(val) => {
                    this.setState({ validate_passwordConfirm: val });
                  }}
                />

                {
                  this.state.plan !== 'lite' && (
                    <InputOneID
                      label="code"
                      displayLabel="Code d'identification"
                      inputRef={r => this.inputs.code = r}
                      returnKeyType="done"
                      onChangeText={(value) => {
                        this.setState({ code: value });
                      }}
                      required={this.state.code_required}
                      onValidate={(val) => {
                        this.setState({ validate_code: val });
                      }}
                    />
                  )
                }

              </Form>

              <Button
                onPress={() => {
                  if (this.state.password && this.state.password === this.state.passwordConfirm) {
                    if (this.areFieldsValidated()) {
                      this.signup();
                    } else {
                      Alert.alert('Saisie incomplètes', 'Des champs obligatoires n\'ont pas été remplis, ou mal remplis. Votre mot de passe doit contenir au moins : \n- 1 majuscule \n- 1 minuscule\n- 1 chiffre ou un caractère spécial (!,@,#,$,&,*)\n - 8 caractères');
                    }
                  } else {
                    Alert.alert('Les deux mots de passe ne sont pas les mêmes !');
                  }
                }}
              >
                {'Valider'}
              </Button>

            </ScrollView>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
