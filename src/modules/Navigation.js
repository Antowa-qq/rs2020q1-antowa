import ControllerPage from './ControllerPage';

export default class Navigation {
  constructor() {
    this.btnOpen = document.querySelector('.hamburger_open');
    this.btnClose = document.querySelector('.hamburger_close');
    this.menu = document.querySelector('.navigation');
  }

  clickEventBtnCotroller() {
    this.menu.classList.toggle('navigation_open');
  }

  clickEventMenu(e) {
    if (e.target.tagName === 'A') {
      ControllerPage.changePage(e.target.dataset.link);
    }
  }

  selectMode(mode) {
    if (mode.play) {
      this.menu.classList.add('navigation_play');
      this.menu.classList.remove('navigation_training');
    }
    if (mode.training) {
      this.menu.classList.add('navigation_training');
      this.menu.classList.remove('navigation_play');
    }
  }

  init() {
    this.btnOpen.addEventListener('click', this.clickEventBtnCotroller.bind(this));
    this.btnClose.addEventListener('click', this.clickEventBtnCotroller.bind(this));
    this.menu.addEventListener('click', this.clickEventMenu.bind(this));
  }
}
