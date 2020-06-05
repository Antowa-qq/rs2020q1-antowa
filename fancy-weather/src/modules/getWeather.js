const getWeatherForecast = async (lon, lat, lang) => {
  // const apiKey = '3e13741f48ec4da3bbb4296d1655233d';
  try {
    // const subKey = '93709a78edf24d808a073fe684bcb6db';
    const apiKey = '93709a78edf24d808a073fe684bcb6db';
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?days=4&lat=${lat}&lon=${lon}&lang=${lang}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.error || 'Houston , we have a problem');
    }
    // console.log(data.data);
    return data.data;
  } catch (e) {
    // console.log(e);
    return null;
  }
};

const getWeatherToday = async (lon, lat, lang) => {
  // const apiKey = '3e13741f48ec4da3bbb4296d1655233d';


  try {
    const apiKey = '93709a78edf24d808a073fe684bcb6db';
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&lang=${lang}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.error || 'Houston , we have a problem');
    }
    // console.log(data);
    return data.data[0];
  } catch (e) {
    console.log(e);
    return null;
  }
};
export { getWeatherForecast, getWeatherToday };
