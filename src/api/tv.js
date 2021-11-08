import { API_KEY, TMDB_ENDPOINT, TMDB_LANGUAGE } from '@/configs/';
import createInstance from './common/createInstance';

/**
 * tv API 인스턴스
 */
const tvInstance = createInstance({
	baseURL: TMDB_ENDPOINT + 'tv/',
	// 쿼리 스트링
	params: {
		api_key: API_KEY,
		language: TMDB_LANGUAGE,
	},
});

/**
 * 티비 상세 정보 조회
 * @param {Number} id : 아이디
 */
const getTvDetail = async id => {
	try {
		const { data } = await tvInstance.get('' + id);

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
 * 티비 출연진 조회
 */
const getTvCredits = async id => {
	try {
		const url = `${id}/credits`;

		const { data } = await tvInstance.get(url);

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

// 티비 비슷한 컨텐츠 조회
const getSimilarTvPrograms = async (id, page = 1) => {
	try {
		const url = `${id}/similar`;

		const { data } = await tvInstance.get(url, {
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

/**
 *
 * @param {number} id : tv id
 * @returns
 */
const getVideos = async id => {
	try {
		const url = `${id}/videos`;
		const { data } = await tvInstance.get(url);

		return {
			isError: false,
			data,
		};
	} catch (error) {
		console.error('getVideos error...', error);
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

export { getTvDetail, getTvCredits, getSimilarTvPrograms, getVideos };
