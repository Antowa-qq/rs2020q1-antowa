
async function getLinkToImage(season, timeOfDay) {
  try {
    // const apiKey = 'hboQsJEiR2KPnJl0vKo5FFS6UcEgcIgrqSsteBoNyC8';
    // const apiKey = 'tAWIvhSpwZ1MZSnvFVXeXA4kRkOESI_2kk6K7zqLPzI';
    const apiKey = 'z4aVNCEDkBe9OXu6fpmkarM_K8Zp74Ksj3-PY8C7TJY';
    const url = `
    https://api.unsplash.com/photos/random?orientation=landscape&per_page=1
    &query=${season},${timeOfDay},nature
    &client_id=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(arguments);
    if (!res.ok) {
      throw Error(data.errors[0] || 'Houston , we have a problem');
    }
    if (data.urls.lenght === 0) {
      throw Error('No result');
    }
    // console.log(data);
    return data.urls;
  } catch (e) {
    console.log(e);
  }
  return null;
}
export { getLinkToImage };
