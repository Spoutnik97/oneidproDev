const newForm = function () {
  if (!this.state.tested) {
    this.setState({ tested: true });
    setTimeout(() => { this.props.navigation.navigate('CreateForm'); }, 1000);
  }
};

export default newForm;
