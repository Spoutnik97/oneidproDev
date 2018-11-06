import { Component } from 'react';
import {
  ToastAndroid,
} from 'react-native';

export default class Toast extends Component {
  static show = message => ToastAndroid.show(message, ToastAndroid.SHORT);

  render() {
    return (
      null
    );
  }
}
