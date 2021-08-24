import { API_KEY, TMDB_ENDPOINT, TMDB_LANGUAGE } from '@/configs/';
import createInstance from './common/createInstance';

const searchInstance = createInstance({
	baseURL: TMDB_ENDPOINT + 'search/',
	// 쿼리 스트링
	params: {
		api_key: API_KEY,
		language: TMDB_LANGUAGE,
	},
});

const searchMovie = async (query, page = 1) => {
	try {
		const { data } = await searchInstance.get('movie', {
			params: {
				query,
				page,
			},
		});

		return {
			isError: false,
			data,
		};
	} catch (error) {
		const { response } = error;

		// TODO 함수를 사용해서 공통화 or axios 인터셉터 사용하기
		return {
			isError: true,
			errorData: {
				message: response?.data?.status_message || error.message,
				statusCode: response?.data?.status_code || null,
			},
		};
	}
};

export { searchMovie };
