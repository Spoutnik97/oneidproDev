import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, CardItem, Body } from 'native-base';

import translate from '../Functions/translate';

import colour from '../Styles/colors';
import styles from '../Styles/style';

class InputOneID extends Component {
  static propTypes = {
    onPressGdpr: PropTypes.object,
    onValidate: PropTypes.func,
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.string.isRequired,
    noLogo: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    controlledValue: PropTypes.string,
    onEndEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    required: PropTypes.bool,
    keyboardType: PropTypes.string,
    onHelp: PropTypes.func,
    regex: PropTypes.object,
    textStyle: PropTypes.object,
  }

  static defaultProps = {
    onPressGdpr: null,
    onValidate: () => {},
    inputRef: (r) => { this.reference = r; },
    noLogo: false,
    value: null,
    controlledValue: null,
    onEndEditing: () => {},
    onChangeText: () => {},
    required: false,
    keyboardType: 'default',
    onHelp: () => {},
    regex: null,
    textStyle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      keyboardType: this.props.keyboardType,
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.label === 'phone_number' || this.props.label === 'emergency_phone_number') {
      this.setState({ keyboardType: 'phone-pad' });
    } else if (this.props.label === 'email') {
      this.setState({ keyboardType: 'email-address' });
    } else if (this.props.label === 'postal_code' || this.props.label === 'emergency_postal_code' || this.props.label === 'proms') {
      this.setState({ keyboardType: 'numeric' });
    } else {
      this.setState({ keyboardType: 'default' });
    }
  }

  render() {
    const helpGDPR = (
      <TouchableHighlight onPress={this.props.onPressGdpr}>
        <Icon
          name="information-circle"
          style={{
            color: '#ccc', fontSize: 20, right: 12, marginLeft: 12,
          }}
        />
      </TouchableHighlight>
    );

    // const regexPhoneNumber = /^(0[67])\d{8}$/;
    // const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    const SecurityLevel: Object = {
      LOW: '#ff605e',
      MEDIUM: '#ffc45e',
      HIGH: '#01BA6C',
    };

    const containsLowercase = (value: string): boolean => {
      const regex = /^(?=.*[a-z]).+$/;
      return regex.test(value);
    };

    const containsUppercase = (value: string): boolean => {
      const regex = /^(?=.*[A-Z]).+$/;
      return regex.test(value);
    };

    const containsSpecial = (value: string): boolean => {
      const regex = /^(?=.*[0-9_\W]).+$/;
      return regex.test(value);
    };

    const respectMinCharLenght = (value: string): boolean => value.length >= 8;

    function setLevelPassword(pass: string): string {
      let level = 0;
      if (containsLowercase(pass)) level += 1;
      if (containsUppercase(pass)) level += 1;
      if (containsSpecial(pass)) level += 1;
      if (respectMinCharLenght(pass)) level += 1;

      switch (level) {
        case 1:
          return SecurityLevel.LOW;
          break;
        case 2:
          return SecurityLevel.LOW;
          break;
        case 3:
          return SecurityLevel.MEDIUM;
          break;
        case 4:
          return SecurityLevel.HIGH;
          break;
        default:
          return SecurityLevel.LOW;
      }
    }

    const regex = {
      proservice: /^[a-z0-9]{4,}$/,
      phone_number: /(^(0[67])\d{8}$|^\+33[67]\d{8}$)/,
      emergency_phone_number: /(^(0[67])\d{8}$|^\+33[67]\d{8}$)/,
      postal_code: /^[0-9]{5}$/,
      emergency_postal_code: /^[0-9]{5}$/,
      email: /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
      password: /^(?=.*[A-Z])(?=.*[!@#$*]|.*[0-9])(?=.*[a-z]).{8,}$/,
      confirm_password: /^(?=.*[A-Z])(?=.*[!@#$*]|.*[0-9])(?=.*[a-z]).{8,}$/,
      proms: /^[0-9]{3}$/,
    };

    const helpRegex = {
      password: 'au moins 8 caractères, dont (1 majuscule, 1 minuscule, 1 chiffre ou caractère spécial (!@#$*))',
      confirm_password: 'au moins 8 caractères, dont (1 majuscule, 1 minuscule, 1 chiffre ou caractère spécial (!@#$*))',
      proms: 'juste 3 chiffres. Exemple : 215',
    };


    if (typeof this.props.value === 'string' || this.props.value === null) {
      if (!this.props.value || this.props.edit) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.reference.focus();
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: this.props.multiline ? 150 : 50,
                padding: 12,
                margin: 12,
                borderColor: this.props.required ? colour.error : colour.primary,
                borderWidth: 1,
                borderRadius: 25,
                ...this.props.style,
              }}
            >
              <Text style={styles.label}>{this.props.displayLabel || translate(this.props.label) || this.props.label}</Text>

              <TextInput
                ref={(r) => { this.props.inputRef(r); this.reference = r; }}
                // ref={this.props.inputRef}
                returnKeyType={this.props.returnKeyType}
                keyboardType={this.state.keyboardType}
                blurOnSubmit={this.props.blurOnSubmit}
                defaultValue={this.props.value}
                onEndEditing={(event) => {
                  this.props.onEndEditing(event.nativeEvent.text);
                }}
                onSubmitEditing={this.props.onSubmitEditing}
                onFocus={this.props.onFocus}
                multiline={this.props.multiline}
                style={{
                  flex: 1,
                  color: colour.primary,
                  height: this.props.multiline ? 140 : 40,
                  fontSize: 17,
                  paddingLeft: 8,
                  alignSelf: 'center',
                  ...this.props.textStyle,
                }}
                underlineColorAndroid="transparent"
                secureTextEntry={this.props.label === 'password' || this.props.label === 'confirm_password'}
                value={this.props.controlledValue || this.state.value}
                onChangeText={(val) => {
                  let value = val;
                  const reg = this.props.regex || regex[this.props.label] || null;
                  const validate = reg ? reg.test(value) : null;

                  value = value.replace(/&/g, ''); // supprime les &
                  // value = value.replace(/(^\s+|\s+$)/g, ''); // supprime les blancs de début et de fin
                  // // enlève les espaces
                  if (reg) {
                    value = value.replace(/\s+/g, '');
                  }
                  // met en minuscule les emails
                  // console.log(`value : ${value}`);
                  //
                  // if (this.props.label === 'email') {
                  //   value = value.toLowerCase();
                  // }
                  // console.log(`value 2: ${value}`);

                  if (this.props.label === 'password' || this.props.label === 'confirm_password') {
                    this.setState({ colorLock: setLevelPassword(value) });
                  }

                  if (reg) {
                    if (validate) {
                      this.setState({ success: true, error: false });
                      this.props.onValidate(true);
                    } else {
                      this.setState({ success: false, error: true });
                      this.props.onValidate(false);
                    }
                  } else {
                    this.props.onValidate(true);
                  }
                  if (this.props.onChangeText) {
                    this.props.onChangeText(value);
                  }
                  this.setState({ value });
                }}
              />
              {
                (this.props.label === 'password' || this.props.label === 'confirm_password') && !this.props.noLogo ? (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('Aide', `Doit contenir ${helpRegex[this.props.label]}`);
                    }}
                  >
                    <Icon name="lock" style={{ color: this.state.colorLock, right: 12, marginLeft: 12 }} />
                  </TouchableOpacity>) : null
              }
              {this.state.success && this.props.label !== 'password' && this.props.label !== 'confirm_password' ? <Icon name="checkmark-circle" style={{ color: SecurityLevel.HIGH, right: 12, marginLeft: 12 }} /> : null}
              {this.state.error && this.props.label !== 'password' && this.props.label !== 'confirm_password' ? (
                <TouchableOpacity
                  onPress={() => {
                    if (helpRegex[this.props.label]) {
                      Alert.alert('Aide', `Doit contenir ${helpRegex[this.props.label]}`);
                    } else {
                      this.props.onHelp();
                    }
                  }}
                >
                  <Icon name="close-circle" style={{ color: SecurityLevel.LOW, right: 12, marginLeft: 12 }} />
                </TouchableOpacity>) : null}
              {this.props.onPressGdpr ? helpGDPR : null}
            </View>
          </TouchableWithoutFeedback>
        );
      }
      return (
        <CardItem key={this.props.label}>
          <Body>
            <Text style={styles.label}>{this.props.displayLabel || translate(this.props.label)}</Text>
            <Text note>{this.props.value}</Text>
          </Body>
        </CardItem>
      );
    }
  }
}

export default InputOneID;
