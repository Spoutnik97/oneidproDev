import React, { Component } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import {
  StyleProvider, Container, Content, Text, Card, CardItem, Body, Icon,
} from 'native-base';
import { Linking } from 'expo';
import PropTypes from 'prop-types';
import {
  Button, InputOneID, fetchOneID,
} from './react-native-oneid';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import colour from './Styles/colors';
import styles from './Styles/style';

export default class ChoosePlanScreen extends Component {
  static propTypes = {
  }

  static defaultProps = {
  };

  static navigationOptions = {
    headerTitle: 'Choisissez votre forfait',
    headerMode: 'screen',
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  choosePlan = (plan) => {
    this.props.navigation.navigate('SignUp', { plan });
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingHorizontal: 12 }}>
          <Card style={{ padding: 24 }}>
            <CardItem header bordered style={{ backgroundColor: '#00bcd4' }}>
              <Body style={styles.body}>
                <Text style={styles.header}>Lite</Text>
                <Text style={[styles.subHeader, { textAlign: 'left' }]}>Gratuit</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.text}>{'Découvrez qu\'il est possible d\'organiser un évènement du bout des doigts et d\'en gérer les inscriptions sur votre mobile !'}</Text>
            </CardItem>
            <CardItem>
              <Icon name="infinite" style={{ color: '#00bcd4' }} />
              <Text style={styles.text}>{'Nombre d\'évènements illimité'}</Text>
            </CardItem>
            <CardItem>
              <Icon name="people" style={{ color: '#00bcd4' }} />
              <Text style={styles.text}>{'Jusqu\'à 200 participants !'}</Text>
            </CardItem>
            <CardItem>
              <Icon name="pulse" style={{ color: '#00bcd4' }} />
              <Text style={styles.text}>Des statistiques sur les inscrits en temps réel</Text>
            </CardItem>
            <CardItem>
              <Icon name="download" style={{ color: '#00bcd4' }} />
              <Text style={styles.text}>Exportation de vos bases de données sous .csv</Text>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'center' }}>
              <Button onPress={() => this.choosePlan('lite')}>Je choisis cette offre</Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
