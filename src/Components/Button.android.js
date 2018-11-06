import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
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
    const ButtonLabel = () => (
      <View
        style={{
          borderRadius: this.props.square ? 3 : 25,
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: this.props.text ? 'flex-end' : 'center',
          paddingHorizontal: 25,
        }}
      >
        <Text
          style={[this.props.text ? styles.textButton : styles.buttonLabel, { ...this.props.textStyle }]}
        >
          {this.props.children.toUpperCase()}
        </Text>

        {
          this.props.icon ? <Icon name={this.props.icon} style={{ marginLeft: 25, color: colour.secondary }} /> : null
        }
      </View>
    );

    const ButtonSpinner = () => (
      <Spinner />
    );

    return (
      <View style={[{
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
        elevation: !this.props.text ? 2 : 0,
      }, this.props.style]}
      >
        <TouchableNativeFeedback
          onPress={() => {
            const validate = this.props.onPress();
            if (validate !== false) this.setState({ pressed: true });
          }}
          background={TouchableNativeFeedback.Ripple('#fff', true)}
        >
          <View
            style={{
              borderRadius: this.props.square ? 3 : 25,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: this.props.text ? 'flex-end' : 'center',
              paddingHorizontal: 25,
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
        </TouchableNativeFeedback>
      </View>
    );
  }
}
