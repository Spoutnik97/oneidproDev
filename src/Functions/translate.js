export default function translate(label) {
  let labelShown = '';
  if (label && label !== undefined && label !== '') {
    switch (label) {
      case 'family_name':
        labelShown = 'Nom';
        break;
      case 'given_name':
        labelShown = 'Prénom';
        break;
      case 'email':
        labelShown = 'Mail';
        break;
      case 'address':
        labelShown = 'Adresse';
        break;
      case 'postal_code':
        labelShown = 'Code Postal';
        break;
      case 'locality':
        labelShown = 'Ville';
        break;
      case 'country':
        labelShown = 'Pays';
        break;
      case 'phone_number':
        labelShown = 'Téléphone';
        break;
      case 'birthdate':
        labelShown = 'Date de naissance';
        break;
      case 'nationality':
        labelShown = 'Nationalité';
        break;
      case 'birthplace':
        labelShown = 'Lieu de naissance';
        break;
      case 'street_address':
        labelShown = 'Adresse';
        break;
      case 'gender':
        labelShown = 'Sexe';
        break;
      case 'job':
        labelShown = 'Situation professionnelle';
        break;
      case 'basic':
        labelShown = 'Etat Civil';
        break;
      case 'password':
        labelShown = 'Mot de passe';
        break;
      case 'confirm_password':
        labelShown = 'Confirmation';
        break;
      case 'cv':
        labelShown = 'CV';
        break;
      case 'idCardRecto':
        labelShown = 'Carte d\'identité Recto';
        break;
      case 'idCardVerso':
        labelShown = 'Carte d\'identité Verso';
        break;
      case 'passport':
        labelShown = 'Passeport';
        break;
      case 'poa':
        labelShown = 'Justificatif de domicile';
        break;
      case 'studentCard':
        labelShown = 'Carte étudiante';
        break;
      case 'comment':
        labelShown = 'Commentaire';
        break;
      case 'phys':
        labelShown = 'Le Phy\'s';
        break;
      case 'bucque':
        labelShown = 'Bucque';
        break;
      case 'nums':
        labelShown = 'Num\'s';
        break;
      case 'tbk':
        labelShown = 'Tabagn\'s';
        break;
      case 'proms':
        labelShown = 'Prom\'s';
        break;
      case 'soce_number':
        labelShown = 'Numéro de Sociétaire';
        break;
      case 'emergency_contact':
        labelShown = 'Personne à prévenir en cas d\'urgence';
        break;
      case 'emergency_given_name':
        labelShown = 'Prénom';
        break;
      case 'emergency_family_name':
        labelShown = 'Nom';
        break;
      case 'emergency_street_address':
        labelShown = 'Adresse';
        break;
      case 'emergency_postal_code':
        labelShown = 'Code Postal';
        break;
      case 'emergency_locality':
        labelShown = 'Ville';
        break;
      case 'emergency_phone_number':
        labelShown = 'Téléphone';
        break;
      case 'key':
        labelShown = 'Clé';
        break;
      case 'title':
        labelShown = 'Intitulé';
        break;
      case 'labels':
        labelShown = 'Valeurs';
        break;
      default:
        labelShown = label;
    }
  }
  return labelShown.length > 0 ? labelShown : false;
}
