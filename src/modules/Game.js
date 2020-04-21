import AudioController from './AudioController';
import randomNumber from './utils/RandomNumber';
import SwitchToggle from './Switch-toggle';
import ControllerPage from './ControllerPage';
import create from './utils/Create';


export default class Game {
  constructor(cardList) {
    this.cards = document.querySelector('.cards__game');
    this.cardList = cardList;
    this.countCardList = cardList.length;
    this.currentWordIndex = randomNumber(0, this.cardList.length - 1);
    this.currentWord = this.cardList[this.currentWordIndex].word;
    this.btnRepeatWord = document.querySelector('.btn__refresh');
    this.rating = document.querySelector('.rating');
    this.errorAudio = './assets/audio/tools/error.mp3';
    this.correctAudio = './assets/audio/tools/correct.mp3';
    this.victoryAudio = './assets/audio/tools/success.mp3';
    this.loseAudio = './assets/audio/tools/failure.mp3';
    this.correctCounter = 0;
    this.unCorrectCounter = 0;

    this.storageCards = JSON.parse(localStorage.getItem('statistics'));

    this.clickCard = (e) => {
      const currentCard = e.target.closest('.card__game');
      if (currentCard && !currentCard.classList.contains('unActive') && SwitchToggle.mode.play) {
        if (this.isCorrectWord(currentCard.querySelector('p').textContent)) {
          currentCard.classList.add('unActive');
          this.getNextWord();
        }
      }
    };

    this.repeatWord = () => {
      AudioController.playAudio(this.cardList[this.currentWordIndex].audioSrc);
    };
  }

  endGame() {
    if (this.correctCounter === this.countCardList && this.unCorrectCounter === 0) {
      this.victoryGame();
    } else {
      this.loseGame();
    }
    setTimeout(() => {
      ControllerPage.changePage('mainPage');
    }, 2000);
  }

  victoryGame() {
    this.cards.classList.add('text_victory');
    this.cards.textContent = 'Well PLayed';
  }

  loseGame() {
    this.cards.classList.add('text_lose');
    this.cards.textContent = `Failure, \n Errors: ${this.unCorrectCounter}`;
  }

  playAudio() {
    AudioController.playAudio(this.cardList[this.currentWordIndex].audioSrc);
  }

  playCorrectAudio() {
    AudioController.playAudio(this.correctAudio);
  }

  playErrorAudio() {
    AudioController.playAudio(this.errorAudio);
  }

  abortGame() {
    this.btnRepeatWord.removeEventListener('click', this.repeatWord);
    this.cards.removeEventListener('click', this.clickCard);
    this.activeCard();
    if (this.cards.querySelector('.btn__play')) {
      this.cards.querySelector('.btn__play').classList.remove('hidden');
    }
    if (this.cards.querySelector('.btn__play')) {
      this.btnRepeatWord.classList.add('hidden');
    }
    this.rating.textContent = '';
  }

  activeCard() {
    if (this.cards.querySelectorAll('.unActive')) {
      const unActiveCard = this.cards.querySelectorAll('.unActive');
      unActiveCard.forEach((item) => item.classList.remove('unActive'));
    }
  }

  createImage(srcImg) {
    const img = create('img');
    img.src = srcImg;
    return img;
  }

  addRatingLike() {
    this.rating.prepend(this.createImage('./assets/img/tools/likeCorrect.png'));
  }

  addRatingDisLike() {
    this.rating.prepend(this.createImage('./assets/img/tools/likeUnCorrect.png'));
  }


  isCorrectWord(word) {
    let desiredСard;
    for (const nameSection in this.storageCards) {
      this.storageCards[nameSection].forEach((item) => {
        if (item.word === this.currentWord
          && item.translation === this.cardList[this.currentWordIndex].translation) {
          desiredСard = item;
        }
      });
    }

    if (this.currentWord === word) {
      this.playCorrectAudio();
      this.addRatingLike();
      this.correctCounter += 1;

      desiredСard.correct += 1;
      localStorage.setItem('statistics', JSON.stringify(this.storageCards));

      return true;
    }
    desiredСard.incorrect += 1;
    localStorage.setItem('statistics', JSON.stringify(this.storageCards));

    this.unCorrectCounter += 1;


    this.playErrorAudio();
    this.addRatingDisLike();
    return false;
  }

  getNextWord() {
    this.cardList.splice(this.currentWordIndex, 1);

    if (!(this.cardList.length === 0)) {
      this.currentWordIndex = randomNumber(0, this.cardList.length - 1);
      this.currentWord = this.cardList[this.currentWordIndex].word;
      this.playAudio();
    } else {
      this.endGame();
    }
  }

  switchToggleEvent() {
    SwitchToggle.switchToggle.addEventListener('change', () => {
      this.abortGame();
    });
  }

  init() {
    this.switchToggleEvent();
    this.btnRepeatWord.addEventListener('click', this.repeatWord);
    this.cards.addEventListener('click', this.clickCard);
    this.playAudio();
  }
}
