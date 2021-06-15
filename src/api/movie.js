import { movieInstance } from './index';

/**
 * 영화에 대한 기본 정보 가져오는 함수
 * https://developers.themoviedb.org/3/movies/get-movie-details
 * @param {Number} id : 영화 아이디
 */
export async function getMovieDetail(id) {
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
				message:
					response?.data?.status_message ||
					error.message ||
					'undefined error',
				statusCode: response?.data?.status_code || 'undefined code',
			},
		};
	}
}
