// 영화 데이터 관련 utils
import { getReleaseYear, formatRuntime } from '@/utils/movie';
import getImageUrl from '@/utils/common/getImageUrl';

// Api
import { getMovieDetail, getMovieCredits, getSimilarMovies } from '@/api/movie';

const movieDetailMixin = {
	props: {
		movieId: {
			type: [Number, String],
			required: true,
		},
	},

	data() {
		return {
			movieIdAsNumber: Number(this.movieId),

			// 영화 데이터
			movieData: null,

			// 영화 출연진
			movieCredits: null,

			similarContents: [],

			loading: {
				movieData: false,
				movieCredits: false,
				similarContents: false,
			},
		};
	},

	computed: {
		/**
		 * 로딩중인 API가 하나라도 있는지 체크
		 * @returns boolean
		 */
		isLoading() {
			const { movieData, movieCredits } = this.loading;

			return movieData || movieCredits;
		},

		/**
		 * movieData가 로드되었는지 체크
		 * @returns boolean
		 */
		isMovieDataLoaded() {
			return !this.isLoading && !!this.movieData;
		},

		/**
		 * 비슷한 콘텐츠 로드되었는지 체크
		 * @returns boolean
		 */
		isSimilarContentsLoaded() {
			return !this.loading.similarContents;
		},

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

		/**
		 * 장르 데이터 존재 여부
		 * @returns {boolean}
		 */
		isGenres() {
			return !!this.movieData?.genres?.length;
		},

		/**
		 * 영화 줄거리
		 * @returns string
		 */
		overview() {
			return this.movieData?.overview;
		},

		/**
		 * 비슷한 콘텐츠 데이터 있는지 체크
		 * @returns boolean
		 */
		isSimilarContents() {
			return this.similarContents.length;
		},
	},

	created() {
		// API 요청
		this.fetchData();
	},

	// Methods
	methods: {
		// 영화 상세 정보 조회
		async fetchMovieDetail() {
			try {
				this.loading.movieData = true;
				const result = await getMovieDetail(this.movieIdAsNumber);

				if (result.isError) {
					console.error(result.errorData);
					return false;
				}

				this.movieData = result.data;
			} catch (error) {
				console.error(error.message);
			} finally {
				this.loading.movieData = false;
			}
		},

		// 영화 출연진 조회
		async fetchMovieCredits() {
			try {
				this.loading.movieCredits = true;
				const result = await getMovieCredits(this.movieIdAsNumber);

				if (result.isError) {
					throw result;
				}

				this.movieCredits = result.data;
			} catch (error) {
				console.error('fetchMovieCredits error', error.message);
			} finally {
				this.loading.movieCredits = false;
			}
		},

		async fetchSimilarMovies() {
			try {
				this.loading.similarContents = true;

				const result = await getSimilarMovies(this.movieIdAsNumber);

				if (result.isError) {
					throw result;
				}

				const { data } = result;
				this.similarContents = data.results;
			} catch (error) {
				console.error('fetchSimilarMovies error', error.message);
			} finally {
				this.loading.similarContents = false;
			}
		},
	},
};

export default movieDetailMixin;
