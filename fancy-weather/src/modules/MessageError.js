export default class MessageError {
  static show(message) {
    const wrapperMessage = document.querySelector('.search-info');
    wrapperMessage.textContent = message;
  }

  static clear() {
    const wrapperMessage = document.querySelector('.search-info');
    wrapperMessage.textContent = '';
  }
}
