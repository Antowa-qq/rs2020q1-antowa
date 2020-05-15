export default class Loader {
  static start() {
    document.querySelector('.iconClose').classList.add('hidden');
    document.querySelector('.iconLoader').classList.add('animate');
  }

  static stop() {
    document.querySelector('.iconClose').classList.remove('hidden');
    document.querySelector('.iconLoader').classList.remove('animate');
  }
}
