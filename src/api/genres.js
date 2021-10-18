import { API_KEY, TMDB_ENDPOINT, TMDB_LANGUAGE } from '@/configs/';
import createInstance from './common/createInstance';

const genreInstance = createInstance({
	baseURL: TMDB_ENDPOINT + 'genre/',
	// 쿼리 스트링
	params: {
		api_key: API_KEY,
		language: TMDB_LANGUAGE,
	},
});

// https://developers.themoviedb.org/3/genres/get-movie-list
// https://developers.themoviedb.org/3/genres/get-tv-list
const getGenres = async (type = 'movie') => {
	try {
		const url = `${type}/list`;
		const { data } = await genreInstance.get(url);

		return {
			isError: false,
			data,
		};
	} catch (error) {
		const { response } = error;

		return {
			isError: true,
			errorData: {
				message: response?.data?.status_message || error.message,
				statusCode: response?.data?.status_code || null,
			},
		};
	}
};

export default getGenres;
