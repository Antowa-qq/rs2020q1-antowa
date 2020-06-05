import { translation } from './utils/translation';

export default class Page {
  constructor() {
    this.lang = localStorage.getItem('language') || 'en';
    this.timezone = '';
    this.dateTimeNow = document.querySelector('.weather-data__date-time');
    this.timerDateTimeNow = '';
    this.menu = document.querySelector('.drop-menu-laguage');
    this.beWeekDay = {
      Sun: 'Няд',
      Mon: 'Пнд',
      Tue: 'Аўт',
      Wed: 'Сер',
      Thu: 'Чцв',
      Fri: 'Пят',
      Sat: 'Суб',
    };

    this.beMonth = {
      January: 'Студзеня',
      February: 'Лютага',
      March: 'Сакавіка',
      April: 'Красавіка',
      May: 'Травеня',
      June: 'Чэрвеня',
      July: 'Ліпеня',
      August: 'Жнівеня',
      September: 'Верасеня',
      October: 'Кастрычніка',
      November: 'Лістапада',
      December: 'Снежаня',
    };
  }

  setTimeZone(timezone) {
    this.timezone = timezone;
  }

  showDays() {
    const days = document.querySelectorAll('.forecast__day');
    days.forEach((element, index) => {
      index += 1;
      element.textContent = this.getWeekDay(index);
    });
  }

  getWeekDay(index) {
    const date = new Date();
    const localeDay = date.toLocaleString('ru', { timeZone: this.timezone, weekday: 'long' });
    const numberDay = translation.day.ru.findIndex(
      (element) => element.toLowerCase() === localeDay,
    );
    const currentDay = this.getNextDay(index, numberDay);
    return translation.day[this.lang][currentDay];
  }

  getNextDay(index, numberDayInWeek) {
    let day = index + numberDayInWeek;
    if (day > translation.day[this.lang].length - 1) {
      day -= translation.day[this.lang].length;
    }
    return day;
  }

  restartDateTime() {
    clearInterval(this.timerDateTimeNow);
    this.timerDateTimeNow = setInterval(() => this.showDateTime.call(this), 1000);
    this.showDateTime();
  }

  startDateTime() {
    this.timerDateTimeNow = setInterval(() => this.showDateTime.call(this), 1000);
    this.showDateTime();
  }

  stopDateTime() {
    clearInterval(this.timerDateTimeNow);
  }

  getDateTimeNow() {
    const date = new Date();
    const localeLang = this.lang === 'be' ? 'en' : this.lang;
    let currentMonth = date.toLocaleString(`${localeLang}`, {
      timeZone: this.timezone, month: 'long', day: 'numeric',
    }).split(' ');
    currentMonth = localeLang === 'ru' ? currentMonth[1] : currentMonth[0];
    const day = date.toLocaleString(`${localeLang}`, { timeZone: this.timezone, weekday: 'short' });
    const dayNumber = date.toLocaleString(`${localeLang}`, { timeZone: this.timezone, day: 'numeric' });
    const time = date.toLocaleString(`${localeLang}`, {
      timeZone: this.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const result = {
      day: this.lang === 'be' ? this.beWeekDay[day].toLowerCase() : day,
      month: this.lang === 'be' ? this.beMonth[currentMonth].toLowerCase() : currentMonth,
      dayNumber,
      time,
    };
    return result;
  }

  showDateTime() {
    const {
      day, month, dayNumber, time,
    } = this.getDateTimeNow(this.lang);
    this.dateTimeNow.textContent = `${day.toLowerCase()}, ${dayNumber} ${month.toLowerCase()}, ${time}`;
  }

  showLngLat() {
    const lng = document.querySelector('.text-longitude');
    const lat = document.querySelector('.text-latitude');
    lng.textContent = translation.coordinates.lng[this.lang];
    lat.textContent = translation.coordinates.lat[this.lang];
  }

  showSearch() {
    const btnSearch = document.querySelector('.button_search');
    const inputSearch = document.querySelector('.input_search');

    btnSearch.textContent = translation.form.search[this.lang];
    inputSearch.placeholder = translation.form.placeholder[this.lang];
  }

  showForecastText() {
    const feelsLike = document.querySelector('.weather-weather-feels-like-text');
    feelsLike.textContent = translation.forecast.feel[this.lang];

    const windText = document.querySelector('.weather-wind-text');
    windText.textContent = translation.forecast.wind[this.lang];

    const windUnits = document.querySelector('.weather-wind-units');
    windUnits.textContent = translation.forecast.ms[this.lang];

    const humidity = document.querySelector('.weather-humidity-text');
    humidity.textContent = translation.forecast.humidity[this.lang];
  }

  showLocation(text) {
    const location = document.querySelector('.weather-data__location');
    location.textContent = text;
  }

  showValueLonLat(lon, lat) {
    const lonWrapper = document.querySelector('.longitude');
    const latWrapper = document.querySelector('.latitude');
    lonWrapper.textContent = lon;
    latWrapper.textContent = lat;
  }

  showWeatherDesctiption(text) {
    const weatherDescription = document.querySelector('.weather-description');
    weatherDescription.textContent = text;
  }

  showTempToday(text) {
    const tempWrapper = document.querySelector('.forecasts-today__temperature');
    tempWrapper.textContent = `${text}°`;
  }

  showFeelsLikeToday(text) {
    const feelsLikeWrapper = document.querySelector('.weather-feels-like');
    feelsLikeWrapper.textContent = `${text}°`;
  }

  showForecastToday(temp, description, iconUrl, feelsLike, wind, humidity) {
    // const iconWrapper = document.querySelector('.icon_main');
    const icon = document.querySelector('.icon_main img');
    icon.src = iconUrl;
    const windWrapper = document.querySelector('.weather-wind');
    const humidityWrapper = document.querySelector('.weather-humidity');

    this.showWeatherDesctiption(description);
    this.showTempToday(temp);
    this.showFeelsLikeToday(feelsLike);
    windWrapper.textContent = wind;
    humidityWrapper.textContent = `${humidity} %`;
    // iconWrapper.append(icon);
  }

  showForecastNext([...argsTemp], [...argsImg]) {
    const forecastTemp = document.querySelectorAll('.forecast__temperature');

    [...forecastTemp].forEach((element, index) => {
      element.textContent = `${argsTemp[index]}°`;
    });

    const forecastImg = document.querySelectorAll('.icon_default img');

    [...forecastImg].forEach((element, index) => {
      element.src = argsImg[index];
    });
  }

  dropMenuHandler() {
    document.querySelector('.cotrolsLeft__language').classList.toggle('open');
  }

  showPage() {
    this.showDays();
    this.showLngLat();
    this.showSearch();
    this.showForecastText();
    // this.startDateTime();
  }

  init(timeZone) {
    this.setTimeZone(timeZone);
    this.showPage();


    this.menu.addEventListener('click', this.dropMenuHandler.bind(this));
  }
}
