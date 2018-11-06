import React, { Component } from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

import colour from '../Styles/colors';

export default class ItemData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const styleView = this.props.input ? {
      height: 50,
      borderRadius: 25,
      borderColor: colour.primary,
      maringTop: 12,
      marginBottom: 12,
    }
      : {
        elevation: 1,
      };

    return (
      <View style={[styleView, {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

      }]}
      >
        <Icon name={this.props.icon} />
        <Text style={{
          color: colour.darklightest,
          marginLeft: 24,
        }}
        >
          {this.props.label}
        </Text>
        <Text style={{
          color: colour.primary,
        }}
        >
          {this.props.children}
        </Text>

        {
          () => {
            this.props.info ? <Icon name="help" style={{ alignSelf: 'flex-end' }} /> : null;
          }
        }

      </View>
    );
  }
}
