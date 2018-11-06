import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-check-box';

import colour from '../Styles/colors';

export default class CheckBoxOneID extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    checked: false,
    onChange: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      checked: !!this.props.checked || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ checked: nextProps.checked });
  }


  render() {
    return (
      <CheckBox
        style={{ flex: 1 }}
        onClick={() => {
          this.setState(prev => ({ checked: prev.checked }));
          this.props.onChange();
        }}
        isChecked={this.state.checked}
        rightText={this.props.label}
        checkBoxColor={colour.primary}
      />
    );
  }
}
