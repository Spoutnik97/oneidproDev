import React, { Component } from 'react';
import {
  View, TouchableHighlight, AsyncStorage, Alert, TouchableOpacity,
} from 'react-native';
import {
  Container, Content, Icon, Text, Spinner, List, ListItem,
} from 'native-base';
import Modal from 'react-native-modal';

import {
  Button, InputOneID, fetchOneID,
} from './react-native-oneid';

import colour from './Styles/colors';
import styles from './Styles/style';

export default class InfosScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Mon profil Pro',
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['user', 'token'], (err, values) => {
      this.setState({ user: JSON.parse(values[0][1]), token: values[1][1], readyToRender: true });
    });
  }

  render() {
    if (this.state.readyToRender) {
      return (
        <Container>
          <Content>
            <TouchableHighlight
              style={[styles.fabButton, {
                backgroundColor: 'transparent', elevation: 0, right: 8, top: 8, bottom: null,
              }]}
              underlayColor="white"
              onPress={() => {
                this.props.navigation.navigate('AuthLoading');
              }}
            >
              <Icon name="power" style={{ color: colour.secondarydark }} />
            </TouchableHighlight>

            <List style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
              <ListItem style={{ flexDirection: 'column' }}>
                <Text style={styles.label}>Identifiant OneID</Text>
                <Text selectable style={styles.note}>{this.state.user.oneid}</Text>
              </ListItem>
              <ListItem
                style={{ flexDirection: 'column' }}
              >
                <Text style={styles.label}>Email</Text>
                <Text style={styles.note}>{this.state.user.email}</Text>
              </ListItem>
              <ListItem style={{ flexDirection: 'column' }}>
                <Text style={styles.label}>Offre</Text>
                <Text style={styles.note}>{this.state.user.plan}</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>OneID récupère vos informations...</Text>
        <Spinner />
      </View>
    );
  }
}
