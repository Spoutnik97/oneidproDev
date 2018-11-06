import { Alert } from 'react-native';

import Config from '../../env';

const { API_URI } = Config;

export default function fetchOneID(method, path, token, data) {
  return new Promise(((resolve, reject) => {
    console.log(`fetch : ${path} with ${data}`);
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method, API_URI + path);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    if (token !== undefined) {
      xhr.setRequestHeader('x-access-token', token);
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        if (!xhr.response.success) {
          if (xhr.response.message && xhr.response.message === 'Failed to authenticate token.') {
            Alert.alert('Votre session a expirée. Merci de vous reconnecter...');
            reject(Error('Votre session a expirée. Merci de vous reconnecter...'));
          }
        }
        resolve(xhr.response);
      } else {
        console.log(`Data didn't load successfully; error code:${xhr.statusText}`);
        reject(Error(`Data didn't load successfully; error code:${xhr.statusText}`));
      }
    };
    xhr.onerror = () => {
      if (Config.ENV === 'dev') console.error(`Start a promise: method=${method} path=${API_URI + path} data=${data}`);
      Alert.alert('Erreur', 'Erreur de connexion à internet...');
      reject(Error('There was a network error.'));
    };

    if ((method === 'POST' || method === 'PUT') && data !== undefined) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }));
}
