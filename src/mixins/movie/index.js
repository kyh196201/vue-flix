// 영화 데이터 관련 utils
import { getReleaseYear, formatRuntime } from '@/utils/movie';
import getImageUrl from '@/utils/common/getImageUrl';

const movieDetailMixin = {
	props: {
		movieId: {
			type: [Number, String],
			required: true,
		},
	},

	data() {
		return {
			movieIdAsNumber: this.movieId,

			movieData: null,
			movieCredits: null,
		};
	},

	computed: {
		/**
		 * 영화 출시일
		 * @returns {string}
		 */
		releaseDate() {
			if (!this.movieData?.release_date) {
				return '';
			}

			return getReleaseYear(this.movieData.release_date);
		},

		/**
		 * 영화 러닝 타임
		 * @returns {string}
		 */
		runTime() {
			if (!this.movieData?.runtime) {
				return '';
			}

			return formatRuntime(this.movieData.runtime);
		},

		/**
		 * 영화 대표 이미지
		 * @returns {string}
		 */
		backdropImage() {
			if (!this.movieData?.backdrop_path) return '';

			return getImageUrl(this.movieData.backdrop_path, 2, 'backdrop');
		},

		/**
		 *  영화 대표 배우
		 * @returns {array}
		 */
		castList() {
			if (!this.movieCredits?.cast?.length) {
				return [];
			}

			return this.movieCredits.cast.slice(0, 4);
		},
	},
};

export default movieDetailMixin;
