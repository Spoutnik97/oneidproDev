import { Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

const event = {
  name: 'Test',
  organizer: 'Spout',
  email: true,
  tbk: true,
  cv: true,
  validate_name: true,
  validate_organizer: true,
  validate_email: true,
  validate_tbk: true,
  validate_cv: true,
};

const finish = function () {
  this.setState({ confirmModalVisible: false });
  this._didFocusSubscription && this._didFocusSubscription.remove();
  this._willBlurSubscription && this._willBlurSubscription.remove();
  const resetAction = StackActions.reset({
    key: null,
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Events' })],
  });
  this.props.navigation.dispatch(resetAction);
};

const save = function () {
  if (this.areFieldsValidated()) {
    if (!this.state.pressed) {
      this.setState({ pressed: true });
      return this.saveForm();
    }
    return false;
  }
  Alert.alert('Saisie incomplètes', 'Des champs obligatoires n\'ont pas été remplis, ou mal remplis.');
  return false;
};

const createForm = function () {
  if (!this.state.tested) {
    const boundFinish = finish.bind(this);
    const boundSave = save.bind(this);

    this.setState({ ...event, tested: true });

    const idSave = setTimeout(() => { boundSave(); }, 1000);
    // clearTimeout(idSave);

    const idFinish = setTimeout(() => { boundFinish(); }, 1000);
    // clearTimeout(idFinish);
  }
};

export default createForm;
