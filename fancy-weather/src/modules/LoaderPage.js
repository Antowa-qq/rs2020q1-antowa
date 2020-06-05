export default class LoaderPage {
  static start() {
    const loader = document.querySelector('.loader');
    loader.classList.add('animation');
  }

  static end() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('animation');
  }
}
