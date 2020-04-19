
import Menu from './menu.js';
import Navigation from './navigation.js';
import Card from './card.js';
import Game from './game.js';

export default class Switch {

    static mode = {
        play: false,
        training: true
    }
    static switchToggle = document.querySelector('#togBtn');

    static clickEvent() {

        this.switchToggle.addEventListener('change', () => {
            this.changeMode();

            const menu = new Menu();
            menu.selectMode(this.mode);

            const navigation = new Navigation();
            navigation.selectMode(this.mode);

            const card = new Card();
            card.selectMode(this.mode);

            // Game.abortGame();

        });
    }
    static changeMode() {
        if (this.getStateSwitchToggle()) {
            [this.mode.play, this.mode.training] = [true, false];
        }
        else {
            [this.mode.play, this.mode.training] = [false, true];
        }
    }

    static getStateSwitchToggle() {
        return this.switchToggle.checked;
    }

    static init() {
        this.clickEvent();
    }

}