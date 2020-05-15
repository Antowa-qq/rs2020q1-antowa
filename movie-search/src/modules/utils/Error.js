export default class Error {
  static show(msg) {
    document.querySelector('.errorAPI').textContent = msg;
  }

  static clear() {
    document.querySelector('.errorAPI').textContent = '';
  }
}
