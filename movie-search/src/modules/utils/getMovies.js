import Loader from './Loader';
import Message from './Message';

const errorData = {
  movieNotFound: 'Movie not found!',
  manyResult: 'Too many results.',
}

const response = {
  success: 'True',
  fail: 'False'
}

const getMovies = async (title, page = 1) => {
  Message.clear();
  try {
    const btn = document.querySelector('.search');
    btn.setAttribute('disabled', true);
    Loader.start();

    const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=837df5f6&plot=full`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.Response === response.success) {
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


    switch (data.Error) {
      case errorData.movieNotFound:
        Message.error(`No results were found for ${title}`);
        break;
      case errorData.manyResult:
        Message.error(`Too many results for ${title}`);
        break;
      default:
        Message.error(data.Error);
    }

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
