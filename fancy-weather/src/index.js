import './style.css';
import Controller from './modules/Controller';


const controller = new Controller();
controller.init();


//  test map


//  test animate icons

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
// const getIcon = async (city) => {
//   const url = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&days=4&key=3e13741f48ec4da3bbb4296d1655233d';
//   const res = await fetch(url);

//   // const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${apiKey}`;
//   // const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }

// getIcon();
