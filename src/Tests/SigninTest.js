const connect = function (oneid) {
  console.log('connecct');
  const fct = () => { this.getJWT(oneid, 'Azertyu8'); };
  setTimeout(fct, 1000);
};

export default connect;
