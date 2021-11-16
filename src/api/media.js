/**
 * 팩토리 패턴을 이용한 tv, movie 공통 api 모듈
 */
import { API_KEY, TMDB_ENDPOINT, TMDB_LANGUAGE } from '@/configs/';
import createInstance from './common/createInstance';
import { handleError } from './common/handleResponse';

export default function createMediaApi(mediaType = 'movie') {
	const instance = createInstance({
		baseURL: TMDB_ENDPOINT + `${mediaType}/`,
		// 쿼리 스트링
		params: {
			api_key: API_KEY,
			language: TMDB_LANGUAGE,
		},
	});

	return {
		async getDetail(id) {
			try {
				const { data } = await instance.get('' + id);

				return {
					isError: false,
					data,
				};
			} catch (error) {
				return handleError(error);
			}
		},

		async getCredits(id) {
			try {
				const url = `${id}/credits`;
				const { data } = await instance.get(url);

				return {
					isError: false,
					data,
				};
			} catch (error) {
				return handleError(error);
			}
		},

		async getSimilarPrograms(id, page) {
			try {
				const url = `${id}/similar`;

				const { data } = await instance.get(url, {
					params: {
						page,
					},
				});

				return {
					isError: false,
					data,
				};
			} catch (error) {
				return handleError(error);
			}
		},

		async getVideos(id) {
			try {
				const url = `${id}/videos`;
				const { data } = await instance.get(url);

				return {
					isError: false,
					data,
				};
			} catch (error) {
				return handleError(error);
			}
		},
	};
}
