import { API_KEY, TMDB_ENDPOINT, TMDB_LANGUAGE } from '@/configs/';
import createInstance from './common/createInstance';

/**
 * movie API 인스턴스
 */
const movieInstance = createInstance({
	baseURL: TMDB_ENDPOINT + 'movie/',
	// 쿼리 스트링
	params: {
		api_key: API_KEY,
		language: TMDB_LANGUAGE,
	},
});

/**
 * https://developers.themoviedb.org/3/movies/get-movie-details
 * 영화 상세 정보 조회
 * @param {Number} movieId : 영화 아이디
 */
const getMovieDetail = async movieId => {
	try {
		const { data } = await movieInstance.get('' + movieId);

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
};

/**
 * 영화 출연진 조회
 * https://developers.themoviedb.org/3/movies/get-movie-credits
 */
const getMovieCredits = async movieId => {
	try {
		const url = `${movieId}/credits`;

		const { data } = await movieInstance.get(url);

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
};

/**
 * https://developers.themoviedb.org/3/movies/get-now-playing
 * now-playing, latest, top-rated, popular, upcoming에 해당하는 영화 리스트 조회
 * @param {String} releaseType : release type
 */
const getMovieLists = async (releaseType, page = 1) => {
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
};

const getSimilarMovies = async (movieId, page = 1) => {
	try {
		const url = `${movieId}/similar`;

		const { data } = await movieInstance.get(url, {
			params: {
				page,
			},
		});

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

export { getMovieDetail, getMovieCredits, getMovieLists, getSimilarMovies };
