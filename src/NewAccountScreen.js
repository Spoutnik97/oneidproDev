import React from 'react';
import {
  View, Text, AsyncStorage, Alert,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  Container, Content, Form, Spinner, Card, CardItem, Body,
} from 'native-base';

import { FileSystem, MediaLibrary } from 'expo';
import {
  FieldOneID, randomString, Button, fetchOneID, Toast, sendImage,
} from './react-native-oneid';

import Config from '../env';

import colour from './Styles/colors';
import styles from './Styles/style';

const { documentLabels } = Config;

export default class NewAccountScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Ajouter un participant',
    headerStyle: { backgroundColor: colour.primary },
  };


  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      event: params.event || null,
      token: params.token || null,
      isQrCode: false,
      oneidpro: params.user ? params.user.oneid : null,
      emailTo: params.user ? params.user.email : null,
      isNotRequired: params.event && params.event.isNotRequired ? params.event.isNotRequired : [],
      oneid: params.oneid || null,

      labels_req: params && params.labels_req ? params.labels_req : null,
      labels_res: params.isQrCode ? params.labels_res : null,
    };
    this.inputs = {};
  }

  async UNSAFE_componentWillMount() {
    if (this.state.oneidpro && this.state.event && this.state.emailTo && this.state.token) {
      if (!this.state.labels_req) {
        this.setState(prev => ({ labels_req: [...prev.event.askFields, ...prev.event.isNotAsked], readyToRender: true }));
      } else {
        this.setState({ readyToRender: true });
      }
    } else if (this.state.event) {
      AsyncStorage.multiGet(['user', 'token'], (err, values) => {
        const user = JSON.parse(values[0][1]);
        this.setState(prev => ({
          user, token: values[1][1], oneidpro: user.oneid, emailTo: user.oneid, labels_req: [...prev.event.askFields, ...prev.event.isNotAsked], readyToRender: true,
        }));
      });
    } else {
      Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez rééssayer svp');
    }
  }


  areFieldsValidated() {
    let validate = true;
    let isValue = false;

    if (this.state.password && this.state.confirm_password) {
      if (this.state.password !== this.state.confirm_password) {
        Alert.alert('Les deux mots de passe ne sont pas les mêmes !');
        this.setState({ password_required: true, confirm_password_required: true });
        return false;
      }
    }

    this.state.labels_req.forEach((lab) => {
      let label;
      if (typeof lab === 'object') {
        label = lab.key;
      } else {
        label = lab;
      }

      if (this.state.event.isNotRequired && this.state.event.isNotRequired.indexOf(label) === -1 && label.indexOf('divider') === -1) {
        isValue = (this.state.labels_res && this.state.labels_res[label] && this.state.labels_res[label] !== ' ') || (this.state[label] && this.state[`validate_${label}`]);
        validate = validate && isValue;
        if (!this.state[label] || this.state[label] === ' ' || !this.state[`validate_${label}`]) {
          this.setState({ [`${label}_required`]: true });
        } else {
          this.setState({ [`${label}_required`]: false });
        }
      }
    });

    return validate;
  }

  saveAccount() {
    AsyncStorage.getItem(`zdb_${this.state.event.proservice}`).then((result) => {
      let db = [];
      let sumMarks = 0;
      let isMarks = 0;
      if (result) {
        db = JSON.parse(result);
      }

      const oneid = this.state.oneid ? this.state.oneid : `oneidpro_${randomString(10)}`;
      const newAccount = {
        key: oneid,
        oneidpro: this.state.oneidpro,
        oneid,
      };
      const newAccountOnline = {
        key: oneid,
        oneidpro: this.state.oneidpro,
        oneid,
      };
      const forAnalytics = [];

      this.state.labels_req.map(async (lab) => {
        let label;
        if (typeof lab === 'object') {
          label = lab.key;
        } else {
          label = lab;
        }

        const value = this.state[label] || ' ';

        // si le label est un document
        if (documentLabels.indexOf(label) !== -1 && value) {
          if (value !== ' ') {
            await sendImage(this.state.token, value, `${oneid}_${label}`, `zdb_${this.state.event.proservice}`).then((cloudUri) => {
              newAccount[label] = value;
              newAccountOnline[label] = cloudUri || ' ';
            });
          }
        } else {
          if (label.indexOf('divider_') === -1) {
            newAccount[label] = value;
            newAccountOnline[label] = value;
          }
          if (label.indexOf('mark_') !== -1) {
            sumMarks += this.state[label] || 0;
            isMarks += 1;
          }

          // analytics
          if (typeof lab === 'object' && lab.labels && value) {
            const fieldAnalytics = { ...lab, count: [] };
            lab.labels.forEach((val) => {
              if (val === value) {
                fieldAnalytics.count.push(1);
              } else {
                fieldAnalytics.count.push(0);
              }
            });
            forAnalytics.push(fieldAnalytics);
          }
        }
      });
      if (isMarks !== 0) {
        newAccount.sumMarks = sumMarks;
        newAccount.averageMarks = sumMarks / isMarks;
        newAccountOnline.sumMarks = sumMarks;
        newAccountOnline.averageMarks = sumMarks / isMarks;
      }
      db.push(newAccount);

      const data = `labels_res=${JSON.stringify(newAccountOnline)}&oneid=${this.state.oneid}&remoteAPI=${this.state.event.remoteAPI || false}&forAnalytics=${JSON.stringify(forAnalytics)}`;
      fetchOneID('POST', `api/proservices/newaccount/${this.state.event.proservice}`, this.state.token, data).then((res) => {
        if (res.success) {
          Toast.show('Profil enregistré en ligne');
        } else {
          Toast.show('Erreur réseau : pas de sync...');
        }
      }).catch(err => Alert.alert('Erreur', `Le profil n'a pas pu être enregistré en ligne. Une erreur réseau s'est produite : ${err}`));

      AsyncStorage.setItem(`zdb_${this.state.event.proservice}`, JSON.stringify(db)).then(() => {
        const resetAction = StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Events' }),
            NavigationActions.navigate({ routeName: 'ViewEvent', params: { event: this.state.event } }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      });
    });
  }

  render() {
    if (this.state.readyToRender) {
      return (
        <Container>
          <Content>
            <Card>
              <CardItem header bordered style={{ alignItems: 'center' }}>
                <Body style={styles.body}>
                  <Text style={styles.header}>{this.state.event.name}</Text>
                </Body>
              </CardItem>

              <Form style={{ backgroundColor: '#fff' }}>
                {
                    this.state.labels_req.map((lab, index, tab) => {
                      console.log(`JSON.stringify(lab) : ${JSON.stringify(lab)}`);

                      let value = null;

                      let label;
                      if (typeof lab === 'object') {
                        label = lab.key;
                      } else {
                        label = lab;
                      }

                      if (this.state.isQrCode) {
                        value = this.state[label] || this.state.labels_res[label] || null;
                      }

                      return (
                        <FieldOneID
                          key={label}
                          label={lab}
                          inputRef={r => this.inputs[label] = r}
                          returnKeyType={this.inputs[tab[index + 1]] ? 'next' : 'done'}
                          value={this.state.isQrCode ? value : null}
                          prefix={this.state.prefix}
                          onChange={(val) => { this.setState({ [label]: val }); }}
                          onSubmitEditing={() => {
                            if (tab.length !== index + 1 && this.inputs[tab[index + 1]]) this.inputs[tab[index + 1]].focus();
                          }}
                          onEndEditing={() => {
                            if (this.state.given_name && this.state.family_name) {
                              this.setState(prev => ({ prefix: `${prev.family_name}_${prev.given_name}` }));
                            }
                          }}
                          required={this.state[`${label}_required`]}
                          onValidate={val => this.setState({ [`validate_${label}`]: val })}
                        />
                      );
                    })
                }
                {
                  this.state.isAvg
                    ? (
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.header}>Moyenne : </Text>
                        <Text style={styles.header}>{(this.state.mark1 + this.state.mark2) / 2}</Text>
                      </View>
                    ) : null
                }


              </Form>
              <CardItem footer style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    if (this.areFieldsValidated()) {
                      this.saveAccount();
                    } else {
                      Alert.alert('Saisie incomplètes', 'Des champs obligatoires n\'ont pas été remplis, ou mal remplis');
                    }
                  }}
                >
                  Enregistrer le candidat
                </Button>
              </CardItem>
            </Card>
          </Content>
        </Container>
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
