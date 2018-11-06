import React, { Component } from 'react';
import {
  TouchableOpacity, View,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import colour from '../Styles/colors';
import styles from '../Styles/style';

const AddInputButton = props => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      padding: 12,
      margin: 12,
      backgroundColor: '#dedede',
      borderColor: colour.secondarylight,
      borderWidth: 1,
      borderRadius: 25,
    }}
    onPress={props.onPress}
  >
    <Icon name="add" style={{ color: colour.secondary }} />
  </TouchableOpacity>
);

export default AddInputButton;
