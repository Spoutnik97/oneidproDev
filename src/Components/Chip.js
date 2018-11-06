import React from 'react';
import {
  View, TouchableOpacity, Text,
} from 'react-native';
import { Icon } from 'native-base';

import colour from '../Styles/colors';
import styles from '../Styles/style';

const Chip = props => (
  <TouchableOpacity
    key={props.content}
    style={{
      padding: 3,
      margin: 5,
      backgroundColor: colour.primary,
      height: 30,
      borderRadius: 15,

    }}
    onPress={props.onPress}
  >
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Text style={[styles.text, { color: 'white' }]}>{props.content}</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 24,
          width: 24,
          backgroundColor: colour.primarylight,
          padding: 2,
          marginLeft: 4,
          borderRadius: 12,
        }}
      >
        <Icon
          name="close"
          style={{
            color: colour.secondarydark, fontSize: 15,
          }}
        />
      </View>
    </View>
  </TouchableOpacity>
);

export default Chip;
