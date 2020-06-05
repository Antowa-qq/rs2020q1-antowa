export default class VoiceController {
  constructor() {
    this.keywords = {
      ru: ['тише', 'громче', 'погода на сегодня'],
      en: ['quieter', 'louder', 'weather today'],
      be: ['цішэй', 'ціша', 'грамчэй', 'надвор\'е на сёння'],
    };
    /* eslint-disable no-undef */
    window.SpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
  }

  isKeyWords(words) {
    const lang = localStorage.getItem('language') || 'en';
    if (this.keywords[lang].includes(words)) {
      return true;
    }
    return false;
  }
}
