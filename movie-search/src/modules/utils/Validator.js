import Error from './Error';

export default class Validator {
  static isEmpty(field) {
    if (field.value.length > 0) {
      return true;
    }
    Error.show('Enter the name of the movie!');
    return false;
  }
}
