import React from 'react';
import {
  View, TouchableHighlight, AsyncStorage,
} from 'react-native';
import {
  Container, Content, Icon, Text, Card, CardItem, Spinner, Tabs, Tab,
} from 'native-base';
import Modal from 'react-native-modal';
import {
  Button, fetchOneID,
} from './react-native-oneid';

import AnalyticsScreen from './AnalyticsScreen';
import EventParamsScreen from './EventParamsScreen';

import styles from './Styles/style';
import colour from './Styles/colors';

const tapBarStyle = {
  tabStyle: { backgroundColor: colour.primarylight },
  textStyle: { color: colour.primary },
  activeTabStyle: { backgroundColor: colour.primarylight },
  activeTextStyle: { color: '#fff', fontWeight: 'bold' },
};

export default class ViewEventScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('eventName', 'Mon évènement'),
  });

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.state = {
      event: params.event || null,
    };
  }

  componentDidMount() {
    try {
      AsyncStorage.multiGet(['user', 'token', 'offline', `zdb_${this.state.event.proservice}`], (err, values) => {
        this.setState({
          user: JSON.parse(values[0][1]),
          token: values[1][1],
          offline: values[2] ? JSON.parse(values[2][1]) : true,
          db: values[3] ? JSON.parse(values[3][1]) : [''],
          readyToRender: true,
        });
      });
    } catch (e) {
      console.error(`${e.name} : ${e.message}`);
    }
  }

  render() {
    const FabButtons = () => {
      return (
        <TouchableHighlight
          style={styles.fabButton}
          underlayColor="white"
          onPress={() => {
            this.props.navigation.navigate('NewAccount', {
              isQrCode: false, event: this.state.event, token: this.state.token, user: this.state.user,
            });
          }}
        >
          <Icon name="add" style={{ color: 'white' }} />
        </TouchableHighlight>
      );
    };

    if (this.state.readyToRender) {
      if (this.state.event) {
        return (
          <Container>
            <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: '#fff' }}>
              <Tab heading="Données" {...tapBarStyle}>
                {
                  this.state.db && this.state.db.length > 0 ? (
                    <Content>
                      {
                        this.state.db.map((item, index) => (
                          <Card key={item.oneid}>
                            <CardItem
                              button
                              onPress={() => {
                                this.props.navigation.navigate('ViewAccount', { event: this.state.event, user: item, generate_contract: this.state.event.generate_contract });
                              }}
                              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                            >
                              <View style={{ flexDirection: 'column' }}>
                                <View>
                                  <Text style={styles.header}>{`${item.given_name ? item.given_name : index} ${item.family_name}`}</Text>
                                </View>

                                {
                                  this.state.event.isNotAsked && this.state.event.isNotAsked.indexOf('mark1') !== -1
                                    ? (
                                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Text note style={{ marginRight: 24 }}>{`CV : ${item.mark1}`}</Text>
                                        <Text note>{`Présentation : ${item.mark2}`}</Text>
                                      </View>
                                    ) : null
                                }

                              </View>

                              {
                                item.averageMarks && (
                                  <View style={{
                                    flexDirection: 'column', paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center',
                                  }}
                                  >
                                    <Text style={[styles.header, { color: colour.primary }]}>{item.averageMarks}</Text>
                                  </View>
                                )
                              }
                            </CardItem>
                          </Card>
                        ))
                      }
                    </Content>
                  ) : (
                    <View style={{
                      flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
                    }}
                    >
                      <Text style={[styles.text, { alignSelf: 'center' }]}>{'Ajoutez un dossier d\'inscription manuellement (boutton vert à droite), ou collectez les informations du participant automatiquement en le faisant scanner le QR Code généré (boutton gris à droite).'}</Text>
                    </View>
                  )
                }

                <FabButtons />
              </Tab>
              <Tab heading="Paramètres" {...tapBarStyle}>
                <EventParamsScreen navigation={this.props.navigation} event={this.state.event} />
              </Tab>
              <Tab heading="Statistiques" {...tapBarStyle}>
                <AnalyticsScreen navigation={this.props.navigation} user={this.state.user} />
              </Tab>
            </Tabs>

          </Container>
        );
      }
      return (
        <Container>

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
