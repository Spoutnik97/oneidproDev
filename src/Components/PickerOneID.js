import React, { Component } from 'react';
import {
  TouchableOpacity, Text, View, TouchableHighlight, TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import Divider from './Divider';

import styles from '../Styles/style';
import colour from '../Styles/colors';

export default class Picker extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    labels: PropTypes.array,
  }

  static defaultProps = {
    enabled: true,
    labels: null,
    selected: 'Choisir une option...',
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selected || 'Choisir une option...',
      // selected: this.props.selected && this.props.selected !== 'select' ? this.props.selected : this.props.title,
    };
  }

  componentDidMount() {
    if (this.props.selected && this.props.values.indexOf(this.props.selected) !== -1) {
      this.props.onValueChange(this.props.selected);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ modalVisible: true });
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            padding: 12,
            margin: 12,
            borderColor: this.props.required ? colour.error : colour.primary,
            borderWidth: 1,
            borderRadius: 25,
          }}
        >
          <Text style={styles.label}>{this.props.title || 'Options'}</Text>

          <TouchableOpacity
            disabled={!this.props.enabled}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
            style={[{ flex: 1, padding: 8 }, this.props.style]}
          >
            <Text style={styles.text}>{this.state.selected}</Text>
          </TouchableOpacity>

          <Modal
            isVisible={this.state.modalVisible}
          >
            <View style={{
              backgroundColor: 'white',
              borderRadius: 4,
              elevation: 2,
              padding: 16,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}
            >
              {
                this.props.values.map((value, index) => (
                  <TouchableOpacity
                    key={value}
                    style={{ marginBottom: 12, flexDirection: 'row' }}
                    underlayColor="transparent"
                    onPress={() => {
                      this.props.onValueChange(value);
                      this.setState({ modalVisible: false, selected: this.props.labels[index] });
                    }}
                  >
                    {
                      this.props.icons && (
                        <Icon type="MaterialIcons" name={this.props.icons[index]} style={{ marginRight: 24 }} />
                      )
                    }
                    <Text style={styles.textButton}>{this.props.labels[index]}</Text>
                  </TouchableOpacity>
                ))
              }
              <Divider />

              <TouchableHighlight

                style={{ marginBottom: 12 }}
                underlayColor="transparent"
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={[styles.textButton, { color: colour.error }]}>Annuler</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
