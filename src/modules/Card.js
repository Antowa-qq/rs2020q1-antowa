import SwitchToggle from './Switch-toggle';
import Game from './Game';
import AudioController from './AudioController';
import ControllerPage from './ControllerPage';
import create from './utils/Create';
import cardList from './utils/CardList';

export default class Card {
  constructor(list) {
    this.mainContainer = document.querySelector('.main');
    this.storageCards = JSON.parse(localStorage.getItem('statistics'));
    this.cardList = cardList[ControllerPage.currentPage] || list;
  }

  startGame() {
    const copyList = this.cardList.slice();
    const game = new Game(copyList);

    game.init();
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
    });
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

    if (currentCard) {
      const word = currentCard.querySelector('p').textContent;
      const translation = currentCard.querySelector('.card__item_back p').textContent;

      if (currentCard
        && !e.target.closest('div').classList.contains('rotate')
        && SwitchToggle.mode.training) {
        const desiredСard = this.cardList.find((item) => item.word === word);
        AudioController.playAudio(desiredСard.audioSrc);
      }
      if (currentCard && SwitchToggle.mode.training) {
        this.increaseTrainingWord(word, translation);
      }
    }
  }

  increaseTrainingWord(word, translation) {
    for (const nameSection in this.storageCards) {
      this.storageCards[nameSection].forEach((item) => {
        if (word === item.word && translation === item.translation) {
          item.clickTraining += 1;
        }
      });
    }
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

    this.cardList.forEach((element) => {
      const rotateImg = create('img');
      rotateImg.src = './assets/img/tools/rotate.png';
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
    btnGamePlay.textContent = 'Start Game';
    const btnGameRefresh = create('button', 'btn__refresh hidden');
    btnGameRefresh.textContent = '⟲';

    create('div', 'btns', [btnGamePlay, btnGameRefresh], cardsGame);

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
