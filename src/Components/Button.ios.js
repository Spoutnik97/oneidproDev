import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import colour from '../Styles/colors';
import styles from '../Styles/style';

export default class Button extends Component {
  static propTypes = {
    square: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
    icon: PropTypes.string,
    text: PropTypes.bool,
  }

  static defaultProps = {
    square: false,
    icon: null,
    text: false,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          const validate = this.props.onPress();
          if (validate !== false) this.setState({ pressed: true });
        }}
        style={[{
          height: 50,
          borderRadius: this.props.square ? 3 : 25,
          backgroundColor: this.props.text ? 'transparent' : colour.accent,
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: this.props.text ? 'flex-end' : 'center',
          marginTop: 25,
          marginBottom: 10,
          // marginLeft: 25,
          // marginRight: 25,
          paddingHorizontal: 25,
          elevation: !this.props.text ? 2 : 0,
        }, this.props.style]}
        underlayColor={this.props.text ? 'transparent' : 'white'}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {
            this.props.fetch && this.state.pressed ? <Spinner color={colour.secondary} /> : (
              <Text
                style={[this.props.text ? styles.textButton : styles.buttonLabel, { ...this.props.textStyle }]}
              >
                {this.props.children.toUpperCase()}
              </Text>)
          }
          {
            this.props.icon ? <Icon name={this.props.icon} style={{ marginLeft: 25, color: colour.secondary }} /> : null
          }
        </View>
      </TouchableHighlight>
    );
  }
}
