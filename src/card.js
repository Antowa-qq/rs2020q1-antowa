import SwitchToggle from './switch-toggle.js';
import Game from './game.js';
import AudioController from './audioController.js';
import ControllerPage from './controllerPage.js';
import create from './utils/create.js';
import cardList from './cardList.js';

export default class Card {

    constructor() {

        this.mainContainer = document.querySelector('.main');
        this.storageCards = JSON.parse(localStorage.getItem("statistics"));

    }

    startGame() {
        // Game.stateGame = true;
        const copyList = cardList[ControllerPage.currentPage].slice();
        const game = new Game(copyList);
        game.init();
        // console.log('new Game');
        const btnStartGame = this.mainContainer.querySelector('.btn__play');
        const btnRefreshWord = this.mainContainer.querySelector('.btn__refresh');

        btnStartGame.classList.add('hidden');
        btnRefreshWord.classList.remove('hidden');

    }

    mouseLeaveCard(card) {
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('card__game_flip')) {
                card.classList.remove('card__game_flip');
            }
        })
    }

    flipCardEvent(e) {
        const rotate = e.target.closest('div');
        if (rotate.classList.contains('rotate')) {
            const currentCard = e.target.closest('.card__game');
            currentCard.classList.toggle('card__game_flip');
            this.mouseLeaveCard(currentCard);
        }

    }
    playAudioCard(e) {
        const currentCard = e.target.closest('.card__game');

        if (currentCard && !e.target.closest('div').classList.contains('rotate') && SwitchToggle.mode.training) {
            const word = currentCard.querySelector('p').textContent;
            const desiredСard = cardList[ControllerPage.currentPage].find(item => item.word === word);
            AudioController.playAudio(desiredСard.audioSrc);
        }
        if (currentCard && SwitchToggle.mode.training) {
            const word = currentCard.querySelector('p').textContent;
            this.increaseTrainingWord(word);
        }

    }
    increaseTrainingWord(word) {
        this.storageCards[ControllerPage.currentPage].forEach(item => {
            if (item.word === word) {
                item.clickTraining++;
            }
        });
        localStorage.setItem('statistics', JSON.stringify(this.storageCards));
    }


    selectMode(mode) {
        if (this.mainContainer.querySelector('.cards__game')) {
            const cards = this.mainContainer.querySelector('.cards__game');
            if (mode.play) {
                cards.classList.remove('cards__game_training');
                cards.classList.add('cards__game_play');
            }
            if (mode.training) {
                cards.classList.remove('cards__game_play');
                cards.classList.add('cards__game_training');
            }
        }
    }

    render() {

        const rating = create('div', 'rating');

        const cardsGame = create('div', 'cards cards__game', [rating], this.mainContainer);

        console.log('render');

        cardList[ControllerPage.currentPage].forEach(element => {
            const rotateImg = create('img');
            rotateImg.src = "./assets/img/tools/rotate.png";
            const rotate = create('div', 'rotate', [rotateImg]);

            const imgFront = create('img', 'card__photo');
            imgFront.src = element.image;

            const imgBack = create('img', 'card__photo');
            imgBack.src = element.image;

            const wordEng = create('p', 'card__word');
            wordEng.textContent = element.word;

            const wordRu = create('p', 'card_word');
            wordRu.textContent = element.translation;

            const itemBack = create('div', 'card__item card__item_back', [imgBack, wordRu]);
            const itemFront = create('div', 'card__item card__item_front', [imgFront, wordEng, rotate]);

            const card = create('div', 'card card__game', [itemFront, itemBack]);

            cardsGame.append(card);
        });

        const btnGamePlay = create('button', 'btn__play');
        btnGamePlay.textContent = "Start Game";
        const btnGameRefresh = create('button', 'btn__refresh hidden');
        btnGameRefresh.textContent = '⟲';

        const btns = create('div', 'btns', [btnGamePlay, btnGameRefresh], cardsGame);

        this.selectMode(SwitchToggle.mode);
    }

    init() {

        this.render();
        const cards = this.mainContainer.querySelector('.cards__game');
        const btnStartGame = this.mainContainer.querySelector('.btn__play');

        cards.addEventListener('click', this.playAudioCard.bind(this));
        cards.addEventListener('click', this.flipCardEvent.bind(this));
        btnStartGame.addEventListener('click', this.startGame.bind(this));
    }

}