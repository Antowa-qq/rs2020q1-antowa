import menuList from './utils/MenuList';
import create from './utils/Create';
import SwitchToggle from './Switch-toggle';
import ControllerPage from './ControllerPage';

export default class Menu {
  constructor() {
    this.mainContainer = document.querySelector('.main');
  }

  clickEvent() {
    const cardsMenu = this.mainContainer.querySelector('.cards__menu');
    cardsMenu.addEventListener('click', (e) => {
      const element = e.target.closest('div');
      if (element.classList.contains('card__menu')) {
        ControllerPage.changePage(element.dataset.link);
      }
    });
  }

  selectMode(mode) {
    if (this.mainContainer.querySelector('.cards__menu')) {
      const cards = this.mainContainer.querySelector('.cards__menu');

      if (mode.play) {
        cards.classList.add('cards__menu_play');
        cards.classList.remove('cards__menu_training');
      }
      if (mode.training) {
        cards.classList.add('cards__menu_training');
        cards.classList.remove('cards__menu_play');
      }
    }
  }

  render() {
    const cardsMenu = create('div', 'cards cards__menu', null, this.mainContainer);

    if (SwitchToggle.mode.play) {
      cardsMenu.classList.add('cards__menu_play');
    }
    if (SwitchToggle.mode.training) {
      cardsMenu.classList.add('cards__menu_training');
    }
    menuList.forEach((element) => {
      const img = create('img');
      img.src = element.img;
      img.alt = element.text;

      const a = create('a', null);
      a.innerText = element.text;
      a.prepend(img);
      a.href = '#/cards';
      const card = create('div', 'card card__menu', [a], null);
      card.dataset.link = element.link;

      cardsMenu.append(card);
    });
  }

  init() {
    this.render();
    this.clickEvent();
  }
}
