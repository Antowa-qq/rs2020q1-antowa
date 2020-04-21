import cardList from './utils/CardList';
import Card from './Card';
import create from './utils/Create';


export default class RepeatDifficultWords {
  constructor() {
    this.mainContainer = document.querySelector('main');
    this.cardsInfo = JSON.parse(localStorage.getItem('statistics'));
  }

  getWordsAll() {
    const wordsAll = [];
    for (const nameSection in this.cardsInfo) {
      this.cardsInfo[nameSection].forEach((item) => {
        wordsAll.push(item);
      });
    }

    wordsAll.sort((a, b) => a.ratio - b.ratio);

    return wordsAll;
  }

  getCardMisspelledWords(word, translation, arr) {
    for (const nameSection in cardList) {
      cardList[nameSection].forEach((element) => {
        if (word === element.word && translation === element.translation) {
          arr.push(element);
        }
      });
    }
  }

  getMisspelledWords(wordsAll) {
    const wordsRepeat = [];
    wordsAll.forEach((item) => {
      if (item.incorrect !== 0 && wordsRepeat.length !== 8) {
        this.getCardMisspelledWords(item.word, item.translation, wordsRepeat);
      }
    });
    return wordsRepeat;
  }

  createWordsRepeat() {
    const cardsForRepeat = this.getMisspelledWords(this.getWordsAll());
    if (cardsForRepeat.length !== 0) {
      this.render(cardsForRepeat);
    } else {
      const info = create('div', 'info-repet', null, this.mainContainer);
      info.textContent = 'Nothing to repeat!';
      this.mainContainer.append(info);
    }
  }

  render(cardsForRepeat) {
    const card = new Card(cardsForRepeat);
    card.init();
  }

  init() {
    this.createWordsRepeat();
  }
}
