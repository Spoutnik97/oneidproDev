export default function iconize(label) {
  switch (label) {
    case 'basic':
      return 'person';
      break;
    case 'phone_number':
      return 'call';
      break;
    case 'address':
      return 'pin';
      break;
    case 'job':
      return 'school';
      break;
    case 'email':
      return 'at';
      break;
    case 'password':
      return 'lock';
      break;
    case 'phys':
      return 'beer';
      break;
    case 'emergency_contact':
      return 'medkit';
      break;
    default:
      return null;
  }
  return 'help';
}
