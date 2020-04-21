import cardList from './utils/CardList';
import create from './utils/Create';
import ControllerPage from './ControllerPage';

export default class Statistics {
  constructor() {
    this.keyStorageStatistics = 'statistics';
    this.mainContainer = document.querySelector('.main');
    this.storage = localStorage;
    this.cardsInfo = JSON.parse(this.storage.getItem(this.keyStorageStatistics))
      || this.creteCardsInfo();

    this.componentsCards = {
      word: 'word',
      translation: 'translation',
    };

    this.mode = {
      allWords: false,
      allwordsWithSection: true,
    };
    this.countRatio();
  }

  sortUp(cards, section, field) {
    if (field !== this.componentsCards.word && field !== this.componentsCards.translation) {
      cards[section].sort((a, b) => b[field] - a[field]);
    } else {
      cards[section].sort((a, b) => (a[field] > b[field] ? 1 : -1));
    }
  }

  sortDown(cards, section, field) {
    if (field !== this.componentsCards.word && field !== this.componentsCards.translation) {
      cards[section].sort((a, b) => a[field] - b[field]);
    } else {
      cards[section].sort((a, b) => (a[field] < b[field] ? 1 : -1));
    }
  }

  sortAll(cards, state, field) {
    const newCards = {};
    newCards.all = [];

    for (const nameSection in cards) {
      cards[nameSection].forEach((item) => {
        newCards.all.push(item);
      });
    }
    if (!state.classList.contains('sort_down')) {
      this.sortDown(newCards, 'all', field);
    }
    if (state.classList.contains('sort_down')) {
      this.sortUp(newCards, 'all', field);
    }
    return newCards;
  }

  sortSection(cards, state, field) {
    if (!state.classList.contains('sort_down')) {
      for (const nameSection in cards) {
        this.sortDown(cards, nameSection, field);
      }
    }
    if (state.classList.contains('sort_down')) {
      for (const nameSection in cards) {
        this.sortUp(cards, nameSection, field);
      }
    }
    return cards;
  }

  sortTable(btn) {
    const cardsCopy = { ...this.cardsInfo };
    const field = btn.classList[0];
    const state = btn.querySelector('button');
    let sortedCards = '';

    if (this.mode.allWords) {
      sortedCards = this.sortAll(cardsCopy, state, field);
    }
    if (this.mode.allwordsWithSection) {
      sortedCards = this.sortSection(cardsCopy, state, field);
    }
    this.removeTBody();
    this.renderTBody(sortedCards);
  }

  removeTBody() {
    const tbody = this.mainContainer.querySelector('tbody');
    tbody.remove();
  }

  renderTBody(cards) {
    const tbody = create('tbody');
    const table = document.querySelector('table');

    for (const nameSection in cards) {
      if (this.mode.allwordsWithSection) {
        const sectionTitleTr = create('tr', 'section_title');
        const sectionTitleTd = create('td', '', null, sectionTitleTr);
        sectionTitleTd.setAttribute('colspan', '6');
        sectionTitleTd.textContent = `${nameSection}, count word : ${cards[nameSection].length}`;
        tbody.append(sectionTitleTr);
      }

      cards[nameSection].forEach((item) => {
        const sectionInfoTr = create('tr', 'section__info');

        for (const k in item) {
          const column = create('td', k, null, sectionInfoTr);
          if (k === 'ratio') {
            column.textContent = `${item[k]} %`;
          } else {
            column.textContent = item[k];
          }
        }
        tbody.append(sectionInfoTr);
      });
    }

    table.append(tbody);
  }

  countRatio() {
    for (const nameSection in this.cardsInfo) {
      this.cardsInfo[nameSection].forEach((item) => {
        let countRatio = (+item.correct / (+item.correct + +item.incorrect)) * 100;

        if (countRatio) {
          countRatio = countRatio.toFixed(1);
        }
        if (countRatio === Infinity) {
          countRatio = 100;
        }
        if (Number.isNaN(countRatio) || countRatio === 0) {
          countRatio = 0;
        }
        item.ratio = countRatio;
      });
    }
    localStorage.setItem('statistics', JSON.stringify(this.cardsInfo));
  }

  activeSelectSort(e, btn) {
    const currentBtn = btn.querySelector('button');

    const unSelectColor = this.mainContainer.querySelectorAll('.activeSort');
    const unSelectArrow = this.mainContainer.querySelectorAll('.sort_down');

    if (unSelectColor) {
      unSelectColor.forEach((item) => {
        if (item !== currentBtn) {
          item.classList.remove('activeSort');
        }
      });
    }
    if (unSelectArrow) {
      unSelectArrow.forEach((item) => {
        if (item !== currentBtn) {
          item.classList.remove('sort_down');
        }
      });
    }
    btn.querySelector('button').classList.add('activeSort');
    btn.querySelector('button').classList.toggle('sort_down');
  }

  clickHeadersEvent(e) {
    const btn = e.target.closest('th');
    this.activeSelectSort(e, btn);
    this.sortTable(btn);
  }

  changeMode() {
    const radiuoBtnAllWord = document.querySelector('#rbnt-mode1-all-words');
    const radiuoBtnAllWordsSection = document.querySelector('#rbnt-mode1-words-with-section');
    this.mode = {
      allWords: radiuoBtnAllWord.checked,
      allwordsWithSection: radiuoBtnAllWordsSection.checked,
    };
    this.changeTable();
  }

  changeTable() {
    this.removeTBody();
    this.renderTBody(this.cardsInfo);
    this.defaultHeaders();
  }

  defaultHeaders() {
    const btn = this.mainContainer.querySelectorAll('.sort');

    if (btn) {
      btn.forEach((item) => {
        item.classList.remove('activeSort');
        item.classList.remove('sort_down');
      });
    }
  }

  createModeTableBlocks(textLabel, idRbtn, checkBtn) {
    const label = create('label');
    label.textContent = textLabel;
    label.setAttribute('for', idRbtn);
    const input = create('input');
    input.type = 'radio';
    input.name = 'group1';
    input.id = idRbtn;
    input.checked = checkBtn;
    return [label, input];
  }

  createModeTable() {
    const modeTableDescripton = create('div', 'mode-table__description');
    modeTableDescripton.textContent = 'Select Mode: ';

    const modeTableOne = create('div', 'mode-table__words-with-section',
      this.createModeTableBlocks(
        'Show all words and their sections',
        'rbnt-mode1-words-with-section',
        true,
      ));

    const modeTbaleTwo = create('div', 'mode-table__all-words',
      this.createModeTableBlocks(
        'Show all words',
        'rbnt-mode1-all-words',
        false,
      ));

    const modeTable = create('div', 'mode-table', [modeTableDescripton, modeTableOne, modeTbaleTwo]);
    this.mainContainer.append(modeTable);
  }

  createTableTh(text, classList) {
    const th = create('th', classList);
    th.textContent = text;
    const btn = create('button', 'sort', null, th);
    btn.textContent = '^';
    return th;
  }

  createTable(cards) {
    const headersTr = create('tr', 'headers', [
      this.createTableTh('Word', 'word'),
      this.createTableTh('Translate', 'translation'),
      this.createTableTh('Training clicks', 'clickTraining'),
      this.createTableTh('Answered correctly', 'correct'),
      this.createTableTh('Answered incorrectly', 'incorrect'),
      this.createTableTh('Answer ratio', 'ratio'),
    ]);

    const thead = create('thead', '', [headersTr]);

    const table = create('table', '', [thead]);
    const statistics = create('div', 'statistics', [table]);
    this.mainContainer.append(statistics);
    this.renderTBody(cards);

    this.changeTable();
  }

  clearTable() {
    const newCards = this.creteCardsInfo();
    this.removeTBody();
    this.addCardsInStorage(newCards);
    this.renderTBody(newCards);
    this.cardsInfo = newCards;
  }

  repeatDifficultWords() {
    ControllerPage.changePage('repeatDifficultWords');
  }

  createBtnControls() {
    const tableControls = create('div', 'controlsTable');
    const btnRepeatWord = create('button', 'controlsTable__repeat', null, tableControls);
    btnRepeatWord.textContent = 'Repeat difficult words';
    const btnClearTable = create('button', 'controlsTable__clear', null, tableControls);
    btnClearTable.textContent = 'Reset';
    this.mainContainer.append(tableControls);
  }

  render() {
    this.createModeTable();
    this.createTable(this.cardsInfo);
    this.createBtnControls();

    const radiuoBtnAllWord = document.querySelector('#rbnt-mode1-all-words');
    const radiuoBtnAllWordsSection = document.querySelector('#rbnt-mode1-words-with-section');
    radiuoBtnAllWord.addEventListener('change', this.changeMode.bind(this));
    radiuoBtnAllWordsSection.addEventListener('change', this.changeMode.bind(this));

    const headers = document.querySelector('.headers');
    headers.addEventListener('click', this.clickHeadersEvent.bind(this));

    const btnClearTable = document.querySelector('.controlsTable__clear');
    btnClearTable.addEventListener('click', this.clearTable.bind(this));

    const btnRepeatWord = document.querySelector('.controlsTable__repeat');
    btnRepeatWord.addEventListener('click', this.repeatDifficultWords.bind(this));
  }

  creteCardsInfo() {
    const cards = {};
    for (const i in cardList) {
      cards[i] = [];
      cardList[i].forEach((item) => {
        cards[i].push({
          word: item.word,
          translation: item.translation,
          clickTraining: 0,
          correct: 0,
          incorrect: 0,
          ratio: 0,
        });
      });
    }
    return cards;
  }

  addCardsInStorage(cards) {
    this.storage.setItem(this.keyStorageStatistics, JSON.stringify(cards));
  }

  init() {
    if (!this.storage.getItem(this.keyStorageStatistics)) {
      this.addCardsInStorage(this.cardsInfo);
    }
  }
}
