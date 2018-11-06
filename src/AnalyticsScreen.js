import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import colour from './Styles/colors';
import styles from './Styles/style';

export default class AnalyticsScreen extends Component {
  static propTypes = {
  }

  static defaultProps = {
  };

  static navigationOptions = {
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  UNSAFE_componentWillMount() {
  }

  render() {
    return (
      <View style={{}}>
        <Text style={styles.text}>Analytics</Text>
      </View>
    );
  }
}
