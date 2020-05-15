import Slider from './Slider';
import Search from './Search';
import Keyboard from './Keyboard';
import Validator from './utils/Validator';
import Message from './utils/Message';

export default class Controller {
  constructor() {
    this.slider = new Slider();
    this.search = new Search();
    this.keyboard = new Keyboard();
    this.wrapperSwiper = document.querySelector('.swiper-wrapper');
    this.form = document.querySelector('#search_form');
    this.input = document.querySelector('#search_form input');
    this.btnNextSlide = document.querySelector('.swiper-button-next');
    this.btnPrevSlide = document.querySelector('.swiper-button-prev');

    this.currentPage = 1;
    this.currentPageText = 'мечта';
    this.totalResultFilms = 0;
  }

  slideTracking() {
    const onMutate = async () => {
      const currentResultFilms = document.querySelectorAll('.film').length;
      if (this.slider.isEnd() && this.totalResultFilms > currentResultFilms) {
        this.endTracking(obs);
        this.currentPage += 1;
        /* eslint-disable max-len */
        const { result } = await this.search.goSearch(this.currentPageText, this.currentPage);
        if (result) {
          this.slider.renderSlides(result);
          this.slider.update();
        }
        this.slideTracking();
      }
    };
    const obs = this.startTracking(this.wrapperSwiper, onMutate);
  }

  startTracking(object, fnc) {
    const mutationConfig = {
      attributes: true,
    };
    const observer = new MutationObserver(fnc);
    observer.observe(object, mutationConfig);
    return observer;
  }

  endTracking(obs) {
    obs.disconnect();
  }

  async formHandler(event) {
    event.preventDefault();
    this.keyboard.hiddenKeyboard();
    if (Validator.isEmpty(this.input)) {
      const { result, totalResults, translate } = await this.search
        .goSearch(this.input.value);
      if (result) {

        this.slider.removeAllSlides();
        this.slider.renderSlides(result);
        this.slider.goSlide(0);
        this.currentPage = 1;
        this.currentPageText = this.input.value;
        Message.success(`Showing results for ${translate}`);
        this.slider.update();
        this.totalResultFilms = totalResults;
      }
    }
  }

  async defaultSlides() {
    const { result, totalResults } = await this.search.goSearch(this.currentPageText, this.currentPage);
    this.slider.renderSlides(result);
    this.slider.update();
    this.slideTracking();
    this.totalResultFilms = totalResults;
  }

  clickDocumentHandler(e) {
    const btnIconKeyboard = e.target.closest('.iconKeyboard');
    const keyboard = e.target.closest('.wrapper__keyboard');

    if (!btnIconKeyboard && !keyboard) {
      this.keyboard.hiddenKeyboard();
    }
  }

  likeDislikeHandler(event) {
    const card = event.target.closest('.film');
    const idFilm = card.querySelector('.film__title a').href;
    const parentLikeDilike = event.target.closest('.film__myRating');
    const { target } = event;
    if (target.classList.contains('like')) {
      target.classList.add('active-like');
      const dislike = parentLikeDilike.querySelector('.dislike');
      dislike.classList.remove('active-dislike');
      localStorage.setItem(idFilm, 'active-like');
    }
    if (target.classList.contains('dislike')) {
      target.classList.add('active-dislike');
      const like = parentLikeDilike.querySelector('.like');
      like.classList.remove('active-like');
      localStorage.setItem(idFilm, 'active-dislike');
    }
  }

  async init() {
    this.search.init();
    this.keyboard.init();
    await this.defaultSlides();

    this.form.addEventListener('submit', this.formHandler.bind(this));
    this.wrapperSwiper.addEventListener('click', this.likeDislikeHandler.bind(this));

    const enterVirtual = document.querySelector('.enterVirtual');
    enterVirtual.addEventListener('click', this.formHandler.bind(this));

    document.addEventListener('click', this.clickDocumentHandler.bind(this));
  }
}
