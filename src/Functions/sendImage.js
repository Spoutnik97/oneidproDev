import { Alert } from 'react-native';
import Config from '../../env';

export default function sendImage(token, uri, name, folder) {
  return new Promise(((resolve, reject) => {
    // format the image data
    const image = {
      uri,
      type: 'image/jpeg',
      name: name || `myImage-${Date.now()}.jpg`,
    };
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    imgBody.append('image', image);

    let url = `${Config.API_URI}api/documents/root`;
    if (folder === 'logos') {
      url = `${Config.API_URI}api/documents/logos`;
    } else if (folder === 'tickets') {
      url = `${Config.API_URI}api/documents/tickets`;
    } else if (folder) {
      url = `${Config.API_URI}api/documents/${folder}`;
    }

    // Perform the request. Note the content type - very important
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': token,
      },
      body: imgBody,
    }).then(res => res.json()).then((result) => {
      // Just me assigning the image url to be seen in the view
      resolve(result.imageUrl);
    }).catch((error) => {
      Alert.alert('Erreur', error);
      if (Config.ENV === 'dev') console.error(error);
      reject(error);
    });
  }));
}
