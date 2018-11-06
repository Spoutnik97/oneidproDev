import { Component } from 'react';
import RootToast from 'react-native-root-toast';

export default class Toast extends Component {
  static show = message => RootToast.show(message);
    
  render() {
    return (
      null
    );
  }
}
