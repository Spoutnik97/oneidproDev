import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import { translate } from '../react-native-oneid';

import colour from '../Styles/colors';
import styles from '../Styles/style';


export default class DocumentViewer extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  render() {
    const images = [{
    // Simplest usage.
      url: this.props.source, // string
      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    }];

    if (this.props.source && this.props.source !== ' ') {
      return (
        <View style={{
          margin: 25, width: 125, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
        }}
        >
          <TouchableHighlight
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: colour.primarydark,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 10,
              elevation: 1,
            }}
          >
            <Icon name="document" style={{ color: 'white' }} />
          </TouchableHighlight>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.props.label ? <Text style={[styles.text, { textAlign: 'center' }]}>{translate(this.props.label)}</Text> : null}
          </View>

          <Modal isVisible={this.state.modalVisible} transparent onBackButtonPress={() => { this.setState({ modalVisible: false }); }}>
            <ImageViewer
              imageUrls={images}
              renderIndicator={() => <Text />}
              enableSwipeDown
              onCancel={() => { this.setState({ modalVisible: false }); }}
              onDoubleClick={(onCancel) => { onCancel(); }}
            />
          </Modal>
        </View>
      );
    }
    return null;
  }
}
