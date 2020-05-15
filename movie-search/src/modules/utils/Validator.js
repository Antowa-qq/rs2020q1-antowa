import Message from './Message';

export default class Validator {
  static isEmpty(field) {
    if (field.value.length > 0) {
      return true;
    }
    Message.error('Enter the name of the movie!');
    return false;
  }
}
