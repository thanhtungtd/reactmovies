export const fetcher = (...args) => fetch(...args).then(res => res.json());

export const apiKey = "e19297dd210c0b9fcb582119bbdd0e29";

const tmdbEnpoint = "https://api.themoviedb.org/3/movie";

export const tmdbGetAPI = {
    getMovieList: (type, page = 1) => `${tmdbEnpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (movieId) => `${tmdbEnpoint}/${movieId}?api_key=${apiKey}`,
    getMovieCredits: (movieId) => `${tmdbEnpoint}/${movieId}/credits?api_key=${apiKey}`,
    getMovieVideos: (movieId) => `${tmdbEnpoint}/${movieId}/videos?api_key=${apiKey}`,
    getMovieSimilar: (movieId) => `${tmdbEnpoint}/${movieId}/similar?api_key=${apiKey}`,

    imageOriginal: (url) => `url(https://image.tmdb.org/t/p/original/${url})`,
    imageW500: (url) => `https://image.tmdb.org/t/p/w500/${url}`
}