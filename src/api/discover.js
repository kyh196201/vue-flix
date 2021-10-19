import { API_KEY, TMDB_ENDPOINT, TMDB_LANGUAGE } from '@/configs/';
import createInstance from './common/createInstance';

const discoverInstance = createInstance({
	baseURL: TMDB_ENDPOINT + 'discover/',
	// 쿼리 스트링
	params: {
		api_key: API_KEY,
		language: TMDB_LANGUAGE,
	},
});

// https://developers.themoviedb.org/3/discover/movie-discover
// https://developers.themoviedb.org/3/discover/tv-discover
const discover = async (type = 'movie', params) => {
	try {
		const url = type;

		const { data } = await discoverInstance.get(url, {
			params,
		});

		console.log(`discover ${type} data`, data);

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

export default discover;
