import React from 'react';
import {
  View,
} from 'react-native';

import colour from '../Styles/colors';

export default () => (
  <View style={{
    height: 1,
    width: 200,
    backgroundColor: colour.secondary,
    alignSelf: 'center',
    marginVertical: 8,
  }}
  />
);
