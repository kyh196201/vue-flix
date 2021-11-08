import { ref, computed } from 'vue';

// Api
import { getTvDetail, getVideos } from '@/api/tv';

// Utils
import getImageUrl from '@/utils/common/getImageUrl';
import { getReleaseYear } from '@/utils/movie';

export default function detailComposable(id) {
	// Data
	const detail = ref(null);
	const loading = ref(false);
	const videos = ref([]);

	// Computed
	const isDetail = computed(() => {
		return detail.value && !!Object.keys(detail.value).length;
	});

	/**
	 * detail 로딩 완료 여부
	 * @returns {boolean}
	 */
	const isDetailLoaded = computed(() => {
		return !loading.value && isDetail.value;
	});

	/**
	 * 첫 방영일
	 * @returns {string}
	 */
	const firstAirDate = computed(() => {
		if (!isDetail.value) return '';

		return getReleaseYear(detail.value['first_air_date']);
	});

	/**
	 * 시리즈 이름
	 * @returns {string}
	 */
	const tvTitle = computed(() => {
		if (!isDetail.value) return '';

		return detail.value.name || detail.value['original_name'];
	});

	/**
	 * 대표 이미지
	 * @returns {string}
	 */
	const backdropImage = computed(() => {
		if (!detail.value?.backdrop_path) return '';

		return getImageUrl(detail.value.backdrop_path, 2, 'backdrop');
	});

	/**
	 * 줄거리
	 * @returns {string}
	 */
	const overview = computed(() => {
		return detail.value?.overview;
	});

	/**
	 * 시즌 개수
	 * @returns {number}
	 */
	const seasonLength = computed(() => {
		return detail.value?.seasons?.length;
	});

	/**
	 * 장르 데이터 존재 여부
	 * @returns {boolean}
	 */
	const isGenres = computed(() => {
		return !!detail.value?.genres?.length;
	});

	// Functions
	const fetchDetail = async () => {
		try {
			loading.value = true;

			const result = await getTvDetail(id);

			if (result.isError) {
				throw result.errorData;
			}

			detail.value = result.data;
		} catch (error) {
			console.error('fetchTvDetail error', error.message);
		} finally {
			loading.value = false;
		}
	};

	const fetchVideos = async () => {
		const result = await getVideos(id);

		if (result.isError) {
			// FIXME 에러 처리 어떻게할지 생각해보기
			throw result.errorData;
		}

		const { results } = result.data;

		videos.value = results.length ? results : [];

		console.log('fetchVideos results', results);
	};

	return {
		detail,
		loadingDetail: loading,

		// Computed
		isDetail,
		isDetailLoaded,
		firstAirDate,
		tvTitle,
		backdropImage,
		overview,
		seasonLength,
		isGenres,

		// Functions
		fetchDetail,
		fetchVideos,
	};
}
