import React, { Component } from 'react';
import {
  View, AsyncStorage, Alert,
} from 'react-native';
import {
  Container, Content, Text, Card, CardItem,
} from 'native-base';
import {
  Button, randomString, fetchOneID,
} from './react-native-oneid';

import styles from './Styles/style';


export default class CreateFormScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Créer un évènement',
  }

  constructor(props) {
    super(props);
    this.state = {
      proservice: null,
      keepCopy: true,
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['user', 'token', 'events'], (err, values) => {
      this.setState({
        user: JSON.parse(values[0][1]), token: values[1][1], events: JSON.parse(values[2][1]), readyToRender: true,
      });
    });
  }

  saveForm = async () => {
    const event = {};
    event.proservice = this.state.proservice && this.state.validate_proservice ? this.state.proservice : randomString(6);

    const askFields = [
      { key: 'divider_identity', title: 'Identité' },
      'given_name', 'family_name',
      { key: 'divider_documents', title: 'Documents' },
      'passport',
      { key: 'divider_special_fields', title: 'Champs spéciaux' },
      {
        key: 'question_simple', title: 'Question Simple', labels: ['Question Simple'], values: ['question_simple'],
      },
      {
        key: 'multi_commentaires', title: 'Commentaires', labels: ['Commentaires'], values: ['multi_commentaires'],
      },
      { key: 'mark_eval', title: 'Une évaluation' },
      {
        key: 'picker_deroulante', title: 'Liste déroulante', labels: ['Choix 1', 'Choix 2', 'Choix 3'], values: ['choice_1', 'choice_2', 'choice_3'],
      },
    ];
    const isNotRequired = ['passport', 'multi_commentaires'];
    const isNotAsked = [{ key: 'mark_eval_pro', title: 'Une évaluation pro' }];

    // construit l'objet event
    if (this.state.color && !this.state.validate_color) {
      Alert.alert('Couleur personnalisée', 'Votre couleur doit contenir un # suivi de 6 caractère hexadécimaux. Exemple : #A2FFD3');
      return false;
    }
    event.color = this.state.color || null;
    event.name = `Evenement test ${randomString(3)}`;
    event.organizer = this.state.organizer;
    event.logo = 'nologo.png';
    event.askFields = askFields;
    event.limit = this.state.limit ? parseInt(this.state.limit, 10) : 9999;
    event.waitingList = this.state.waitingList || false;
    event.isNotAsked = isNotAsked;
    event.isNotRequired = isNotRequired;
    event.keepCopy = this.state.keepCopy;
    event.remoteAPI = this.state.remoteAPI || null;
    event.onlyMobile = this.state.onlyMobile || false;

    // enregistre l'ojbect event
    const data = `oneid=${this.state.user.oneid}&event=${JSON.stringify(event)}`;
    fetchOneID('POST', 'api/pro/form', this.state.token, data).then((response) => {
      if (response.success) {
        const newEvents = this.state.events || [];
        event.role = 'admin';
        event.teamMates = [];
        newEvents.push(event);
        AsyncStorage.setItem('events', JSON.stringify(newEvents)).then(() => this.setState({ proservice: event.proservice }));
        this.props.navigation.goBack();
        return true;
      }
      Alert.alert('Erreur', 'Une erreur est survenue :(');
      return false;
    });
  }

  render() {
    if (this.state.readyToRender) {
      return (
        <Container>
          <Content>
            <Card>
              <CardItem header bordered>
                <Text style={styles.subHeader}>Créer un évènement</Text>
              </CardItem>

              <Button
                onPress={() => {
                  this.saveForm();
                }}
              >
                {'Créer un évènement test'}
              </Button>
            </Card>
          </Content>
        </Container>
      );
    }
    return (
      <View />
    );
  }
}
