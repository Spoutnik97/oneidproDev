import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
// import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

import colour from '../Styles/colors';
import styles from '../Styles/style';
import { translate } from '../react-native-oneid';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
    };
  }

  render() {
    return (
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

        <Text style={styles.label}>{this.props.displayLabel || translate(this.props.label) || this.props.label}</Text>

        <TouchableHighlight
          onPress={() => { this.setState({ isDatePickerVisible: true }); }} // this.showAndroidDatePicker()}}
          style={[this.props.style, {
            flex: 1,
            height: 50,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',

          }]}
          underlayColor="transparent"
        >
          <Text
            style={{
              color: colour.primary,
              fontSize: 17,
              paddingLeft: 8,
            }}
          >
            {this.state.dateText ? this.state.dateText : null}
          </Text>
        </TouchableHighlight>

        <DateTimePicker
          locale="fr"
          mode="date"
          isVisible={this.state.isDatePickerVisible}
          datePickerModeAndroid="spinner"
          date={this.state.date ? this.state.date : new Date()}
          onConfirm={(date) => {
            const year = date.getFullYear();
            const month = 1 + date.getMonth();
            const day = date.getDate();

            const dateText = `${day} / ${month} / ${year}`;

            this.setState({ date, dateText, isDatePickerVisible: false });
            this.props.onSubmitEditing(dateText);
          }}
          onCancel={() => this.setState({ isDatePickerVisible: false })}
        />

      </View>
    );
  }
}
