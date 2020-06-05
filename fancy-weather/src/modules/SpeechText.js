export default class SpeechText {
  constructor() {
    this.msg = new SpeechSynthesisUtterance();
    this.voice = [];

    this.msg.rate = 1.3;
    this.msg.pitch = 1;
    // this.msg.lang = 'ru';
    this.msg.volume = 0.5;
    this.isVoiceActive = false;
    this.isCancel = false;
    this.forecast = {
      day: '',
      month: '',
      temp: '',
      feels: '',
      weather: '',
      wind: '',
      humidity: '',
    };

    this.wrapperSound = document.querySelector('.cotrolsLeft__sound');
  }

  setDisabled() {
    this.wrapperSound.setAttribute('disabled', 'true');
    this.wrapperSound.classList.add('not-active');
  }

  removeDisabled() {
    this.wrapperSound.removeAttribute('disabled');
    // this.wrapperSound.classList.add('not-active');
  }

  setWeather(day, month, weather, wind, humidity) {
    this.forecast.day = day;
    this.forecast.month = month;
    this.forecast.temp = document.querySelector('.forecasts-today__temperature').textContent.replace('°', '');
    this.forecast.feels = document.querySelector('.weather-feels-like').textContent.replace('°', '');
    this.forecast.weather = weather;
    this.forecast.wind = wind;
    this.forecast.humidity = humidity;
  }

  setMoreValue() {
    if (this.msg.volume !== 1) {
      this.msg.volume += 0.1;
      console.log('set volume more');
    } else {
      console.log('max volume');
    }
  }

  setLowerVolume() {
    if (this.msg.volume !== 0) {
      this.msg.volume -= 0.1;
      console.log('set volume lower');
    } else {
      console.log('min volume');
    }
  }

  startSpeeak() {
    this.defautlTextForecas = {
      be:
                `Сягодня ${this.forecast.day} ${this.forecast.month} , 
                ${this.forecast.temp} градусаў , 
                ${this.forecast.weather} ,
                адчуваецца як ${this.forecast.feels} градусаў ,
                вецер ${this.forecast.wind} метраў у секунду,
                вільготнасць ${this.forecast.humidity} працэнтаў`,
      ru: `
                Сегодня ${this.forecast.day} ${this.forecast.month} , 
                ${this.forecast.temp} градусов , 
                ${this.forecast.weather} ,
                ощущается как ${this.forecast.feels} градусов,
                ветер ${this.forecast.wind} метров в секунду , 
                влажность ${this.forecast.humidity} %`,

      en: `
                Today ${this.forecast.day} ${this.forecast.month} , 
                ${this.forecast.temp} degrees , 
                ${this.forecast.weather} ,
                feels like ${this.forecast.feels} degrees,
                wind ${this.forecast.wind} meters per second ,
                humidity ${this.forecast.humidity} %`,
    };
    const lang = localStorage.getItem('language') || 'en';
    this.msg.lang = lang;
    this.msg.text = this.defautlTextForecas[lang];
    console.log(this.defautlTextForecas[lang]);

    // this.msg.text = 'a';
    speechSynthesis.speak(this.msg);
  }

  stopSpeak() {
    this.isVoiceActive = false;
    // this.isCancel = true;
    speechSynthesis.cancel();
  }

  startSpeeakHandler() {
    this.startSpeeak();
  }

  init() {
    this.wrapperSound.addEventListener('click', this.startSpeeakHandler.bind(this));

    this.msg.addEventListener('start', () => {
      this.isVoiceActive = true;
      this.wrapperSound.setAttribute('disabled', 'true');
      this.wrapperSound.classList.remove('not-active');
    });

    this.msg.addEventListener('end', () => {
      if (this.isVoiceActive) {
        this.wrapperSound.removeAttribute('disabled');
        this.wrapperSound.classList.add('not-active');
        this.isVoiceActive = false;
      }
    });
  }
}
