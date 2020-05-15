import Error from './Error';

const translateSearch = async (text) => {
  try {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/'
      + 'translate?key=trnsl.1.1.20200514T004202Z.867b120ebad6fa1c.328bac30146ca3e2fe8515011e0ac94daf5034ab'
      + `&text=${text}&lang=ru-en`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      Error.show('Что-то пошло не так');
      throw new Error(data.message || 'Что-то пошло не так');
    }

    return data.text[0];
  } catch (e) {
    // console.log(e.name);
    // Error.show(e.message);
    return false;
  }
};
export { translateSearch };
