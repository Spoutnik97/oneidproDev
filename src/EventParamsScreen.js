import React, { Component } from 'react';
import {
  View, TouchableHighlight, AsyncStorage, Alert, Share, ScrollView,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  Container, Content, Text, Body, Thumbnail, List, ListItem, Icon,
} from 'native-base';
import Modal from 'react-native-modal';
import {
  Button, Chip, Divider, InputOneID, fetchOneID, translate,
} from './react-native-oneid';


import styles from './Styles/style';
import colour from './Styles/colors';

export default class EventParamsScreen extends Component {
  static propTypes = {
  }

  static defaultProps = {
  };

  static navigationOptions = {
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      event: params.event,
      chips: params.event.teamMates || [],
    };
  }

  deleteEvent = () => {
    Alert.alert(
      'Attention !',
      'En continuant, votre évènement sera effacé. Vous n\'aurez plus accès aux bases de données de celui-ci, et personne ne pourra plus s\'y inscrire. Cette opération est irréversible !',
      [
        { text: 'Annuler', onPress: () => {}, style: 'cancel' },
        {
          text: 'Continuer',
          onPress: async () => {
            AsyncStorage.getItem('token').then((token) => {
              fetchOneID('GET', `api/pro/form/delete/${this.state.event.proservice}`, token, '').then((response) => {
                if (response) {
                  AsyncStorage.getItem('events').then((eventsString) => {
                    if (eventsString) {
                      const events = JSON.parse(eventsString);

                      const newEvents = [];
                      events.forEach((event) => {
                        if (event.proservice !== this.state.event.proservice) {
                          newEvents.push(event);
                        }
                      });

                      AsyncStorage.setItem('events', JSON.stringify(newEvents)).then(() => {
                        const resetAction = StackActions.reset({
                          key: null,
                          index: 0,
                          actions: [NavigationActions.navigate({ routeName: 'Events' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                      });
                    }
                  });
                } else {
                  Alert.alert('Erreur', 'Impossible de supprimer votre évènement sur les serveurs de OneID');
                }
              });
            });
          },
        },
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem header bordered>
              <Thumbnail
                large
                square
                source={{ uri: `https://storage.googleapis.com/oneid-207910.appspot.com/logos/${this.state.event.logo || 'nologo.png'}` }}
                style={{ width: 100, height: 100 }}
              />
              <Body style={[styles.body, { alignItems: 'flex-start' }]}>
                <Text style={styles.header}>{this.state.event.name}</Text>
                <Text note>{this.state.event.organizer}</Text>
              </Body>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                Share.share({
                  message: `[${this.state.event.name}] \n Inscrits toi à l'évènement avec OneID : http://www.myoneid.fr/form/${this.state.event.proservice}`,
                  url: `http://www.myoneid.fr/form/${this.state.event.proservice}`,
                  title: this.state.event.name,
                }, {
                  // Android only:
                  dialogTitle: 'Partagez l\'url de votre évènement',
                });
              }}
            >
              <Text style={styles.label}>{'Code de l\'évènement : '}</Text>
              <Text selectable style={styles.subHeader}>{`${this.state.event.proservice}`}</Text>
              <Icon name="share" style={{ color: colour.accent, marginLeft: 24 }} />
            </ListItem>
            <ListItem
              button
            >
              <Text style={styles.label}>Co-organisateurs : </Text>
              <Text selectable style={styles.subHeader}>{this.state.event.teamMates ? `${this.state.event.teamMates.length}` : 'aucuns'}</Text>
              <Icon name="create" style={{ color: colour.accent, marginLeft: 24 }} />
            </ListItem>
            <ListItem key="askFields" style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={styles.subHeader}>Champs demandés</Text>
              <List>
                {
                  this.state.event.askFields.map((lab) => {
                    let label;
                    let labelDisplayed;
                    if (typeof lab === 'object') {
                      label = lab.key;
                      labelDisplayed = lab.title;
                    } else {
                      label = lab;
                      labelDisplayed = lab;
                    }
                    if (label.indexOf('divider') === -1) {
                      return (
                        <ListItem key={label} noBorder style={{ paddingTop: 0, paddingBottom: 10 }}>
                          <Text style={styles.label}>{translate(labelDisplayed)}</Text>
                        </ListItem>
                      );
                    }
                    return (null);
                  })
                }
              </List>
            </ListItem>
            <ListItem key="options" style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.subHeader}>Options</Text>
              <List style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                {
                  this.state.event.color ? (
                    <ListItem style={{ flexDirection: 'column' }}>
                      <Text style={styles.label}>Couleur personnalisée : </Text>
                      <Text style={[styles.note, { backgroundColor: this.state.event.color }]}>{this.state.event.color}</Text>
                    </ListItem>
                  ) : null
                }
                <ListItem style={{ flexDirection: 'column' }}>
                  <Text style={styles.label}>{'Autoriser une liste d\'attente : '}</Text>
                  <Text style={styles.note}>{this.state.event.waitingList ? 'Oui' : 'Non'}</Text>
                </ListItem>
                <ListItem style={{ flexDirection: 'column' }}>
                  <Text style={styles.label}>Limite de participants : </Text>
                  <Text style={styles.note}>{this.state.event.limit}</Text>
                </ListItem>
                {
                  this.state.event.remoteAPI && (
                    <ListItem noBorder style={{ flexDirection: 'column' }}>
                      <Text style={styles.label}>{'URL de l\'API distante : '}</Text>
                      <Text style={styles.note}>{this.state.event.remoteAPI}</Text>
                    </ListItem>
                  )
                }
                <ListItem style={{ flexDirection: 'column' }}>
                  <Text style={styles.label}>Garder une copie de la base de donnée</Text>
                  <Text style={styles.note}>{this.state.event.keepCopy ? 'Oui' : 'Non'}</Text>
                </ListItem>
              </List>
            </ListItem>

            <Button
              onPress={() => {
                this.deleteEvent();
              }}
            >
              {'Supprimer cet évènement'}
            </Button>
          </List>
        </Content>
      </Container>
    );
  }
}
