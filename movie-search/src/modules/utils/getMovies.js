import Loader from './Loader';
import Message from './Message';

const getMovies = async (title, page = 1) => {
  Message.clear();
  try {
    const btn = document.querySelector('.search');
    btn.setAttribute('disabled', true);
    Loader.start();

    const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=837df5f6&plot=full`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === 'True') {
      const result = data.Search;
      const { totalResults } = data;

      for (const element in result) {
        /* eslint-disable no-await-in-loop */
        const res1 = await fetch(`https://www.omdbapi.com/?i=${result[element].imdbID}&apikey=837df5f6`);
        const data1 = await res1.json();
        result[element].href = `https://www.imdb.com/title/${result[element].imdbID}/`;
        result[element].rating = data1.imdbRating;
      }
      await Promise.all(result);
      Loader.stop();
      btn.removeAttribute('disabled');
      return { result, totalResults };
    }

    Message.error(data.Error);
    btn.removeAttribute('disabled');
    Loader.stop();
    return false;
  } catch (e) {
    Message.error(e.message);
    Loader.stop();
    return false;
  }
};
export { getMovies };
