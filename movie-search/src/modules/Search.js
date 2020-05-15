import { translateSearch } from './utils/getTranslate';
import { getMovies } from './utils/getMovies';

export default class Search {
  constructor() {
    this.btnClearInput = document.querySelector('.iconClose');
    this.input = document.querySelector('#search_form input');
    this.keyboardBtn = document.querySelector('.iconKeyboard');
  }

  clearInput() {
    this.input.value = '';
  }

  keyboardHandler() {
    const keyboard = document.querySelector('.wrapper__keyboard');
    keyboard.classList.toggle('hidden');
  }

  async goSearch(title, page) {
    const translate = await translateSearch(title);
    const { result, totalResults } = await getMovies(translate, page);

    return { result, totalResults };
  }

  init() {
    this.btnClearInput.addEventListener('click', this.clearInput.bind(this));
    this.keyboardBtn.addEventListener('click', this.keyboardHandler.bind(this));
    this.input.focus();
  }
}
