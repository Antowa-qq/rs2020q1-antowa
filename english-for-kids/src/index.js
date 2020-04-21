import Navigation from './modules/Navigation';
import Menu from './modules/Menu';
import SwitchToggle from './modules/Switch-toggle';
import AudioController from './modules/AudioController';
import Statistics from './modules/Statistics';
import './style.css';


const menu = new Menu();
menu.init();

const navigation = new Navigation();
navigation.init();

const statistics = new Statistics();
statistics.init();

AudioController.init();

SwitchToggle.init();
