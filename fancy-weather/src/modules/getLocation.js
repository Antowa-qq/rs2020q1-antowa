const getLocationByName = async (name, lang, code) => {
  try {
    // const apiKey = '93006d20ac1c4daeaefb7a8c93528564';
    const apiKey = '93006d20ac1c4daeaefb7a8c93528564';
    const codeCountry = code || '';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${name}&countrycode=${codeCountry}&language=${lang}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(res);

    if (!res.ok) {
      throw Error(data.status.message || 'Houston , we have a problem');
    }

    if (data.results.length === 0) {
      throw Error('No result');
    }
    // console.log(codeCountry);
    // console.log(data);


    return data.results;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export { getLocationByName };
