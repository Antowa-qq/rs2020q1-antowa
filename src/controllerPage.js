import Menu from './menu.js';
import Card from './card.js';
import Statistics from './statistics.js';

export default class CntrollerPage {


    static currentPage;

    static changePage(dataLink) {

        this.currentPage = dataLink;
        const mainContainer = document.querySelector('.main');
        mainContainer.textContent = '';

        switch (dataLink) {

            case 'mainPage':
                const menu = new Menu();
                menu.init();
                break;
            case 'statistics':
                const statistics = new Statistics();
                statistics.render();
                break;
            default:
                const card = new Card();
                card.init();
                break;
        }
        this.unSelectActiveLink(dataLink);
        this.selectActiveLink(this.currentPage);
        this.navigationDisplay();
    }

    static selectActiveLink(link) {
        document.querySelector(`a[data-link="${link}"]`).classList.add('navigation__link_selected');
    }
    static unSelectActiveLink(link) {
        document.querySelector('.navigation__link_selected').classList.remove('navigation__link_selected');
    }
    static navigationDisplay() {
        const menu = document.querySelector('.navigation');
        if (menu.classList.contains('navigation_open')) {
            menu.classList.toggle('navigation_open');
        }
    }
}