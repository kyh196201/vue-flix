// tv 영화 공통 Detail composable
import { ref, computed } from 'vue';

// Api
import createMediaApi from '@/api/media';

// Utils
import getImageUrl from '@/utils/common/getImageUrl';
import { getReleaseYear, formatRuntime } from '@/utils/movie';

export default function detailComposable(id, mediaType = 'movie') {
	const detail = ref(null);
	const videos = ref([]);
	const loading = ref(false);

	const api = createMediaApi(mediaType);

	// #region Computed

	const isDetail = computed(() => {
		return detail.value && Object.keys(detail.value).length > 0;
	});

	/**
	 * detail 로딩 완료 여부
	 */
	const isDetailLoaded = computed(() => {
		return !loading.value && isDetail.value;
	});

	/**
	 * 시리즈 또는 영화 제목
	 * @returns {string}
	 */
	const title = computed(() => {
		if (!isDetail.value) return '';

		if (mediaType === 'movie') {
			return detail.value.title || detail.value['original_title'];
		} else if (mediaType === 'tv') {
			return detail.value.name || detail.value['original_name'];
		}

		return '';
	});

	/**
	 * 영화 출시일
	 * @returns {string}
	 */
	const releaseDate = computed(() => {
		if (!detail.value?.release_date) return '';

		return getReleaseYear(detail.value.release_date);
	});

	/**
	 * TV 첫 방영일
	 * @returns {string}
	 */
	const firstAirDate = computed(() => {
		if (!detail.value?.first_air_date) return '';

		return getReleaseYear(detail.value.first_air_date);
	});

	const runTime = computed(() => {
		if (!detail.value?.runtime) return '';

		return formatRuntime(detail.value.runtime);
	});

	/**
	 * 대표 이미지
	 * @returns {string}
	 */
	const backdropImage = computed(() => {
		if (!detail.value?.backdrop_path) return '';

		return getImageUrl(detail.value.backdrop_path, 2, 'backdrop');
	});

	// TODO get poster

	/**
	 * 줄거리
	 * @returns {string}
	 */
	const overview = computed(() => {
		return detail.value?.overview || '';
	});

	/**
	 * 시즌 개수
	 * @returns {number}
	 */
	const seasonLength = computed(() => {
		if (mediaType === 'movie') return 0;

		return detail.value?.seasons?.length || 0;
	});

	/**
	 * 장르 데이터 존재 여부
	 * @returns {boolean}
	 */
	const isGenres = computed(() => {
		return !!detail.value?.genres?.length;
	});

	// youtube video 필터링
	const filteredVideos = computed(() => {
		return videos.value.length
			? videos.value.filter(v => v.site.toLowerCase() === 'youtube')
			: [];
	});
	// #endregion

	// #region Functions
	const fetchDetail = async function fetchDetail() {
		loading.value = true;
		const result = await api.getDetail(id);

		if (result.isError) {
			throw result.errorData;
		}

		detail.value = result.data;
		loading.value = false;
	};

	// 비디오 리스트 조회
	const fetchVideos = async function fetchVideos() {
		const result = await api.getVideos(id);

		if (result.isError) {
			// FIXME 에러 처리 어떻게할지 생각해보기
			throw result.errorData;
		}

		const { results } = result.data;
		videos.value = results;
	};

	const deleteVideos = function deleteVideos() {
		videos.value = [];
	};

	// #endregion

	return {
		detail,
		videos: filteredVideos,
		loadingDetail: loading,

		// Computed
		// 영화, tv 공통
		isDetail,
		isDetailLoaded,
		title,
		backdropImage,
		overview,
		isGenres,
		filteredVideos,

		// tv
		firstAirDate,
		seasonLength,

		// 영화
		runTime,
		releaseDate,

		// Functions
		fetchDetail,
		fetchVideos,
		deleteVideos,
	};
}
