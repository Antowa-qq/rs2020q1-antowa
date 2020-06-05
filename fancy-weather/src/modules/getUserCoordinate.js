const getUserCoordinate = async () => {
  const defaultLocation = {
    lon: '27.5667',
    lat: '53.9000',
    city: 'Minsk',
    timezone: 'Europe/Minsk',
    codeCountry: 'BY',
  };

  // const apiKey = 'f887521f33f69c';

  const apiKey = 'f887521f33f69c';
  const url = `https://ipinfo.io?token=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.error.message || 'Houston , we have a problem');
    }
    // console.log(data);
    // console.log(data.country);
    const result = {
      lon: data.loc.split(',')[1],
      lat: data.loc.split(',')[0],
      city: data.city,
      timezone: data.timezone,
      codeCountry: data.country,
    };
    // console.log(data);
    return result;
  } catch (e) {
    console.log(e);
    return defaultLocation;
  }
};
export { getUserCoordinate };
