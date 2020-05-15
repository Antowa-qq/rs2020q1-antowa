/* eslint-disable import/extensions */
import buttons from './utils/buttons';
import createElementDom from './utils/domhelp';

export default class Keyboard {
  constructor() {
    this.buttons = {
      ru: buttons.ru.flat(),
      en: buttons.en.flat(),
    };
    this.capsLockState = false;
    this.shiftState = false;
    this.storage = window.localStorage;
    this.textArea = document.querySelector('#search_form input');
    this.wrapper = document.querySelector('.wrapper__keyboard');
    this.setLanguage(this.getLanguage() || 'ru');
  }

  changeLanguage() {
    if (this.getLanguage() === 'ru') {
      this.setLanguage('en');
    } else {
      this.setLanguage('ru');
    }
    this.showKeysDefult();
  }

  showKeyboard() {
    this.wrapper.classList.remove('hidden');
  }

  hiddenKeyboard() {
    this.wrapper.classList.add('hidden');
  }

  setLanguage(language) {
    this.storage.setItem('language', language);
  }

  getLanguage() {
    return this.storage.getItem('language');
  }

  showKeysDefult() {
    const buttonsKeyboard = this.wrapper.querySelectorAll('.keyboard__button');
    this.buttons[this.getLanguage()]
      .forEach((item, index) => { buttonsKeyboard[index].innerHTML = item.key; });
  }

  showKeysShift() {
    const buttonsKeyboard = this.wrapper.querySelectorAll('.keyboard__button');
    this.buttons[this.getLanguage()]
      .forEach((item, index) => { buttonsKeyboard[index].innerHTML = item.shiftKey; });
  }

  showKeysCapsLock() {
    const buttonsKeyboard = this.wrapper.querySelectorAll('.keyboard__button');
    this.buttons[this.getLanguage()]
      .forEach((item, index) => {
        if (item.capsLockKey) {
          buttonsKeyboard[index].innerHTML = item.capsLockKey;
        }
      });
  }

  showKeysUnCapsLock() {
    const buttonsKeyboard = this.wrapper.querySelectorAll('.keyboard__button');
    this.buttons[this.getLanguage()]
      .forEach((item, index) => {
        if (item.capsLockKey) {
          buttonsKeyboard[index].innerHTML = item.key;
        }
      });
  }


  keyAnimation(key) {
    const btn = this.wrapper.querySelector(`div[data-key = ${key}]`);
    btn.classList.toggle('keyboard__button_active');
  }

  capsLockEvent() {
    if (this.capsLockState) {
      this.showKeysCapsLock();
    } else {
      this.showKeysUnCapsLock();
    }
  }

  shiftEvent() {
    if (this.shiftState) {
      this.showKeysShift();
    } else {
      this.showKeysDefult();
    }
  }

  tabEvent() {
    this.writeTextArea('\t');
  }

  enterEvent() {
    this.writeTextArea('\n');
  }

  backSpaceEvent() {
    const position = this.textArea.selectionStart;
    if (this.textArea.value && position !== 0) {
      const text = this.textArea.value.slice(0, this.textArea.selectionStart - 1)
        + this.textArea.value.slice(this.textArea.selectionStart);
      this.textArea.value = '';
      this.writeTextArea(text);
      this.setPositionCursor(position - 1);
    } else {
      this.setPositionCursor(0);
    }
  }

  arrowDown() {
    this.setPositionCursor(this.textArea.value.length);
  }

  arrowUp() {
    this.setPositionCursor(0);
  }

  arrowLeft() {
    this.setPositionCursor(this.textArea.selectionStart - 1);
  }

  arrowRight() {
    this.setPositionCursor(this.textArea.selectionStart + 1);
  }

  setPositionCursor(pos) {
    this.textArea.selectionStart = pos;
    this.textArea.selectionEnd = this.textArea.selectionStart;
    this.textArea.focus();
  }

  writeTextArea(key) {
    let text = key;
    if (text === '&amp;') {
      text = '&';
    }
    this.textArea.setRangeText(text, this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
    this.textArea.focus();
  }

  keyClickMouseEvent(e) {
    if (e.target.classList.contains('keyboard__button')) {
      if (e.ctrlKey && e.target.dataset.key === 'ShiftLeft') {
        this.changeLanguage();
        if (this.capsLockState) {
          this.showKeysCapsLock();
        }
      }
      switch (e.target.dataset.key) {
        case 'CapsLock':
          this.capsLockState = !this.capsLockState;
          this.keyAnimation(e.target.dataset.key);
          this.capsLockEvent(e);
          if (this.shiftState && this.capsLockState) {
            this.showKeysUnCapsLock();
          }
          if (this.shiftState && !this.capsLockState) {
            this.showKeysShift();
          }
          break;
        case 'Backspace':
          this.backSpaceEvent(e);
          break;
        case 'Tab':
          this.tabEvent(e);
          break;
        case 'Enter':
          // this.enterEvent(e);
          break;
        case 'ArrowUp':
          this.arrowUp(e);
          break;
        case 'ArrowDown':
          this.arrowDown(e);
          break;
        case 'ArrowLeft':
          this.arrowLeft(e);
          break;
        case 'ArrowRight':
          this.arrowRight(e);
          break;
        case 'ShiftLeft':
          this.shiftState = !this.shiftState;
          this.shiftEvent(e);
          this.keyAnimation(e.target.dataset.key);
          if (this.capsLockState) {
            this.showKeysUnCapsLock();
          }
          break;
        case 'ShiftRight':
        case 'ControlRight':
        case 'MetaLeft':
          this.changeLanguage();
          if (this.capsLockState) {
            this.showKeysCapsLock();
          }
          break;
        case 'AltLeft':
        case 'AltRight':
          break;

        default:
          this.writeTextArea(e.target.innerHTML, 1);
      }
    }
  }


  init() {
    const keyboard = createElementDom('div', this.wrapper, 'keyboard');
    const keyboardButtons = createElementDom('div', keyboard, 'keyboard__buttons');

    for (let i = 0; i < buttons[this.getLanguage()].length; i += 1) {
      const line = createElementDom('div', keyboardButtons, 'line');
      buttons[this.getLanguage()][i].forEach((item) => {
        const btn = createElementDom('div', line, 'keyboard__button');
        switch (item.keyCode) {
          case 'Backspace':
          case 'Tab':
          case 'CapsLock':
          case 'ControlLeft':
          case 'ControlRight':
          case 'AltRight':
            btn.classList.add('keyboard__button_middle');
            break;
          case 'Enter':
            btn.classList.add('enterVirtual', 'keyboard__button_middle');
            // btn.classList.add('keyboard__button_middle');
            break;
          case 'ShiftLeft':
          case 'ShiftRight':
            btn.classList.add('keyboard__button_middle');
            break;
          case 'Space':
            btn.classList.add('keyboard__button_space');
            break;
          default:
            btn.classList.add('keyboard__button_default');
        }
        btn.textContent = item.key;
        btn.dataset.key = item.keyCode;
      });
    }

    // window.addEventListener('keydown', this.keyDownEvent.bind(this));
    // window.addEventListener('keyup', this.keyUpEvent.bind(this));
    keyboard.addEventListener('click', this.keyClickMouseEvent.bind(this));
  }
}
