import axios from 'axios';

const TMDB_ENDPOINT = 'https://api.themoviedb.org/3/';
const API_KEY = '5c641d77de2e4b7554d8ebbf14934986';

/**
 * movie API 요청 인스턴스
 * https://api.themoviedb.org/3/movie/
 */
const movieInstance = axios.create({
	baseURL: TMDB_ENDPOINT + 'movie/',
	params: {
		api_key: API_KEY,
		language: 'ko-KR',
	},
});

export { movieInstance };
