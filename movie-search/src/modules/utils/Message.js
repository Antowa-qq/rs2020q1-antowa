
export default class Message {
  static show(msg) {
    document.querySelector('.msgAPI').textContent = msg;
  }

  static error(msg) {
    document.querySelector('.msgAPI').classList.add('error');
    this.show(msg);
  }

  static success(msg) {
    document.querySelector('.msgAPI').classList.add('success');
    this.show(msg);
  }

  static clear() {
    document.querySelector('.msgAPI').textContent = '';
    document.querySelector('.msgAPI').classList.remove('success');
    document.querySelector('.msgAPI').classList.remove('error');
  }
}
