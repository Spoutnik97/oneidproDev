import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import colour from '../Styles/colors';
import styles from '../Styles/style';

class CardAccount extends Component {
  static propTypes = {
    user: PropTypes.shape.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { user } = this.props;
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colour.darklighter,
        elevation: 2,
        margin: 10,
        padding: 5,
        marginBottom: 0,
      }}
      >
        <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={styles.header}>{`${user.given_name} ${user.family_name}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text note>{`CV : ${user.mark1}`}</Text>
            <Text note>{`Présentation : ${user.mark2}`}</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'column', paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center',
        }}
        >
          <Text style={[styles.header, { color: colour.primary }]}>{(user.mark1 + user.mark2) / 2}</Text>
        </View>
      </View>
    );
  }
}

export default CardAccount;
