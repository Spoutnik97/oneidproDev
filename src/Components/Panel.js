import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, Animated, Easing
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Right, Icon
} from 'native-base';

import styles from '../Styles/style';


export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = { // Step 3
      title: props.title,
      expanded: false,
      animation: new Animated.Value(0),
      maxHeight: 50 * props.nbItems,
    };
  }

  toggle() {
    const initialValue = this.state.expanded ? this.state.maxHeight : 0;


    const finalValue = this.state.expanded ? 0 : this.state.maxHeight;

    this.setState({
      expanded: !this.state.expanded,
    });

    this.state.animation.setValue(initialValue);
    Animated.timing(
      this.state.animation,
      {
        toValue: finalValue,
        duration: 400,
        easing: Easing.inOut(Easing.quad),
      },
    ).start(); // Step 5
  }


  _setMaxHeight(event) {
    if (!this.state.maxHeight) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
      });
    }
  }

  render() {
    let icon = 'arrow-forward';

    if (this.state.expanded) {
      icon = 'arrow-down'; // Step 4
    }

    return (

      <View style={{}}>

        <TouchableHighlight
          onPress={this.toggle.bind(this)}
          underlayColor="#f1f1f1"
        >
          <View style={styles.titleContainer}>
            <View style={styles.left}>
              <Icon name={this.props.icon} size={20} />
            </View>

            <View style={styles.titleView}>
              <Text style={styles.title}>{this.state.title}</Text>
            </View>

            <Right style={styles.right}>
              <Icon name={icon} size={20} />
            </Right>

          </View>
        </TouchableHighlight>


        <Animated.View
          style={[styles.container, { height: this.state.animation, elevation: 1 }]}
        >
          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
            {this.props.children}
          </View>
        </Animated.View>

      </View>


    );
  }
}
