const getTranslate = async (text, onLng) => {
  try {
    const apiKey = 'trnsl.1.1.20200514T004202Z.867b120ebad6fa1c.328bac30146ca3e2fe8515011e0ac94daf5034ab';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}`
            + `&text=${text}&lang=${onLng}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Что-то пошло не так');
    }
    // console.log(data);
    return data.text[0];
  } catch (e) {
    return null;
  }
};
export { getTranslate };
