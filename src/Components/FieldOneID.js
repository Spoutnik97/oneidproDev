import React, { Component } from 'react';
import {
  Text, View,
} from 'react-native';
import { Spinner, CardItem, Body } from 'native-base';

import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

import InputOneID from './InputOneID';
import DocumentViewer from './DocumentViewer';
import ImagePickerPlus from './ImagePickerPlus';
import DatePicker from './DatePicker';
// import Picker from './Picker';
import PickerOneID from './PickerOneID';
import Divider from './Divider';

import translate from '../Functions/translate';

import colour from '../Styles/colors';
import styles from '../Styles/style';

import Config from '../../env';

const { documentLabels } = Config;

export default class FieldOneID extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onEndEditing: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    returnKeyType: PropTypes.string,
    onValidate: PropTypes.func,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    edit: PropTypes.bool,
    displayValue: PropTypes.bool,
  }

  static defaultProps = {
    value: null,
    onSubmitEditing: null,
    inputRef: (r) => { this.reference = r; },
    returnKeyType: 'done',
    onValidate: () => {},
    onEndEditing: () => {},
    required: false,
    onChange: () => {},
    edit: false,
    displayValue: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      img: '',
    };
  }

  render() {
    let { label, value } = this.props;

    if (typeof label === 'object') {
      const {
        labels, values, title, key,
      } = label;

      if (label.key.indexOf('divider') !== -1) {
        return (
          <View
            style={{
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 24,
            }}
            key={label.key}
          >
            <Divider />
            <Text style={styles.subHeader}>{title}</Text>
          </View>
        );
      }
      if (key.indexOf('mark') !== -1) {
        return (
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }} key={key}>
            <Text style={styles.text}>{title}</Text>
            {/* <Text style={styles.text}>{label === 'mark1' ? 'Note du CV : ' : 'Note de la présentation : '}</Text> */}

            <StarRating
              disabled={!!value}
              maxStars={5}
              rating={value ? parseInt(value, 10) : this.state[key] || 0}
              starSize={25}
              selectedStar={(rating) => {
                this.setState({ [key]: rating });
                this.props.onChange(rating);
                this.props.onValidate(true);
              }}
              fullStarColor={colour.primary}
              emptyStarColor={colour.primary}
              halfStarColor={colour.primary}
              halfStarEnabled
            />
          </View>
        );
      }

      if (labels && labels.length === 1) {
        value = values[0];
        label = labels[0];

        return (
          <InputOneID
            key={value}
            label={value}
            edit={this.props.edit}
            value={this.props.value}
            multiline={key.indexOf('multi_') !== -1}
            displayLabel={label}
            returnKeyType={this.props.returnKeyType}
            onEndEditing={this.props.onEndEditing}
            onChangeText={this.props.onChange}
            onSubmitEditing={this.props.onSubmitEditing}
            inputRef={this.props.inputRef}
            onValidate={this.props.onValidate}
            required={this.props.required}
          />
        );
      }

      if ((value && (label.key === 'gender' || label.key === 'tbk')) || this.props.displayValue) {
        return (
          <CardItem key={label.key}>
            <Body>
              <Text style={styles.label}>{this.props.displayLabel || translate(label.title)}</Text>
              <Text note>{value}</Text>
            </Body>
          </CardItem>
        );
      }

      if (key.indexOf('picker_') !== -1) {
        return (
          <PickerOneID
            ref={(r) => { this.props.inputRef(r); this.reference = r; }}
            enabled
            selected={value}
            required={this.props.required}
            values={values}
            labels={labels}
            title={title}
            onValueChange={(val) => {
              if (val) {
                if (this.props.pricing) {
                  this.props.definePrice(val);
                }
                this.props.onChange(labels[values.indexOf(val)]);
                this.props.onValidate(true);
              } else {
                this.props.onValidate(false);
              }
            }}
          />
        );
      }
      return null;
    }

    // si le label est un document
    if (documentLabels.indexOf(label) !== -1) {
      if (value && value !== ' ') {
        if (value === 'waitingDownload') {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Spinner />
              <Text style={[styles.text, { textAlign: 'center' }]}>{translate(label)}</Text>
            </View>
          );
        }
        return (
          <DocumentViewer key={label} source={value} label={label} />
        );
      }

      return (
        <ImagePickerPlus
          edit
          label={label}
          prefix={this.props.prefix}
          onPick={(lab, uri) => {
            this.props.onValidate(true);
            this.props.onChange(uri);
            // this.props.onEndEditing ? this.props.onEndEditing(uri) : this.props.onChangeText(uri);
          }}
          required={this.props.required}
        />
      );
    }

    if (label.indexOf('date') !== -1) {
      if (value) {
        return (
          <InputOneID
            key={label}
            label={label}
            value={this.props.value}
          />
        );
      }
      return (
        <DatePicker
          key={label}
          label={label}
          onSubmitEditing={(val) => {
            this.props.onChange(val);
            this.props.onValidate(true);
          }}
          required={this.props.required}
        />
      );
    }

    if (label.indexOf('mark') !== -1) {
      return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }} key={label}>
          <Text style={styles.text}>{this.props.displayLabel || translate(label)}</Text>
          <StarRating
            disabled={!!this.props.value}
            maxStars={5}
            rating={parseInt(value, 10) || this.state[label] || 0}
            starSize={25}
            selectedStar={(rating) => {
              this.setState({ [label]: rating });
              this.props.onChange(rating);
              this.props.onValidate(true);
            }}
            fullStarColor={colour.primary}
            emptyStarColor={colour.primary}
            halfStarColor={colour.primary}
            halfStarEnabled
          />
        </View>
      );
    }

    return (
      <InputOneID
        key={label}
        label={label}
        edit={this.props.edit}
        value={this.props.value}
        displayLabel={this.props.displayLabel || label.indexOf('comment') !== -1 ? 'Commentaires' : null}
        multiline={label.indexOf('comment') !== -1}
        returnKeyType={this.props.returnKeyType}
        onEndEditing={this.props.onEndEditing}
        onChangeText={this.props.onChange}
        onSubmitEditing={this.props.onSubmitEditing}
        inputRef={this.props.inputRef}
        onValidate={this.props.onValidate}
        required={this.props.required}
      />
    );
  }
}
