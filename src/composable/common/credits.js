// tv 영화 공통 Credit Composable
import { ref, computed } from 'vue';

// Api
import createMediaApi from '@/api/media';

export default function creditsComposable(id, mediaType = 'movie') {
	const credits = ref(null);
	const loading = ref(false);

	const api = createMediaApi(mediaType);

	/**
	 * 대표 출연진
	 * @returns {array}
	 */
	const castList = computed(() => {
		if (!credits.value?.cast?.length) {
			return [];
		}

		return credits.value.cast.slice(0, 4);
	});

	// 영화 출연진 조회
	const fetchTvCredits = async () => {
		loading.value = true;
		const result = await api.getCredits(id);

		if (result.isError) {
			throw result.errorData;
		}

		credits.value = result.data;
		loading.value = false;
	};

	return {
		credits,
		loadingCredits: loading,
		castList,

		// Functions
		fetchTvCredits,
	};
}
