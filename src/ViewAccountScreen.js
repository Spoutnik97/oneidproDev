import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import {
  Container, Content, Text, Card, CardItem, Body,
} from 'native-base';
import {
  FieldOneID, Button, fetchOneID, Divider,
} from './react-native-oneid';

import styles from './Styles/style';
import colour from './Styles/colors';


export default class ViewAccountScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Fiche participant',
    headerStyle: { backgroundColor: colour.primary },
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      event: params ? params.event : null,
      user: params ? params.user : null,
      generate_contract: params ? params.generate_contract : false,
      readyToRender: false,
    };
  }

  UNSAFE_componentWillMount() {
    if (this.state.user && this.state.event) {
      this.setState(prev => ({ labels_req: [...prev.event.askFields, ...prev.event.isNotAsked], readyToRender: true }));
    }
  }

  reGenerateContract() {
    const labels = {};
    Object.keys(this.state.user).map((label) => {
      labels[label] = this.state[label] || ' ';
      return true;
    });


    AsyncStorage.multiGet(['proservice', 'token', 'email']).then((values) => {
      const proservice = values[0][1];
      const token = values[1][1];
      const email = values[2][1];
      const data = `labels=${JSON.stringify(labels)}&email=${email}`;

      fetchOneID('POST', `api/generate/${proservice}`, token, data).then((response) => {
        if (response.success) {
          Alert.alert('Succès', 'Votre contrat a été regénéré et enregistré');
        } else {
          Alert.alert('Echec', 'Votre contrat n\'a pas pu être regénéré.');
        }
      });
    });
  }

  render() {
    if (this.state.readyToRender) {
      return (
        <Container>
          <Content>
            <Card style={{ paddingBottom: 24 }}>
              <CardItem header bordered style={{ alignItems: 'center' }}>
                <Body style={styles.body}>
                  <Text style={styles.header}>{`${this.state.user.given_name} ${this.state.user.family_name}`}</Text>
                  <Text note>{this.state.user.school}</Text>
                </Body>
              </CardItem>

              {
                this.state.labels_req.map((lab) => {
                  let label;
                  if (typeof lab === 'object') {
                    label = lab.key;
                  } else {
                    label = lab;
                  }

                  if (label !== 'divider') {
                    return (
                      <FieldOneID
                        key={label}
                        label={lab}
                        value={this.state.user[label]}
                        displayValue
                      />
                    );
                  }
                  return false;
                })
            }

              {
                this.state.generate_contract ? (
                  <CardItem header bordered style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                      onPress={() => this.reGenerateContract()}
                    >
                      {'Générer un contrat'}
                    </Button>
                  </CardItem>) : null
              }
            </Card>
          </Content>
        </Container>
      );
    }

    return (
      <View style={{}} />
    );
  }
}
