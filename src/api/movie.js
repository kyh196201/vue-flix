import axios from 'axios';
import { TMDB_ENDPOINT, API_KEY } from './index';

const movieInstance = axios.create({
	baseURL: TMDB_ENDPOINT,
	params: {
		api_key: API_KEY,
	},
});

/**
 * 영화에 대한 기본 정보 가져오는 함수
 * https://developers.themoviedb.org/3/movies/get-movie-details
 * @param {Number} id : 영화 아이디
 */
export async function getMovieDetail(id) {
	const url = `movie/${id}`;
	const response = await movieInstance.get(url);

	return response;
}
