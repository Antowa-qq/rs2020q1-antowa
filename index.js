import Navigation from './src/navigation.js';
import Menu from './src/menu.js';
import SwitchToggle from './src/switch-toggle.js';
import AudioController from './src/audioController.js';
import Statistics from './src/statistics.js';


const menu = new Menu();
menu.init();

const navigation = new Navigation();
navigation.init();

const statistics = new Statistics();
statistics.init();

AudioController.init();

SwitchToggle.init();



