import React, { Component } from 'react';
import {
  View, TouchableHighlight, AsyncStorage, TouchableOpacity,
} from 'react-native';
import {
  Container, Content, Icon, Text, Spinner, Body, Thumbnail, List, ListItem,
} from 'native-base';

import newForm from './Tests/EventsTest';
import Config from '../env';

import colour from './Styles/colors';
import styles from './Styles/style';

export default class EventsScreen extends Component {
  static propTypes = {
  }

  static defaultProps = {
  };

  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Mes évènements',
    headerTitle: 'Mes évènements',
    headerRight: (
      <TouchableOpacity style={{ height: 30, borderRadius: 15, marginRight: 24 }} onPress={() => navigation.navigate('InfosScreen')}>
        <Icon
          name="settings"
          style={{ color: colour.secondary }}
        />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('events').then((events) => {
      this.setState({ events: JSON.parse(events), readyToRender: true });
    });
  }

  render() {
    if (Config.ENV === 'test' && this.state.readyToRender) {
      const boundConnect = newForm.bind(this);
      boundConnect();
    }

    if (this.state.readyToRender) {
      if (this.state.events && this.state.events.length > 0) {
        return (
          <Container>
            <Content>
              <List>
                {
                  this.state.events.map(item => (
                    <ListItem
                      key={item.proservice}
                      style={{ marginLeft: 24, marginRight: 24 }}
                      onPress={() => {
                        this.props.navigation.navigate('ViewEvent', { event: { ...item }, eventName: item.name });
                      }}
                    >
                      <Thumbnail square size={80} source={{ uri: `https://storage.googleapis.com/oneid-207910.appspot.com/logos/${item.logo}` }} />
                      <Body style={{ marginLeft: 24 }}>
                        <Text>{item.name}</Text>
                        <Text note>{item.organizer}</Text>
                      </Body>
                      <Icon name="arrow-forward" size={15} />

                    </ListItem>
                  ))
                }
              </List>
            </Content>
            <TouchableHighlight
              style={styles.fabButton}
              underlayColor="white"
              onPress={() => { this.props.navigation.navigate('CreateForm'); }}
            >
              <Icon name="add" style={{ color: 'white' }} />
            </TouchableHighlight>
          </Container>
        );
      }
      return (
        <Container>
          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
          }}
          >
            <Text style={[styles.text, { textAlign: 'center' }]}>Commencez par créer ou ajouter un évènement !</Text>
          </View>
          <TouchableHighlight
            style={styles.fabButton}
            underlayColor="white"
            onPress={() => { this.props.navigation.navigate('CreateForm'); }}
          >
            <Icon name="add" style={{ color: 'white' }} />
          </TouchableHighlight>
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
