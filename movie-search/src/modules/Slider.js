import Swiper from 'swiper';

export default class Slider {
  constructor() {
    this.cotainerSwiper = document.querySelector('.swiper-container');
    this.wrapperSwiper = document.querySelector('.swiper-wrapper');
    this.dots = document.querySelector('.swiper-pagination');
    this.swiper = this.initSwiper();
    this.stateMyRating = {
      likeActive: 'active-like',
      dislikeActive: 'active-dislike'
    }
  }

  addSlide(title, href, img, year, rating) {
    const stateMyRating = localStorage.getItem(href);

    const wrapperSlide = document.createElement('div');
    wrapperSlide.classList.add('swiper-slide', 'film');

    const titleFilm = document.createElement('div');
    titleFilm.classList.add('film__title');
    titleFilm.innerHTML = `<a href ="${href}">${title}</a>`;

    const posterFilm = document.createElement('div');
    posterFilm.classList.add('film__poster');
    if (img === 'N/A') {
      posterFilm.innerHTML = '<img src ="./assets/img/no-poster.jpg" alt = "poster" />';
    } else {
      posterFilm.innerHTML = `<img src = "${img}" alt = "poster" />`;
    }

    const releaseFilm = document.createElement('div');
    releaseFilm.classList.add('film__releaseDate');
    releaseFilm.textContent = year;

    const ratingFilm = document.createElement('div');
    ratingFilm.classList.add('film__rating');
    ratingFilm.textContent = rating;

    const myRatingFilm = document.createElement('div');
    myRatingFilm.classList.add('film__myRating');
    if (stateMyRating) {
      if (stateMyRating === this.stateMyRating.likeActive) {
        myRatingFilm.innerHTML = `<div class = "like icon-rating ${stateMyRating}"></div>`
          + '<div class = "dislike icon-rating"></div>';
      }
      if (stateMyRating === this.stateMyRating.dislikeActive) {
        myRatingFilm.innerHTML = '<div class = "like icon-rating"></div>'
          + `<div class = "dislike icon-rating ${stateMyRating}"></div>`;
      }
    } else {
      myRatingFilm.innerHTML = '<div class = "like icon-rating"></div>'
        + '<div class = "dislike icon-rating"></div>';
    }


    wrapperSlide.append(titleFilm, posterFilm, releaseFilm, ratingFilm, myRatingFilm);
    return wrapperSlide;
  }

  renderSlides(arr) {
    arr.forEach((item) => {
      const result = this.addSlide(item.Title, item.href, item.Poster, item.Year, item.rating);
      this.swiper.appendSlide(result);
    });
  }

  removeAllSlides() {
    this.swiper.removeAllSlides();
  }

  goSlide(index) {
    this.swiper.slideTo(index, 1);
  }

  update() {
    this.swiper.update();
  }

  isEnd() {
    return this.swiper.isEnd;
  }

  initSwiper() {
    const swiper = new Swiper(this.cotainerSwiper, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 0,

        },
        540: {
          slidesPerView: 2,
          spaceBetween: 0,

        },
        730: {
          slidesPerView: 3,
          spaceBetween: 0,

        },
        1020: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
    return swiper;
  }
}
