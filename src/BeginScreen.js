import React from 'react';
import {
  Text, Image, View, StyleSheet,
} from 'react-native';
import { Icon } from 'native-base';
import Carousel from 'react-native-carousel-view';

import styles from './Styles/style';
import colour from './Styles/colors';
import { Button } from './react-native-oneid';


const sty = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
  },
});

const imgLogo = require('../images/logo.png');

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <View style={sty.container}>
          <Carousel
            height={400}
            indicatorAtBottom
            indicatorSize={20}
            indicatorColor={colour.accent}
            inactiveIndicatorColor={colour.darklighter}
            animate
            loop={false}
            onRef={ref => (this.child = ref)}
            delay={5000}
          >
            <View style={sty.contentContainer}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image resizeMode="contain" style={{ height: 70, width: 70, marginBottom: 24 }} source={imgLogo} />
                <Text style={styles.header}>Bienvenue sur OneID Pro,</Text>
                <Text style={styles.subHeader}>Votre CRM sécurisé</Text>

              </View>
            </View>
            <View style={sty.contentContainer}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="create" style={{ fontSize: 70, marginBottom: 24, color: colour.primary }} />
                <Text style={[styles.header, { textAlign: 'center' }]}>Créez</Text>
                <Text style={[styles.subHeader, { textAlign: 'center' }]}>des formulairs sur mesures</Text>
              </View>
            </View>
            <View style={sty.contentContainer}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Icon type="MaterialIcons" name="share" style={{ fontSize: 70, marginBottom: 24, color: colour.primary }} />
                <Text style={[styles.header, { textAlign: 'center' }]}>Partagez</Text>
                <Text style={[styles.subHeader, { textAlign: 'center' }]}>vos formulaires et collectez toutes les données des inscrits</Text>
              </View>
            </View>
            <View style={sty.contentContainer}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="eye" style={{ fontSize: 70, marginBottom: 24, color: colour.primary }} />
                <Text style={[styles.header, { textAlign: 'center' }]}>Suivez et Gérez</Text>
                <Text style={[styles.subHeader, { textAlign: 'center' }]}>{'l\'évolution des dossiers d\'inscriptions'}</Text>
              </View>
            </View>
            <View style={sty.contentContainer}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="lock" style={{ fontSize: 70, marginBottom: 24, color: colour.primary }} />
                <Text style={[styles.header, { textAlign: 'center' }]}>Détendez-vous !</Text>
                <Text style={[styles.subHeader, { textAlign: 'center' }]}>Toutes les données collectées sont sécurisées et consultables par vous uniquement !</Text>
                <Button
                  square
                  style={{ marginTop: 56 }}
                  onPress={() => {
                    this.props.navigation.navigate('ChoosePlan');
                  }}
                >
                  {'Commencer'}
                </Button>
              </View>
            </View>
          </Carousel>
        </View>
      </View>
    );
  }
}
