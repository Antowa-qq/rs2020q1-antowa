import Menu from './Menu';
import Card from './Card';
import Statistics from './Statistics';
import RepeatDifficultWords from './RepeatDifficultWords';

export default class CntrollerPage {
  static currentPage;

  static changePage(dataLink) {
    this.currentPage = dataLink;
    const mainContainer = document.querySelector('.main');
    mainContainer.textContent = '';

    const menu = new Menu();
    const statistics = new Statistics();
    const card = new Card();
    const repeatDifficultWords = new RepeatDifficultWords();

    switch (dataLink) {
      case 'mainPage':
        menu.init();
        break;

      case 'statistics':
        statistics.render();
        break;

      case 'repeatDifficultWords':
        repeatDifficultWords.init();
        break;

      default:
        card.init();
        break;
    }
    this.unSelectActiveLink();
    this.selectActiveLink(this.currentPage);
    this.navigationDisplay();
  }

  static selectActiveLink(link) {
    document.querySelector(`a[data-link="${link}"]`).classList.add('navigation__link_selected');
  }

  static unSelectActiveLink() {
    document.querySelector('.navigation__link_selected').classList.remove('navigation__link_selected');
  }

  static navigationDisplay() {
    const menu = document.querySelector('.navigation');
    if (menu.classList.contains('navigation_open')) {
      menu.classList.toggle('navigation_open');
    }
  }
}
