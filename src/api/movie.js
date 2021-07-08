import { API_KEY } from '@/configs/';
import createInstance from './common/createInstance';

/**
 * movie API 요청 인스턴스
 * https://api.themoviedb.org/3/movie/
 */
const movieInstance = createInstance({
	baseURL: process.env.VUE_APP_TMDB_ENDPOINT + 'movie/',
	params: {
		api_key: API_KEY,
		language: 'ko-KR',
	},
});

/**
 * 영화 상세 정보 조회
 * https://developers.themoviedb.org/3/movies/get-movie-details
 * @param {Number} id : 영화 아이디
 */
async function getMovieDetail(id) {
	try {
		const { data } = await movieInstance.get('' + id);

		// TODO 함수를 사용해서 공통화 or axios 인터셉터 사용하기
		return {
			isError: false,
			data,
		};
	} catch (error) {
		const response = error.response;

		// TODO 함수를 사용해서 공통화 or axios 인터셉터 사용하기
		return {
			isError: true,
			errorData: {
				message: response?.data?.status_message || error.message,
				statusCode: response?.data?.status_code || null,
			},
		};
	}
}

/**
 * now-playing, latest, top-rated, popular, upcoming에 해당하는 영화 리스트 조회
 * https://developers.themoviedb.org/3/movies/get-now-playing
 * @param {String} releaseType : release type
 */
async function getMovieLists(releaseType, page = 1) {
	try {
		const { data } = await movieInstance.get(releaseType, {
			params: {
				page,
			},
		});

		return {
			isError: false,
			data,
		};
	} catch (error) {
		const response = error.response;

		return {
			isError: true,
			errorData: {
				message: response?.data?.status_message || error.message,
				statusCode: response?.data?.status_code || null,
			},
		};
	}
}

export { getMovieDetail, getMovieLists };
