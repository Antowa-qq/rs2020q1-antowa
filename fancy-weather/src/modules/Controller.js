
import MapBox from './MapBox';
import Page from './Page';
import SpeechText from './SpeechText';
import VoiceController from './VoiceRecognition';
import Convert from './utils/convertTemp';
import MessageError from './MessageError';
import LoaderPage from './LoaderPage';
import { getWeatherForecast, getWeatherToday } from './getWeather';
import { getUserCoordinate } from './getUserCoordinate';
import { getLocationByName } from './getLocation';
import { getTranslate } from './getTranslate';
import { getLinkToImage } from './getLinkToImage';
import { weatherIcons } from './utils/weatherIcons';
import { getSeasonByLat } from './utils/getSeasonByLat';

export default class Controller {
  constructor() {
    this.language = localStorage.getItem('language') || 'en';
    this.currentMeasurementTemp = localStorage.getItem('measurementTemp') || 'C';
    this.currentLon = 0;
    this.currentLat = 0;
    this.dataLocationHelp = '';
    this.timezone = '';
    this.currentLonText = '';
    this.currentLatText = '';
    this.currentLocationName = '';
    this.countryCode = '';
    this.voiceText = '';
    this.voiceActive = false;
    this.currentTimeOfDay = '';
    this.timeOfDay = {
      d: 'day',
      n: 'night',
    };
    this.measurementTemp = {
      celius: 'C',
      fahrenheit: 'F',
    };

    this.controlsSpeech = {
      valueMore: ['громче', 'грамчэй', 'louder'],
      valueLower: ['тише', 'цішэй', 'ціша', 'quieter'],
      soundWeather: ['погода на сегодня', 'weather today', 'надвор\'е на сёння'],
    };
    this.dataLocationResponse = {
      noResult: 0,
      oneResult: 1,
      lotOfResult: 'A lot of result',
    };


    this.forecastToday = {
      temp: '',
      weather: '',
      feelsLike: '',
      wind: '',
      humidity: '',
      iconUrl: '',
    };

    this.forecastNext = {
      first: {
        temp: '',
        iconUrl: '',
      },
      second: {
        temp: '',
        iconUrl: '',
      },
      third: {
        temp: '',
        iconUrl: '',
      },
    };

    this.mapBox = new MapBox();
    this.page = new Page();
    this.speechText = new SpeechText();
    this.voiceController = new VoiceController();
    this.img = new Image();
    this.wrapperControlsRight = document.querySelector('.cotrolsRight');
    this.btnClose = document.querySelector('.button_close');
    this.form = document.querySelector('.cotrolsRight__form');
    this.wrapperLanguages = document.querySelector('.items-menu-language');
    this.wrapperCurrentLanguage = document.querySelector('.current-language');
    this.wrapperTemperature = document.querySelector('.cotrolsLeft__temperature');
    this.wrapperMicrofon = document.querySelector('.button_search-voice');
    this.wrapperImage = document.body;
    this.btnSwapImage = document.querySelector('.cotrolsLeft__update');
    this.wrapperSearchResults = document.querySelector('.search-results');
  }

  setLonLatTimezone(lon, lat, timezone) {
    [this.currentLon, this.currentLat, this.timezone] = [lon, lat, timezone];
  }

  setLonLatText(lon, lat) {
    [this.currentLonText, this.currentLatText] = [lon, lat];
  }

  setLanguage(lang) {
    localStorage.setItem('language', lang);
    this.language = lang;
    this.page.lang = lang;
    this.voiceController.recognition.lang = lang;
  }

  setMeasurementTemperature(value) {
    localStorage.setItem('measurementTemp', value);
    this.currentMeasurementTemp = value;
  }

  setCurrentTimeOfDay(timeOfDay) {
    this.currentTimeOfDay = this.timeOfDay[timeOfDay];
  }

  async getUserLocation() {
    const {
      lon, lat, city, timezone, codeCountry,
    } = await getUserCoordinate();
    this.setLonLatTimezone(lon, lat, timezone);
    this.countryCode = codeCountry;
    this.currentLocationName = city;
  }

  sortLocation(data) {
    return data
      .filter((element) => element.components._category === 'place');
  }

  setDataLocation(dataLocation) {
    try {
      const { annotations, formatted, geometry } = dataLocation;

      new Date().toLocaleString('en-EN', { timeZone: annotations.timezone.name, weekday: 'short' });
      this.wrapperSearchResults.textContent = '';
      this.wrapperControlsRight.classList.remove('open');
      this.setLonLatTimezone(geometry.lng, geometry.lat, annotations.timezone.name);
      this.setLonLatText(annotations.DMS.lng, annotations.DMS.lat);
      this.currentLocationName = formatted;
      return true;
    } catch (e) {
      return null;
    }
  }

  swohResultsSearch(data) {
    this.dataLocationHelp = data;
    this.wrapperSearchResults.textContent = '';
    data.forEach((element, index) => {
      const itemSearch = document.createElement('div');
      itemSearch.classList.add('search-items');
      itemSearch.dataset.key = index;
      itemSearch.textContent = element.formatted;
      this.wrapperSearchResults.append(itemSearch);
    });
    this.wrapperControlsRight.classList.add('open');
  }

  async locationByNameDefault(value) {
    let dataLocation = await getLocationByName(value, this.language);

    if (dataLocation !== null) {
      dataLocation = this.sortLocation(dataLocation);
      if (dataLocation.length === this.dataLocationResponse.noResult) {
        return this.dataLocationResponse.noResult;
      }
      if (dataLocation.length === this.dataLocationResponse.oneResult) {
        const response = this.setDataLocation(dataLocation[0]);
        if (!response) {
          return this.dataLocationResponse.noResult;
        }
        return this.dataLocationResponse.oneResult;
      }

      this.swohResultsSearch(dataLocation);
      return this.dataLocationResponse.lotOfResult;
    }

    return null;
  }

  async locationByNameStartPage(value) {
    console.log(this.countryCode);
    const dataLocation = await getLocationByName(value, this.language, this.countryCode);
    if (dataLocation !== null) {
      this.setDataLocation(dataLocation[0]);
      return true;
    }
    return null;
  }

  async weather() {
    const dataWeatherForecast = await getWeatherForecast(
      this.currentLon, this.currentLat, this.language,
    );
    const dataWeatherToday = await getWeatherToday(this.currentLon, this.currentLat, this.language);

    if (dataWeatherForecast !== null && dataWeatherToday !== null) {
      const {
        temp, weather, app_temp, wind_spd, rh, pod,
      } = dataWeatherToday;

      this.forecastToday.temp = temp;
      this.forecastToday.weather = weather.description;
      this.forecastToday.feelsLike = app_temp;
      this.forecastToday.wind = Number.parseFloat(wind_spd).toFixed(1);
      this.forecastToday.humidity = rh;
      this.setCurrentTimeOfDay(pod);
      this.forecastToday.iconUrl = weatherIcons[this.currentTimeOfDay][weather.code].icon;

      dataWeatherForecast.shift();
      let counter = 0;
      for (const element in this.forecastNext) {
        this.forecastNext[element].temp = dataWeatherForecast[counter].temp;
        /* eslint-disable max-len */
        this.forecastNext[element].iconUrl = weatherIcons[this.timeOfDay.d][dataWeatherForecast[counter].weather.code].icon;
        counter += 1;
      }
      return true;
    }
    return null;
  }

  setForecastSpeech() {
    const { dayNumber, month } = this.page.getDateTimeNow(this.language);
    this.speechText.setWeather(
      dayNumber, month,
      this.forecastToday.weather,
      this.forecastToday.wind,
      this.forecastToday.humidity,
    );
  }

  showResult() {
    this.img.onload = () => {
      this.setImage(this.img.src);

      this.form.querySelector('.input_search').value = '';
      this.mapBox.setMarker(this.currentLon, this.currentLat);
      this.page.setTimeZone(this.timezone);
      this.page.restartDateTime();
      this.page.showDays();

      this.page.showLocation(this.currentLocationName);
      this.page.showForecastToday(
        this.forecastToday.temp,
        this.forecastToday.weather,
        this.forecastToday.iconUrl,
        this.forecastToday.feelsLike,
        this.forecastToday.wind,
        this.forecastToday.humidity,
      );

      this.page.showForecastNext(
        [this.forecastNext.first.temp,
          this.forecastNext.second.temp,
          this.forecastNext.third.temp],
        [this.forecastNext.first.iconUrl,
          this.forecastNext.second.iconUrl,
          this.forecastNext.third.iconUrl],
      );
      if (this.currentMeasurementTemp === this.measurementTemp.fahrenheit) {
        this.changeMeasurementPage();
      }
      this.setForecastSpeech();
      this.page.showValueLonLat(this.currentLonText, this.currentLatText);
      LoaderPage.end();
    };
  }

  showActiveLanguage() {
    const storageLanguage = localStorage.getItem('language').toUpperCase();
    this.wrapperCurrentLanguage.textContent = storageLanguage;
    [...this.wrapperLanguages.children].forEach((element) => {
      if (element.textContent !== storageLanguage) {
        element.classList.add('not-active');
      }
    });
  }

  async changeLanguagePage() {
    const locationData = await getTranslate(this.currentLocationName, this.language);
    const weatherData = await getWeatherToday(
      this.currentLon, this.currentLat, this.language,
    );
    const { weather } = weatherData;
    this.forecastToday.weather = weather.description;
    this.setForecastSpeech();
    this.page.showLocation(locationData);
    this.page.showWeatherDesctiption(weather.description);
    this.page.showPage();
  }

  showActiveTemperature() {
    const storageTemperature = localStorage.getItem('measurementTemp').toUpperCase();
    [...this.wrapperTemperature.children].forEach((element) => {
      if (element.textContent.replace('°', '').trim() !== storageTemperature) {
        element.classList.add('not-active');
      }
    });
  }

  changeMeasurementPage() {
    const wrapperTemps = document.querySelectorAll('.temp');


    switch (this.currentMeasurementTemp) {
      case this.measurementTemp.celius:
        [...wrapperTemps].forEach((element) => {
          const temperature = element.textContent.replace('°', '');
          element.textContent = `${Convert.fahrenheitToCelsius(temperature).toFixed(1)}°`;
        });
        break;
      case this.measurementTemp.fahrenheit:
        [...wrapperTemps].forEach((element) => {
          const temperature = element.textContent.replace('°', '');
          element.textContent = `${Convert.celsiusToFahrenheit(temperature).toFixed(1)}°`;
        });
        break;
      default:
        break;
    }
    this.setForecastSpeech();
  }

  async weatherAndImgResponse() {
    try {
      LoaderPage.start();

      const dateWeather = await this.weather();

      if (!dateWeather) {
        throw Error('No result');
      }

      const dataImg = await this.swapImage();

      if (!dataImg) {
        console.log('Trouble img');
      }

      this.speechText.stopSpeak();
      this.speechText.setDisabled();
      this.showResult();
      this.speechText.removeDisabled();
    } catch (e) {
      MessageError.show(e);
      LoaderPage.end();
    }
  }

  async formHandler(e) {
    e.preventDefault();
    MessageError.clear();
    console.log(`//   Ключевые слова если странца на русском : 
        //  'тише', 'громче', 'погода на сегодня',
        //  Ключевые слова если странца на белорусском : 
        //  'цішэй', 'ціша', 'грамчэй', 'надвор'е на сёння'
        //  Ключевые слова если странца на английском : 
        //  'quieter', 'louder', 'weather today'
        //  Дополнительный функционал : 
        //  при поиске есть выпадающее меню позволяющее выбрать результа,
        //  если результат поиска возвращает больше 1 ответа.`);
    const valueInput = this.form.querySelector('.input_search').value;
    this.wrapperSearchResults.textContent = '';
    this.wrapperControlsRight.classList.remove('open');
    if (valueInput) {
      try {
        // console.log(this.timezone);
        const dataLocation = await this.locationByNameDefault(valueInput);
        console.log(dataLocation);
        if (!dataLocation) {
          throw Error('No result');
        }

        if (dataLocation === this.dataLocationResponse.oneResult) {
          await this.weatherAndImgResponse();
        }

        if (dataLocation === this.dataLocationResponse.lotOfResult) {
          // lot of result /// add handler for items result
        }
      } catch (error) {
        MessageError.show(error);
      }
    } else {
      console.log('error');
    }
  }

  changeLanguageHandler(e) {
    const { target } = e;

    if (target.classList.contains('not-active')) {
      [...this.wrapperLanguages.children].forEach((element) => {
        element.classList.add('not-active');
      });
      target.classList.remove('not-active');
      this.wrapperCurrentLanguage.textContent = target.textContent;
      this.setLanguage(target.textContent.toLowerCase());
      this.speechText.stopSpeak();
      this.speechText.setDisabled();
      this.changeLanguagePage();
      this.speechText.removeDisabled();
    }
  }

  changeMeasurementTempHandler(e) {
    const { target } = e;
    if (target.classList.contains('not-active')) {
      [...this.wrapperTemperature.children].forEach((element) => {
        element.classList.toggle('not-active');
      });
      this.setMeasurementTemperature(target.textContent.replace('°', '').trim());
      this.speechText.stopSpeak();
      this.speechText.setDisabled();
      this.changeMeasurementPage();
      this.speechText.removeDisabled();
    }
  }

  closeRequestHandler() {
    this.form.querySelector('.input_search').value = '';
    this.voiceText = '';
    this.wrapperControlsRight.classList.remove('open');
  }

  async swapImageHandler() {
    this.btnSwapImage.classList.add('animation');
    const spinner = document.querySelector('.spinner');
    spinner.addEventListener('animationend', () => this.btnSwapImage.classList.remove('animation'));
    await this.swapImage();
  }

  clickResultHandler(e) {
    const { target } = e;
    const { key } = target.dataset;
    this.setDataLocation(this.dataLocationHelp[key]);
    this.weatherAndImgResponse();
    this.closeRequestHandler();
  }

  async swapImage() {
    const season = getSeasonByLat(this.currentLatText);
    const data = await getLinkToImage(season, this.currentTimeOfDay);
    console.log(`Image : season - ${season} , time of day : ${this.currentTimeOfDay}`);
    if (!data) {
      this.img.src = `../assets/img/default_bg/${this.currentTimeOfDay.trim()}_${season.trim()}_bg.jpg`;
      return null;
    }
    this.img.src = data.full;
    return true;
  }

  setImage(url) {
    this.wrapperImage.style.backgroundImage = `url(${url})`;
  }


  controlVoiceHandler() {
    this.wrapperMicrofon.classList.toggle('active');
    this.voiceActive = !this.voiceActive;
    if (this.voiceActive) {
      this.voiceController.recognition.start();
    } else {
      this.voiceController.recognition.stop();
    }
  }

  controlSpeechEvent(text) {
    if (this.controlsSpeech.valueMore.includes(text)) {
      this.speechText.setMoreValue();
    }
    if (this.controlsSpeech.valueLower.includes(text)) {
      this.speechText.setLowerVolume();
    }
    if (this.controlsSpeech.soundWeather.includes(text)) {
      this.speechText.startSpeeak();
    }
  }

  contolVoiceSearch(text) {
    console.log(this.speechText.isVoiceActive);
    if (text) {
      this.form.querySelector('.input_search').value = text;
      console.log('click');
      const btn = document.querySelector('.button_search');
      btn.click();
    }
  }

  logicResultVoice(e) {
    if (!this.speechText.isVoiceActive) {
      this.voiceText = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
    }
  }

  logicEndVoice() {
    console.log(this.voiceText);
    if (this.voiceActive) {
      if (this.voiceController.isKeyWords(this.voiceText)) {
        this.controlSpeechEvent(this.voiceText);
      } else {
        this.contolVoiceSearch(this.voiceText);
      }
      this.voiceText = '';
      this.voiceController.recognition.start();
    }
  }

  addHandlers() {
    this.form.addEventListener('submit', this.formHandler.bind(this));
    this.wrapperLanguages.addEventListener('click', this.changeLanguageHandler.bind(this));
    this.wrapperTemperature.addEventListener('click', this.changeMeasurementTempHandler.bind(this));
    this.wrapperMicrofon.addEventListener('click', this.controlVoiceHandler.bind(this));
    this.voiceController.recognition.addEventListener('result', this.logicResultVoice.bind(this));
    this.voiceController.recognition.addEventListener('end', this.logicEndVoice.bind(this));
    this.btnClose.addEventListener('click', this.closeRequestHandler.bind(this));
    this.btnSwapImage.addEventListener('click', this.swapImageHandler.bind(this));
    this.wrapperSearchResults.addEventListener('click', this.clickResultHandler.bind(this));
  }

  async startPage() {
    if (!localStorage.getItem('language')) {
      this.setLanguage('en');
    }
    if (!localStorage.getItem('measurementTemp')) {
      this.setMeasurementTemperature('C');
    }

    await this.getUserLocation();
    await this.locationByNameStartPage(this.currentLocationName, this.countryCode);
    await this.weather();
    await this.swapImage();
  }


  async init() {
    await this.startPage();
    this.addHandlers();
    this.mapBox.init(this.currentLon, this.currentLat);
    this.page.init(this.timezone);
    this.speechText.init();
    this.showActiveTemperature();
    this.showActiveLanguage();
    this.showResult();
  }
}
